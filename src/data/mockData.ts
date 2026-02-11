export type Category = "All" | "Football" | "Basketball" | "Tennis" | "Cricket" | "F1";

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: Category;
  image: string;
  author: string;
  date: string;
  isBreaking?: boolean;
  readTime: string;
}

export interface Match {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  minute: string;
  league: string;
  isLive: boolean;
}

export interface LeagueRow {
  position: number;
  team: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  points: number;
}

export const categories: Category[] = ["All", "Football", "Basketball", "Tennis", "Cricket", "F1"];

export const articles: Article[] = [
  {
    id: "1",
    title: "Champions League Final: Madrid's Historic Night Under the Lights",
    excerpt: "A dramatic finish sees Real Madrid claim their 16th Champions League title in an unforgettable night at Wembley Stadium.",
    content: "In one of the most dramatic Champions League finals in recent memory, Real Madrid completed a stunning comeback to claim their 16th European title. Trailing 2-0 at halftime, the Spanish giants mounted a remarkable second-half recovery that will be talked about for generations.\n\nThe match at Wembley Stadium started with the underdogs taking control, pressing high and exploiting gaps in Madrid's midfield. Two clinical finishes before the break left the record champions staring at defeat.\n\nBut as they have done so many times before, Madrid found a way. A tactical switch at halftime changed the complexion of the game, and three goals in a blistering 20-minute spell turned the tie on its head.\n\nThe celebrations that followed were scenes of pure ecstasy, with fans flooding the streets of the Spanish capital long into the night.",
    category: "Football",
    image: "https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?w=800&auto=format",
    author: "Carlos Mendez",
    date: "2 hours ago",
    isBreaking: true,
    readTime: "5 min read",
  },
  {
    id: "2",
    title: "NBA Playoffs: Lakers Dominate in Game 7 Thriller",
    excerpt: "LeBron James delivers a masterclass performance as the Lakers advance to the Conference Finals.",
    content: "LeBron James proved once again why he is considered one of the greatest basketball players of all time, delivering a masterclass performance in a decisive Game 7 to lead the Lakers to the Conference Finals.\n\nThe 39-year-old veteran scored 38 points, grabbed 12 rebounds, and dished out 8 assists in a comprehensive display that left the opposition helpless. His fourth-quarter takeover, where he scored 15 consecutive points, will go down as one of the greatest playoff performances in NBA history.\n\nThe Staples Center erupted as the final buzzer sounded, with fans celebrating a hard-fought series victory that few had predicted at the start of the playoffs.",
    category: "Basketball",
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&auto=format",
    author: "Mike Thompson",
    date: "4 hours ago",
    readTime: "4 min read",
  },
  {
    id: "3",
    title: "Wimbledon 2025: The Rise of a New Tennis Sensation",
    excerpt: "19-year-old sensation stuns the tennis world with a remarkable run to the Wimbledon semifinals.",
    content: "The grass courts of the All England Club have witnessed the emergence of a new star as a 19-year-old qualifier has battled through to the Wimbledon semifinals, defeating three seeded players along the way.\n\nWith a powerful serve and fearless baseline game, the young prodigy has captured the hearts of tennis fans worldwide, drawing comparisons to the sport's greatest players.",
    category: "Tennis",
    image: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800&auto=format",
    author: "Sarah Williams",
    date: "6 hours ago",
    readTime: "3 min read",
  },
  {
    id: "4",
    title: "F1: Verstappen Secures Pole Position at Monaco Grand Prix",
    excerpt: "Red Bull's Max Verstappen puts in a scintillating lap to claim pole position on the streets of Monaco.",
    content: "Max Verstappen delivered a stunning qualifying lap around the tight streets of Monte Carlo to secure pole position for the Monaco Grand Prix. The Dutchman's precision and car control were on full display as he threaded his Red Bull through the famous barriers with millimeter perfection.",
    category: "F1",
    image: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&auto=format",
    author: "James Hunt Jr.",
    date: "8 hours ago",
    readTime: "3 min read",
  },
  {
    id: "5",
    title: "Cricket World Cup: India's Bowling Attack Dismantles Australia",
    excerpt: "India's pace battery delivers a devastating performance to bowl out Australia for just 147.",
    content: "India's fearsome pace attack put on a masterclass display of fast bowling to demolish Australia's batting lineup in a crucial World Cup encounter. The trio of pacers shared nine wickets between them, with Australia's batsmen having no answer to the relentless assault.",
    category: "Cricket",
    image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800&auto=format",
    author: "Raj Patel",
    date: "10 hours ago",
    readTime: "4 min read",
  },
  {
    id: "6",
    title: "Transfer Deadline Day: Record-Breaking Moves Shake European Football",
    excerpt: "Multiple record transfers completed as clubs scramble to strengthen squads before the window closes.",
    content: "Transfer deadline day lived up to its reputation for drama, with several record-breaking deals completed in the final hours. The biggest move of the day saw a €180 million transfer, making it the most expensive signing in football history.",
    category: "Football",
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&auto=format",
    author: "Emma Roberts",
    date: "12 hours ago",
    readTime: "5 min read",
  },
];

export const liveMatches: Match[] = [
  { id: "m1", homeTeam: "Arsenal", awayTeam: "Chelsea", homeScore: 2, awayScore: 1, minute: "67'", league: "Premier League", isLive: true },
  { id: "m2", homeTeam: "Barcelona", awayTeam: "Atletico", homeScore: 0, awayScore: 0, minute: "23'", league: "La Liga", isLive: true },
  { id: "m3", homeTeam: "Bayern", awayTeam: "Dortmund", homeScore: 3, awayScore: 2, minute: "88'", league: "Bundesliga", isLive: true },
  { id: "m4", homeTeam: "PSG", awayTeam: "Lyon", homeScore: 1, awayScore: 0, minute: "45+2'", league: "Ligue 1", isLive: true },
  { id: "m5", homeTeam: "Juventus", awayTeam: "AC Milan", homeScore: 1, awayScore: 1, minute: "FT", league: "Serie A", isLive: false },
];

export const leagueTable: LeagueRow[] = [
  { position: 1, team: "Arsenal", played: 28, won: 22, drawn: 4, lost: 2, points: 70 },
  { position: 2, team: "Man City", played: 28, won: 20, drawn: 5, lost: 3, points: 65 },
  { position: 3, team: "Liverpool", played: 28, won: 19, drawn: 6, lost: 3, points: 63 },
  { position: 4, team: "Aston Villa", played: 28, won: 17, drawn: 4, lost: 7, points: 55 },
  { position: 5, team: "Tottenham", played: 28, won: 15, drawn: 5, lost: 8, points: 50 },
  { position: 6, team: "Chelsea", played: 28, won: 14, drawn: 5, lost: 9, points: 47 },
];
