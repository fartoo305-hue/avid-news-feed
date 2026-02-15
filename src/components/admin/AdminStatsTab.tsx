import { useState, useEffect } from "react";
import { BarChart3, Eye, FileText, Tv } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export function AdminStatsTab() {
  const [articleCount, setArticleCount] = useState(0);
  const [streamCount, setStreamCount] = useState(0);
  const [visitCount, setVisitCount] = useState(0);

  useEffect(() => {
    // Fetch counts
    supabase.from("articles").select("id", { count: "exact", head: true }).then(({ count }) => setArticleCount(count || 0));
    supabase.from("match_streams").select("id", { count: "exact", head: true }).then(({ count }) => setStreamCount(count || 0));

    // Simple visitor counter using localStorage
    const key = "site_visit_count";
    const stored = parseInt(localStorage.getItem(key) || "0", 10);
    const newCount = stored + 1;
    localStorage.setItem(key, String(newCount));
    setVisitCount(newCount);
  }, []);

  const stats = [
    { label: "إجمالي المقالات", value: articleCount, icon: FileText, color: "text-blue-500" },
    { label: "روابط البث النشطة", value: streamCount, icon: Tv, color: "text-green-500" },
    { label: "زيارات الجلسة", value: visitCount, icon: Eye, color: "text-orange-500" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <BarChart3 className="h-5 w-5 text-primary" />
        <h2 className="font-bold text-lg font-body">إحصائيات الموقع</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-xl border border-border bg-card p-5 text-center font-body">
            <s.icon className={`h-8 w-8 mx-auto mb-2 ${s.color}`} />
            <p className="text-3xl font-black">{s.value}</p>
            <p className="text-sm text-muted-foreground mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-border bg-card p-5 font-body">
        <h3 className="font-bold mb-3">معلومات النظام</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between"><span className="text-muted-foreground">المسؤول</span><span className="font-semibold">@ft305</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">مصدر البيانات</span><span className="font-semibold">iSports + ESPN Fallback</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">مشغل الفيديو</span><span className="font-semibold">Video.js (HLS)</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">واتساب</span><span className="font-semibold">+201070366961 ✓</span></div>
        </div>
      </div>
    </div>
  );
}
