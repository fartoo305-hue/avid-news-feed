import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

// Free/open football data sources
const SOURCES = {
  // ESPN public JSON endpoints (no key needed)
  espnFootball: 'https://site.api.espn.com/apis/site/v2/sports/soccer/eng.1/scoreboard',
  espnLaLiga: 'https://site.api.espn.com/apis/site/v2/sports/soccer/esp.1/scoreboard',
  espnSerieA: 'https://site.api.espn.com/apis/site/v2/sports/soccer/ita.1/scoreboard',
  espnBundesliga: 'https://site.api.espn.com/apis/site/v2/sports/soccer/ger.1/scoreboard',
  espnLigue1: 'https://site.api.espn.com/apis/site/v2/sports/soccer/fra.1/scoreboard',
  espnChampionsLeague: 'https://site.api.espn.com/apis/site/v2/sports/soccer/uefa.champions/scoreboard',
  espnBasketball: 'https://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard',
};

const LEAGUE_NAMES: Record<string, string> = {
  'eng.1': 'الدوري الإنجليزي',
  'esp.1': 'الدوري الإسباني',
  'ita.1': 'الدوري الإيطالي',
  'ger.1': 'الدوري الألماني',
  'fra.1': 'الدوري الفرنسي',
  'uefa.champions': 'دوري أبطال أوروبا',
  'nba': 'NBA',
};

function parseEspnMatch(event: any, leagueSlug: string) {
  const comp = event.competitions?.[0];
  if (!comp) return null;

  const home = comp.competitors?.find((c: any) => c.homeAway === 'home');
  const away = comp.competitors?.find((c: any) => c.homeAway === 'away');
  if (!home || !away) return null;

  const status = comp.status || event.status;
  const state = status?.type?.state; // pre, in, post
  const displayClock = status?.displayClock || '';
  const period = status?.period || 0;

  let minute = 'لم تبدأ';
  let isLive = false;
  if (state === 'in') {
    isLive = true;
    minute = displayClock || `${period * 45}'`;
  } else if (state === 'post') {
    minute = 'انتهت';
  }

  return {
    id: event.id || String(Math.random()),
    homeTeam: home.team?.shortDisplayName || home.team?.displayName || '—',
    awayTeam: away.team?.shortDisplayName || away.team?.displayName || '—',
    homeScore: Number(home.score || 0),
    awayScore: Number(away.score || 0),
    minute,
    league: LEAGUE_NAMES[leagueSlug] || leagueSlug,
    isLive,
  };
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const results: any[] = [];

    // Fetch from all ESPN endpoints in parallel
    const entries = Object.entries(SOURCES);
    const responses = await Promise.allSettled(
      entries.map(([, url]) => fetch(url).then(r => r.json()))
    );

    for (let i = 0; i < responses.length; i++) {
      const result = responses[i];
      if (result.status !== 'fulfilled') continue;

      const data = result.value;
      const key = entries[i][0];
      const leagueSlug = key === 'espnBasketball' ? 'nba' :
        key.replace('espn', '').replace('Football', 'eng.1')
          .replace('LaLiga', 'esp.1').replace('SerieA', 'ita.1')
          .replace('Bundesliga', 'ger.1').replace('Ligue1', 'fra.1')
          .replace('ChampionsLeague', 'uefa.champions');

      const events = data?.events || [];
      for (const event of events) {
        const parsed = parseEspnMatch(event, leagueSlug);
        if (parsed) results.push(parsed);
      }
    }

    return new Response(JSON.stringify({ data: results, source: 'espn-free' }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Free scores error:', error);
    return new Response(JSON.stringify({ error: error.message, data: [] }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
