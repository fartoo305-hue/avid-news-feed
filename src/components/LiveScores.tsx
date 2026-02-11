import { liveMatches } from "@/data/mockData";

export function LiveScores() {
  return (
    <div className="rounded-xl border border-border bg-card p-4 shadow-card">
      <div className="flex items-center gap-2 mb-4">
        <span className="h-2.5 w-2.5 rounded-full bg-live animate-pulse-live" />
        <h3 className="text-sm font-bold uppercase tracking-wider font-body">Live Scores</h3>
      </div>
      <div className="space-y-3">
        {liveMatches.map((match) => (
          <div
            key={match.id}
            className="rounded-lg bg-muted/50 p-3 transition-colors hover:bg-muted"
          >
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
              <span className="font-semibold flex-1 text-right">{match.awayTeam}</span>
            </div>
            <div className="text-center mt-1">
              <span
                className={`text-[10px] font-bold font-body ${
                  match.isLive ? "text-live" : "text-muted-foreground"
                }`}
              >
                {match.isLive && "● "}{match.minute}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
