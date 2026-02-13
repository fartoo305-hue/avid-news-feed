import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

const PRIMARY_BASE = 'http://api.isportsapi.com/sport';
const FALLBACK_BASE = 'http://api2.isportsapi.com/sport';

async function fetchWithFallback(endpoint: string, apiKey: string, params: Record<string, string> = {}) {
  for (const base of [PRIMARY_BASE, FALLBACK_BASE]) {
    try {
      const url = new URL(`${base}/${endpoint}`);
      url.searchParams.set('api_key', apiKey);
      Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, String(v)));
      
      console.log('Fetching iSports:', url.toString());
      const res = await fetch(url.toString());
      if (res.ok) return await res.json();
      console.error(`Non-OK from ${base}:`, res.status);
    } catch (err) {
      console.error(`Failed ${base}:`, err.message);
    }
  }
  throw new Error('All iSports API endpoints failed');
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const apiKey = Deno.env.get('ISPORTS_API_KEY');
    if (!apiKey) {
      return new Response(JSON.stringify({ error: 'ISPORTS_API_KEY not configured' }), {
        status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const { endpoint, params } = await req.json();
    const data = await fetchWithFallback(endpoint, apiKey, params || {});

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('iSports API error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
