import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Loader2 } from "lucide-react";
import { useLiveScores } from "@/hooks/useLiveScores";
import { liveMatches } from "@/data/mockData";
import { MatchCard } from "@/components/MatchCard";
import { AdPlaceholder } from "@/components/AdPlaceholder";
import { Header } from "@/components/Header";
import { categories, Category } from "@/data/mockData";
import { supabase } from "@/integrations/supabase/client";

export default function LiveMatchesPage() {
  const { matches, loading, error } = useLiveScores();
  const displayMatches = matches.length > 0 ? matches : liveMatches;
  const [activeCategory, setActiveCategory] = useState<Category>("الكل");
  const [streamMatchIds, setStreamMatchIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    // Auto-SEO: update page title with live match info
    const liveCount = displayMatches.filter(m => m.isLive).length;
    if (liveCount > 0) {
      document.title = `⚽ ${liveCount} مباراة مباشرة الآن | سبورتس بالس`;
    } else {
      document.title = "مباريات اليوم | سبورتس بالس";
    }
    return () => { document.title = "سبورتس بالس | نتائج مباشرة وأخبار رياضية عاجلة"; };
  }, [displayMatches]);

  useEffect(() => {
    supabase.from("match_streams").select("match_id").eq("is_active", true).then(({ data }) => {
      if (data) setStreamMatchIds(new Set(data.map((d: any) => d.match_id)));
    });
  }, []);

  // Group by league
  const grouped = displayMatches.reduce<Record<string, typeof displayMatches>>((acc, m) => {
    const key = m.league || "أخرى";
    if (!acc[key]) acc[key] = [];
    acc[key].push(m);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <Header onSearch={() => {}} activeCategory={activeCategory} onCategoryChange={setActiveCategory} />

      <main className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-black font-body">مباريات اليوم</h1>
          <div className="flex items-center gap-2">
            {loading && <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />}
            <Link to="/" className="text-sm text-muted-foreground hover:text-foreground font-body flex items-center gap-1">
              <ArrowRight className="h-4 w-4" /> الرئيسية
            </Link>
          </div>
        </div>

        {error && <p className="text-xs text-muted-foreground font-body mb-4">بيانات تجريبية — تعذر الاتصال بالمصدر الحي</p>}

        <AdPlaceholder position="header" />

        <div className="mt-6 space-y-8">
          {Object.entries(grouped).map(([league, leagueMatches]) => (
            <section key={league}>
              <h2 className="text-lg font-bold font-body mb-3 border-b border-border pb-2">{league}</h2>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {leagueMatches.map((m) => (
                  <MatchCard
                    key={m.id}
                    id={m.id}
                    homeTeam={m.homeTeam}
                    awayTeam={m.awayTeam}
                    homeScore={m.homeScore}
                    awayScore={m.awayScore}
                    minute={m.minute}
                    league={m.league}
                    isLive={m.isLive}
                    hasStream={streamMatchIds.has(m.id)}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-8">
          <AdPlaceholder position="inline" />
        </div>
      </main>
    </div>
  );
}
