import { MessageCircle } from "lucide-react";

interface MatchCardProps {
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  minute: string;
  league: string;
  isLive: boolean;
}

export function MatchCard({ homeTeam, awayTeam, homeScore, awayScore, minute, league, isLive }: MatchCardProps) {
  const whatsappMsg = encodeURIComponent(`⚽ ${homeTeam} ${homeScore} - ${awayScore} ${awayTeam} | ${minute}`);

  return (
    <div className="rounded-xl border border-border bg-card p-4 shadow-card transition-shadow hover:shadow-md">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[11px] text-muted-foreground font-body uppercase tracking-wide">{league}</span>
        {isLive && (
          <span className="flex items-center gap-1 text-[11px] font-bold text-live font-body">
            <span className="h-2 w-2 rounded-full bg-live animate-pulse-live" />
            مباشر
          </span>
        )}
      </div>

      <div className="flex items-center justify-between text-sm font-body">
        <span className="font-semibold flex-1 text-end">{homeTeam}</span>
        <div className="flex items-center gap-3 mx-4">
          <span className="font-black text-xl tabular-nums">{homeScore}</span>
          <span className="text-muted-foreground">-</span>
          <span className="font-black text-xl tabular-nums">{awayScore}</span>
        </div>
        <span className="font-semibold flex-1">{awayTeam}</span>
      </div>

      <div className="text-center mt-2">
        <span className={`text-xs font-bold font-body ${isLive ? "text-live" : "text-muted-foreground"}`}>
          {isLive && "● "}{minute}
        </span>
      </div>

      {isLive && (
        <div className="mt-3 text-center">
          <a
            href={`https://wa.me/201070366961?text=${whatsappMsg}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full bg-[#25D366] px-3 py-1.5 text-xs font-bold text-white font-body transition-transform hover:scale-105"
          >
            <MessageCircle className="h-3.5 w-3.5" />
            تابع الأهداف على واتساب
          </a>
        </div>
      )}
    </div>
  );
}
