import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const RSS_FEEDS = [
  { url: 'https://www.skysports.com/rss/12040', category: 'كرة القدم', source: 'Sky Sports' },
  { url: 'https://www.goal.com/feeds/en/news', category: 'كرة القدم', source: 'Goal' },
  { url: 'https://www.espn.com/espn/rss/soccer/news', category: 'كرة القدم', source: 'ESPN' },
];

function extractItems(xml: string): Array<{ title: string; description: string; link: string; image: string }> {
  const items: Array<{ title: string; description: string; link: string; image: string }> = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  let match;

  while ((match = itemRegex.exec(xml)) !== null) {
    const itemXml = match[1];
    const title = itemXml.match(/<title><!\[CDATA\[(.*?)\]\]>|<title>(.*?)<\/title>/)?.[1] || itemXml.match(/<title>(.*?)<\/title>/)?.[1] || '';
    const description = itemXml.match(/<description><!\[CDATA\[(.*?)\]\]>|<description>(.*?)<\/description>/)?.[1] || itemXml.match(/<description>(.*?)<\/description>/)?.[1] || '';
    const link = itemXml.match(/<link>(.*?)<\/link>/)?.[1] || '';
    const image = itemXml.match(/<media:content[^>]*url="([^"]+)"/)?.[1] || 
                  itemXml.match(/<enclosure[^>]*url="([^"]+)"/)?.[1] || 
                  itemXml.match(/<image>[^<]*<url>(.*?)<\/url>/)?.[1] || '';

    if (title) {
      items.push({ 
        title: title.replace(/<[^>]+>/g, '').trim(), 
        description: description.replace(/<[^>]+>/g, '').trim().slice(0, 300), 
        link, 
        image 
      });
    }
  }
  return items;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Verify caller is admin
    const authHeader = req.headers.get('Authorization');
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_ANON_KEY')!,
      { global: { headers: { Authorization: authHeader || '' } } }
    );

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    const { data: roles } = await supabaseAdmin
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id)
      .eq('role', 'admin');

    if (!roles?.length) throw new Error('Not admin');

    // Use Lovable AI to translate titles
    const aiKey = Deno.env.get('LOVABLE_API_KEY');

    let totalInserted = 0;

    for (const feed of RSS_FEEDS) {
      try {
        const res = await fetch(feed.url, {
          headers: { 'User-Agent': 'SportsPulse/1.0' }
        });
        if (!res.ok) {
          console.error(`Failed to fetch ${feed.url}: ${res.status}`);
          continue;
        }
        const xml = await res.text();
        const items = extractItems(xml).slice(0, 5);

        for (const item of items) {
          // Check if already exists by title
          const { data: existing } = await supabaseAdmin
            .from('articles')
            .select('id')
            .eq('title', item.title)
            .limit(1);

          if (existing?.length) continue;

          // Translate using AI
          let translatedTitle = item.title;
          let translatedExcerpt = item.description;

          if (aiKey) {
            try {
              const aiRes = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${aiKey}`,
                },
                body: JSON.stringify({
                  model: 'google/gemini-2.5-flash-lite',
                  messages: [{
                    role: 'user',
                    content: `Translate this sports news to Arabic. Return ONLY a JSON object with "title" and "excerpt" keys. No markdown.\n\nTitle: ${item.title}\nDescription: ${item.description}`
                  }],
                }),
              });
              const aiData = await aiRes.json();
              const content = aiData.choices?.[0]?.message?.content || '';
              // Try to parse JSON from response
              const jsonMatch = content.match(/\{[\s\S]*\}/);
              if (jsonMatch) {
                const parsed = JSON.parse(jsonMatch[0]);
                translatedTitle = parsed.title || item.title;
                translatedExcerpt = parsed.excerpt || item.description;
              }
            } catch (aiErr) {
              console.error('AI translation error:', aiErr);
            }
          }

          const { error: insertErr } = await supabaseAdmin.from('articles').insert({
            title: translatedTitle,
            excerpt: translatedExcerpt,
            content: translatedExcerpt,
            category: feed.category,
            image: item.image || '',
            author: feed.source,
            is_published: true,
            is_breaking: false,
            read_time: '٣ دقائق للقراءة',
          });

          if (!insertErr) totalInserted++;
        }
      } catch (feedErr) {
        console.error(`Feed error ${feed.url}:`, feedErr);
      }
    }

    return new Response(JSON.stringify({ success: true, inserted: totalInserted }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('RSS fetch error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
