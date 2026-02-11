import { leagueTable } from "@/data/mockData";

export function LeagueTable() {
  return (
    <div className="rounded-xl border border-border bg-card p-4 shadow-card">
      <h3 className="text-sm font-bold uppercase tracking-wider font-body mb-4">
        Premier League
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full text-xs font-body">
          <thead>
            <tr className="text-muted-foreground border-b border-border">
              <th className="pb-2 text-left w-6">#</th>
              <th className="pb-2 text-left">Team</th>
              <th className="pb-2 text-center w-8">P</th>
              <th className="pb-2 text-center w-8">W</th>
              <th className="pb-2 text-center w-8">D</th>
              <th className="pb-2 text-center w-8">L</th>
              <th className="pb-2 text-right w-10 font-bold">Pts</th>
            </tr>
          </thead>
          <tbody>
            {leagueTable.map((row) => (
              <tr
                key={row.position}
                className="border-b border-border/50 last:border-0 hover:bg-muted/50 transition-colors"
              >
                <td className="py-2 font-bold text-muted-foreground">{row.position}</td>
                <td className="py-2 font-semibold">{row.team}</td>
                <td className="py-2 text-center text-muted-foreground">{row.played}</td>
                <td className="py-2 text-center text-muted-foreground">{row.won}</td>
                <td className="py-2 text-center text-muted-foreground">{row.drawn}</td>
                <td className="py-2 text-center text-muted-foreground">{row.lost}</td>
                <td className="py-2 text-right font-black">{row.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
