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

export function useLiveScores() {
  const [matches, setMatches] = useState<LiveMatch[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchScores = useCallback(async () => {
    try {
      const { data, error: fnError } = await supabase.functions.invoke("isports-proxy", {
        body: { endpoint: "football/match/recent", params: {} },
      });

      if (fnError) throw fnError;

      if (data?.data && Array.isArray(data.data)) {
        const mapped: LiveMatch[] = data.data.slice(0, 6).map((m: any, i: number) => ({
          id: m.matchId || String(i),
          homeTeam: m.homeName || m.homeTeamName || "—",
          awayTeam: m.awayName || m.awayTeamName || "—",
          homeScore: Number(m.homeScore ?? 0),
          awayScore: Number(m.awayScore ?? 0),
          minute: m.minute || m.matchTime || "—",
          league: m.leagueName || m.competitionName || "",
          isLive: m.status === "playing" || m.state === 2,
        }));
        setMatches(mapped);
        setError(null);
      }
    } catch (err: any) {
      console.error("Live scores error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchScores();
    const interval = setInterval(fetchScores, 60000); // refresh every minute
    return () => clearInterval(interval);
  }, [fetchScores]);

  return { matches, loading, error };
}
