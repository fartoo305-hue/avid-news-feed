import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

interface LiveMatch {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  minute: string;
  league: string;
  isLive: boolean;
}

async function fetchFromISports(): Promise<LiveMatch[] | null> {
  try {
    const { data, error } = await supabase.functions.invoke("isports-proxy", {
      body: { endpoint: "football/livescores", params: {} },
    });
    if (error) throw error;
    if (data?.data && Array.isArray(data.data)) {
      return data.data.slice(0, 20).map((m: any, i: number) => ({
        id: m.matchId || String(i),
        homeTeam: m.homeName || m.homeTeamName || "—",
        awayTeam: m.awayName || m.awayTeamName || "—",
        homeScore: Number(m.homeScore ?? 0),
        awayScore: Number(m.awayScore ?? 0),
        minute: m.status === 1 ? "الشوط الأول" : m.status === 3 ? "الشوط الثاني" : m.status === 2 ? "استراحة" : m.status === -1 ? "انتهت" : "لم تبدأ",
        league: m.leagueName || m.leagueShortName || "",
        isLive: m.status === 1 || m.status === 3,
      }));
    }
    return null;
  } catch {
    console.warn("iSports unavailable, falling back to free sources");
    return null;
  }
}

async function fetchFromFree(): Promise<LiveMatch[]> {
  try {
    const { data, error } = await supabase.functions.invoke("free-scores-proxy");
    if (error) throw error;
    return data?.data || [];
  } catch (err) {
    console.error("Free scores also failed:", err);
    return [];
  }
}

export function useLiveScores() {
  const [matches, setMatches] = useState<LiveMatch[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [source, setSource] = useState<string>("loading");

  const fetchScores = useCallback(async () => {
    // Try iSports first, fallback to free ESPN data
    const isportsData = await fetchFromISports();
    if (isportsData && isportsData.length > 0) {
      setMatches(isportsData);
      setSource("isports");
      setError(null);
    } else {
      const freeData = await fetchFromFree();
      setMatches(freeData);
      setSource("free");
      setError(freeData.length === 0 ? "لا توجد مباريات حالياً" : null);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchScores();
    const interval = setInterval(fetchScores, 60000);
    return () => clearInterval(interval);
  }, [fetchScores]);

  return { matches, loading, error, source };
}
