import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Plus, Trash2, Edit, ArrowRight, LogOut, Rss, Loader2, Tv } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface ArticleRow {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  image: string;
  author: string;
  read_time: string;
  is_breaking: boolean;
  is_published: boolean;
  created_at: string;
}

interface StreamRow {
  id: string;
  match_id: string;
  match_label: string;
  stream_url: string;
  stream_source: string;
  is_active: boolean;
}

export default function AdminPage() {
  const [articles, setArticles] = useState<ArticleRow[]>([]);
  const [streams, setStreams] = useState<StreamRow[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<ArticleRow | null>(null);
  const [form, setForm] = useState({ title: "", excerpt: "", content: "", category: "كرة القدم", image: "", author: "المحرر", is_breaking: false });
  const [streamForm, setStreamForm] = useState({ match_id: "", match_label: "", stream_url: "", stream_source: "مصدر خارجي" });
  const [activeTab, setActiveTab] = useState<"articles" | "streams">("articles");
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => { checkAdmin(); }, []);

  const checkAdmin = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { navigate("/auth"); return; }
    const { data: roles } = await supabase.from("user_roles").select("role").eq("user_id", user.id);
    if (!roles?.some((r: any) => r.role === "admin")) {
      toast({ title: "غير مصرح", description: "ليس لديك صلاحيات المسؤول.", variant: "destructive" });
      navigate("/"); return;
    }
    setIsAdmin(true);
    fetchArticles();
    fetchStreams();
  };

  const fetchArticles = async () => {
    setLoading(true);
    const { data } = await supabase.from("articles").select("*").order("created_at", { ascending: false });
    setArticles((data as ArticleRow[]) || []);
    setLoading(false);
  };

  const fetchStreams = async () => {
    const { data } = await supabase.from("match_streams").select("*").order("created_at", { ascending: false });
    setStreams((data as StreamRow[]) || []);
  };

  const handleSave = async () => {
    if (!form.title || !form.content) {
      toast({ title: "خطأ", description: "العنوان والمحتوى مطلوبان", variant: "destructive" }); return;
    }
    if (editing) {
      const { error } = await supabase.from("articles").update({ ...form, is_published: true }).eq("id", editing.id);
      if (error) { toast({ title: "خطأ", description: error.message, variant: "destructive" }); return; }
      toast({ title: "تم تحديث المقال" });
    } else {
      const { error } = await supabase.from("articles").insert({ ...form, is_published: true, read_time: "٣ دقائق للقراءة" });
      if (error) { toast({ title: "خطأ", description: error.message, variant: "destructive" }); return; }
      toast({ title: "تم إضافة المقال" });
    }
    setForm({ title: "", excerpt: "", content: "", category: "كرة القدم", image: "", author: "المحرر", is_breaking: false });
    setEditing(null);
    fetchArticles();
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("articles").delete().eq("id", id);
    if (error) { toast({ title: "خطأ", description: error.message, variant: "destructive" }); return; }
    toast({ title: "تم حذف المقال" }); fetchArticles();
  };

  const handleSaveStream = async () => {
    if (!streamForm.match_id || !streamForm.stream_url) {
      toast({ title: "خطأ", description: "معرف المباراة ورابط البث مطلوبان", variant: "destructive" }); return;
    }
    const { error } = await supabase.from("match_streams").insert({ ...streamForm, is_active: true });
    if (error) { toast({ title: "خطأ", description: error.message, variant: "destructive" }); return; }
    toast({ title: "تم إضافة رابط البث" });
    setStreamForm({ match_id: "", match_label: "", stream_url: "", stream_source: "مصدر خارجي" });
    fetchStreams();
  };

  const handleDeleteStream = async (id: string) => {
    const { error } = await supabase.from("match_streams").delete().eq("id", id);
    if (error) { toast({ title: "خطأ", description: error.message, variant: "destructive" }); return; }
    toast({ title: "تم حذف رابط البث" }); fetchStreams();
  };

  const [fetchingRss, setFetchingRss] = useState(false);
  const handleFetchRss = async () => {
    setFetchingRss(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const { data, error: fnError } = await supabase.functions.invoke("fetch-rss-news", {
        headers: { Authorization: `Bearer ${session?.access_token}` },
      });
      if (fnError) throw fnError;
      toast({ title: "تم جلب الأخبار", description: `تمت إضافة ${data?.inserted || 0} مقال جديد` });
      fetchArticles();
    } catch (err: any) {
      toast({ title: "خطأ", description: err.message, variant: "destructive" });
    } finally { setFetchingRss(false); }
  };

  const handleLogout = async () => { await supabase.auth.signOut(); navigate("/"); };

  if (!isAdmin) return <div className="min-h-screen flex items-center justify-center bg-background font-body">جارٍ التحقق...</div>;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Link to="/" className="text-muted-foreground hover:text-foreground"><ArrowRight className="h-5 w-5" /></Link>
            <h1 className="text-2xl font-black">لوحة التحكم</h1>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleFetchRss} disabled={fetchingRss}>
              {fetchingRss ? <Loader2 className="h-4 w-4 me-1 animate-spin" /> : <Rss className="h-4 w-4 me-1" />}
              جلب أخبار RSS
            </Button>
            <Button variant="ghost" size="sm" onClick={handleLogout}><LogOut className="h-4 w-4 me-1" /> خروج</Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button onClick={() => setActiveTab("articles")} className={`px-4 py-2 rounded-lg text-sm font-bold font-body transition-colors ${activeTab === "articles" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
            📰 المقالات
          </button>
          <button onClick={() => setActiveTab("streams")} className={`px-4 py-2 rounded-lg text-sm font-bold font-body transition-colors ${activeTab === "streams" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
            📺 روابط البث
          </button>
        </div>

        {activeTab === "articles" ? (
          <>
            {/* Article Form */}
            <div className="rounded-xl border border-border bg-card p-4 mb-6 space-y-3 font-body">
              <h2 className="font-bold">{editing ? "تعديل المقال" : "إضافة مقال جديد"}</h2>
              <Input placeholder="العنوان" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
              <Input placeholder="المقتطف" value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} />
              <textarea placeholder="المحتوى الكامل" value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} rows={4} className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
              <div className="flex flex-wrap gap-3">
                <Input placeholder="رابط الصورة" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} className="flex-1" />
                <Input placeholder="الكاتب" value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} className="w-32" />
                <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="rounded-md border border-input bg-background px-3 py-2 text-sm">
                  <option>كرة القدم</option><option>كرة السلة</option><option>التنس</option><option>الكريكيت</option><option>فورمولا 1</option>
                </select>
              </div>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={form.is_breaking} onChange={(e) => setForm({ ...form, is_breaking: e.target.checked })} /> خبر عاجل
              </label>
              <div className="flex gap-2">
                <Button onClick={handleSave}><Plus className="h-4 w-4 me-1" /> {editing ? "تحديث" : "نشر"}</Button>
                {editing && <Button variant="outline" onClick={() => { setEditing(null); setForm({ title: "", excerpt: "", content: "", category: "كرة القدم", image: "", author: "المحرر", is_breaking: false }); }}>إلغاء</Button>}
              </div>
            </div>
            {/* Articles list */}
            <div className="space-y-3">
              {loading ? <p className="text-center text-muted-foreground font-body">جارٍ التحميل...</p> :
                articles.length === 0 ? <p className="text-center text-muted-foreground font-body">لا توجد مقالات بعد.</p> :
                articles.map((a) => (
                  <div key={a.id} className="flex items-center justify-between rounded-lg border border-border bg-card p-3 font-body">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        {a.is_breaking && <span className="text-[10px] bg-primary text-primary-foreground px-1.5 py-0.5 rounded font-bold">عاجل</span>}
                        <span className="text-xs text-muted-foreground">{a.category}</span>
                      </div>
                      <p className="font-semibold text-sm truncate">{a.title}</p>
                    </div>
                    <div className="flex gap-1 ms-2">
                      <Button variant="ghost" size="icon" onClick={() => { setEditing(a); setForm({ title: a.title, excerpt: a.excerpt, content: a.content, category: a.category, image: a.image, author: a.author, is_breaking: a.is_breaking }); }}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(a.id)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                ))
              }
            </div>
          </>
        ) : (
          <>
            {/* Stream Form */}
            <div className="rounded-xl border border-border bg-card p-4 mb-6 space-y-3 font-body">
              <h2 className="font-bold flex items-center gap-2"><Tv className="h-5 w-5" /> إضافة رابط بث مباشر</h2>
              <Input placeholder="معرف المباراة (match ID من صفحة المباريات)" value={streamForm.match_id} onChange={(e) => setStreamForm({ ...streamForm, match_id: e.target.value })} />
              <Input placeholder="وصف المباراة (مثال: ريال مدريد ضد برشلونة)" value={streamForm.match_label} onChange={(e) => setStreamForm({ ...streamForm, match_label: e.target.value })} />
              <Input placeholder="رابط البث (m3u8 أو رابط مباشر)" value={streamForm.stream_url} onChange={(e) => setStreamForm({ ...streamForm, stream_url: e.target.value })} />
              <Input placeholder="اسم المصدر" value={streamForm.stream_source} onChange={(e) => setStreamForm({ ...streamForm, stream_source: e.target.value })} />
              <Button onClick={handleSaveStream}><Plus className="h-4 w-4 me-1" /> إضافة البث</Button>
            </div>
            {/* Streams list */}
            <div className="space-y-3">
              {streams.length === 0 ? <p className="text-center text-muted-foreground font-body">لا توجد روابط بث بعد.</p> :
                streams.map((s) => (
                  <div key={s.id} className="flex items-center justify-between rounded-lg border border-border bg-card p-3 font-body">
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm">{s.match_label || s.match_id}</p>
                      <p className="text-xs text-muted-foreground truncate">{s.stream_url}</p>
                      <span className="text-[10px] bg-muted px-1.5 py-0.5 rounded">{s.stream_source}</span>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => handleDeleteStream(s.id)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                ))
              }
            </div>
          </>
        )}
      </div>
    </div>
  );
}
