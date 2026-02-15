import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Plus, Trash2, Edit, ArrowRight, LogOut, Rss, Loader2, Tv, User, Settings, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AdminArticlesTab } from "@/components/admin/AdminArticlesTab";
import { AdminStreamsTab } from "@/components/admin/AdminStreamsTab";
import { AdminAccountTab } from "@/components/admin/AdminAccountTab";
import { AdminStatsTab } from "@/components/admin/AdminStatsTab";

export default function AdminPage() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [fetchingRss, setFetchingRss] = useState(false);
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
    setLoading(false);
  };

  const handleFetchRss = async () => {
    setFetchingRss(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const { data, error: fnError } = await supabase.functions.invoke("fetch-rss-news", {
        headers: { Authorization: `Bearer ${session?.access_token}` },
      });
      if (fnError) throw fnError;
      toast({ title: "تم جلب الأخبار", description: `تمت إضافة ${data?.inserted || 0} مقال جديد` });
    } catch (err: any) {
      toast({ title: "خطأ", description: err.message, variant: "destructive" });
    } finally { setFetchingRss(false); }
  };

  const handleLogout = async () => { await supabase.auth.signOut(); navigate("/"); };

  if (!isAdmin || loading) return <div className="min-h-screen flex items-center justify-center bg-background font-body">جارٍ التحقق...</div>;

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <div className="container mx-auto px-4 py-6 max-w-5xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Link to="/" className="text-muted-foreground hover:text-foreground"><ArrowRight className="h-5 w-5" /></Link>
            <h1 className="text-2xl font-black font-body">لوحة التحكم</h1>
            <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-body font-bold">@ft305</span>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleFetchRss} disabled={fetchingRss}>
              {fetchingRss ? <Loader2 className="h-4 w-4 me-1 animate-spin" /> : <Rss className="h-4 w-4 me-1" />}
              جلب أخبار RSS
            </Button>
            <Button variant="ghost" size="sm" onClick={handleLogout}><LogOut className="h-4 w-4 me-1" /> خروج</Button>
          </div>
        </div>

        <Tabs defaultValue="articles" dir="rtl">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="articles" className="font-body font-bold text-xs gap-1">
              <Edit className="h-3.5 w-3.5" /> المقالات
            </TabsTrigger>
            <TabsTrigger value="streams" className="font-body font-bold text-xs gap-1">
              <Tv className="h-3.5 w-3.5" /> البث
            </TabsTrigger>
            <TabsTrigger value="account" className="font-body font-bold text-xs gap-1">
              <User className="h-3.5 w-3.5" /> الحساب
            </TabsTrigger>
            <TabsTrigger value="stats" className="font-body font-bold text-xs gap-1">
              <BarChart3 className="h-3.5 w-3.5" /> الإحصائيات
            </TabsTrigger>
          </TabsList>

          <TabsContent value="articles"><AdminArticlesTab /></TabsContent>
          <TabsContent value="streams"><AdminStreamsTab /></TabsContent>
          <TabsContent value="account"><AdminAccountTab /></TabsContent>
          <TabsContent value="stats"><AdminStatsTab /></TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
