export type Category = "الكل" | "كرة القدم" | "كرة السلة" | "التنس" | "الكريكيت" | "فورمولا 1";

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

export const categories: Category[] = ["الكل", "كرة القدم", "كرة السلة", "التنس", "الكريكيت", "فورمولا 1"];

export const articles: Article[] = [
  {
    id: "1",
    title: "نهائي دوري الأبطال: ليلة تاريخية لريال مدريد تحت الأضواء",
    excerpt: "نهاية درامية تشهد تتويج ريال مدريد بلقبه السادس عشر في دوري أبطال أوروبا في ليلة لا تُنسى على ملعب ويمبلي.",
    content: "في واحدة من أكثر نهائيات دوري الأبطال إثارة في الذاكرة الحديثة، أكمل ريال مدريد عودة مذهلة ليحقق لقبه الأوروبي السادس عشر. بعد تأخره بهدفين في الشوط الأول، قدّم العملاق الإسباني أداءً استثنائياً في الشوط الثاني سيُحكى عنه لأجيال.\n\nبدأت المباراة على ملعب ويمبلي بسيطرة الفريق المنافس، مستغلاً الثغرات في وسط ميدان مدريد. هدفان سريعان قبل الاستراحة وضعا أصحاب الرقم القياسي أمام شبح الهزيمة.\n\nلكن كعادته، وجد مدريد الطريق. تغيير تكتيكي في الشوط الثاني غيّر مجرى المباراة، وثلاثة أهداف في عشرين دقيقة نارية قلبت الموازين.\n\nالاحتفالات التي تلت ذلك كانت مشاهد من الفرح الخالص، حيث غمر المشجعون شوارع العاصمة الإسبانية حتى ساعات متأخرة من الليل.",
    category: "كرة القدم",
    image: "https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?w=800&auto=format",
    author: "كارلوس مينديز",
    date: "منذ ساعتين",
    isBreaking: true,
    readTime: "٥ دقائق للقراءة",
  },
  {
    id: "2",
    title: "بلاي أوف NBA: ليكرز يهيمنون في مباراة حاسمة مثيرة",
    excerpt: "ليبرون جيمس يقدم أداءً استثنائياً ليقود ليكرز إلى نهائي المؤتمر.",
    content: "أثبت ليبرون جيمس مرة أخرى لماذا يُعتبر أحد أعظم لاعبي كرة السلة على مر العصور، حيث قدّم أداءً استثنائياً في المباراة السابعة الحاسمة ليقود ليكرز إلى نهائي المؤتمر.\n\nسجّل النجم البالغ من العمر ٣٩ عاماً ٣٨ نقطة وجمع ١٢ متابعة و٨ تمريرات حاسمة في عرض شامل لم يجد الخصم أمامه حلاً. سيطرته على الربع الأخير، حيث سجّل ١٥ نقطة متتالية، ستُسجَّل كواحدة من أعظم العروض في تاريخ بلاي أوف NBA.",
    category: "كرة السلة",
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&auto=format",
    author: "مايك طومسون",
    date: "منذ ٤ ساعات",
    readTime: "٤ دقائق للقراءة",
  },
  {
    id: "3",
    title: "ويمبلدون ٢٠٢٥: صعود نجم جديد في عالم التنس",
    excerpt: "موهبة عمرها ١٩ عاماً تُذهل عالم التنس بوصولها المذهل إلى نصف نهائي ويمبلدون.",
    content: "شهدت ملاعب العشب في نادي إنجلترا الشامل ظهور نجم جديد، حيث شقّ لاعب يبلغ من العمر ١٩ عاماً طريقه إلى نصف نهائي ويمبلدون، متغلباً على ثلاثة لاعبين مصنفين في الطريق.\n\nبإرساله القوي ولعبه الشجاع من خط القاعدة، استحوذ الموهوب الشاب على قلوب عشاق التنس في جميع أنحاء العالم.",
    category: "التنس",
    image: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800&auto=format",
    author: "سارة ويليامز",
    date: "منذ ٦ ساعات",
    readTime: "٣ دقائق للقراءة",
  },
  {
    id: "4",
    title: "فورمولا ١: فيرستابن يحقق المركز الأول في جائزة موناكو الكبرى",
    excerpt: "ماكس فيرستابن من ريد بول يقدم لفة مذهلة ليحقق المركز الأول في شوارع موناكو.",
    content: "قدّم ماكس فيرستابن لفة تأهيلية مذهلة عبر شوارع مونتي كارلو الضيقة ليحقق المركز الأول في جائزة موناكو الكبرى. كانت دقة الهولندي وتحكمه بالسيارة في أبهى صورهما وهو يقود سيارته ريد بول بدقة ملليمترية بين الحواجز الشهيرة.",
    category: "فورمولا 1",
    image: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&auto=format",
    author: "جيمس هانت جونيور",
    date: "منذ ٨ ساعات",
    readTime: "٣ دقائق للقراءة",
  },
  {
    id: "5",
    title: "كأس العالم للكريكيت: هجوم الرمي الهندي يُدمّر أستراليا",
    excerpt: "بطارية الرمي السريع الهندية تقدم أداءً مدمراً لإقصاء أستراليا بـ ١٤٧ نقطة فقط.",
    content: "قدّم هجوم الرمي السريع المخيف للهند عرضاً بارعاً في الرمي السريع لتدمير تشكيلة الضرب الأسترالية في مواجهة حاسمة بكأس العالم. تقاسم ثلاثي الرماة تسع ويكيتات بينهم، ولم يجد ضاربو أستراليا أي إجابة أمام الهجوم المتواصل.",
    category: "الكريكيت",
    image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800&auto=format",
    author: "راج باتيل",
    date: "منذ ١٠ ساعات",
    readTime: "٤ دقائق للقراءة",
  },
  {
    id: "6",
    title: "يوم إغلاق الانتقالات: صفقات قياسية تهزّ كرة القدم الأوروبية",
    excerpt: "إتمام عدة صفقات قياسية مع سعي الأندية لتعزيز صفوفها قبل إغلاق نافذة الانتقالات.",
    content: "عاش يوم إغلاق الانتقالات حتى سمعته المليئة بالدراما، مع إتمام عدة صفقات قياسية في الساعات الأخيرة. أكبر صفقة في اليوم شهدت انتقالاً بقيمة ١٨٠ مليون يورو، مما يجعله أغلى توقيع في تاريخ كرة القدم.",
    category: "كرة القدم",
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&auto=format",
    author: "إيما روبرتس",
    date: "منذ ١٢ ساعة",
    readTime: "٥ دقائق للقراءة",
  },
];

export const liveMatches: Match[] = [
  { id: "m1", homeTeam: "أرسنال", awayTeam: "تشيلسي", homeScore: 2, awayScore: 1, minute: "٦٧'", league: "الدوري الإنجليزي", isLive: true },
  { id: "m2", homeTeam: "برشلونة", awayTeam: "أتلتيكو", homeScore: 0, awayScore: 0, minute: "٢٣'", league: "الدوري الإسباني", isLive: true },
  { id: "m3", homeTeam: "بايرن", awayTeam: "دورتموند", homeScore: 3, awayScore: 2, minute: "٨٨'", league: "الدوري الألماني", isLive: true },
  { id: "m4", homeTeam: "باريس سان جيرمان", awayTeam: "ليون", homeScore: 1, awayScore: 0, minute: "٤٥+٢'", league: "الدوري الفرنسي", isLive: true },
  { id: "m5", homeTeam: "يوفنتوس", awayTeam: "إيه سي ميلان", homeScore: 1, awayScore: 1, minute: "انتهت", league: "الدوري الإيطالي", isLive: false },
];

export const leagueTable: LeagueRow[] = [
  { position: 1, team: "أرسنال", played: 28, won: 22, drawn: 4, lost: 2, points: 70 },
  { position: 2, team: "مان سيتي", played: 28, won: 20, drawn: 5, lost: 3, points: 65 },
  { position: 3, team: "ليفربول", played: 28, won: 19, drawn: 6, lost: 3, points: 63 },
  { position: 4, team: "أستون فيلا", played: 28, won: 17, drawn: 4, lost: 7, points: 55 },
  { position: 5, team: "توتنهام", played: 28, won: 15, drawn: 5, lost: 8, points: 50 },
  { position: 6, team: "تشيلسي", played: 28, won: 14, drawn: 5, lost: 9, points: 47 },
];
