import { liveMatches } from "@/data/mockData";
import { useLiveScores } from "@/hooks/useLiveScores";
import { Loader2, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

export function LiveScores() {
  const { matches, loading, error } = useLiveScores();
  const displayMatches = matches.length > 0 ? matches : liveMatches;

  return (
    <div className="rounded-xl border border-border bg-card p-4 shadow-card">
      <div className="flex items-center gap-2 mb-4">
        <span className="h-2.5 w-2.5 rounded-full bg-live animate-pulse-live" />
        <h3 className="text-sm font-bold uppercase tracking-wider font-body">النتائج المباشرة</h3>
        {loading && <Loader2 className="h-3 w-3 animate-spin text-muted-foreground" />}
      </div>
      {error && <p className="text-[10px] text-muted-foreground font-body mb-2">بيانات تجريبية</p>}
      <div className="space-y-3">
        {displayMatches.map((match) => (
          <div key={match.id} className="rounded-lg bg-muted/50 p-3 transition-colors hover:bg-muted">
            <div className="text-[10px] text-muted-foreground font-body mb-1.5 uppercase tracking-wide">
              {match.league}
            </div>
            <div className="flex items-center justify-between text-sm font-body">
              <span className="font-semibold flex-1">{match.homeTeam}</span>
              <div className="flex items-center gap-2 mx-2">
                <span className="font-black text-base tabular-nums">{match.homeScore}</span>
                <span className="text-muted-foreground text-xs">-</span>
                <span className="font-black text-base tabular-nums">{match.awayScore}</span>
              </div>
              <span className="font-semibold flex-1 text-start">{match.awayTeam}</span>
            </div>
            <div className="flex items-center justify-center gap-2 mt-1">
              <span className={`text-[10px] font-bold font-body ${match.isLive ? "text-live" : "text-muted-foreground"}`}>
                {match.isLive && "● "}{match.minute}
              </span>
              {match.isLive && (
                <a
                  href={`https://wa.me/201070366961?text=${encodeURIComponent(`⚽ ${match.homeTeam} ${match.homeScore}-${match.awayScore} ${match.awayTeam}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#25D366] hover:scale-110 transition-transform"
                >
                  <MessageCircle className="h-3 w-3" />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
      <Link to="/matches" className="block text-center mt-4 text-xs font-bold text-primary hover:underline font-body">
        عرض جميع المباريات ←
      </Link>
    </div>
  );
}
