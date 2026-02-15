import { useState, useEffect } from "react";
import { Plus, Trash2, Tv } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface StreamRow {
  id: string;
  match_id: string;
  match_label: string;
  stream_url: string;
  stream_source: string;
  is_active: boolean;
}

export function AdminStreamsTab() {
  const [streams, setStreams] = useState<StreamRow[]>([]);
  const [streamForm, setStreamForm] = useState({ match_id: "", match_label: "", stream_url: "", stream_source: "سيرفر 1" });
  const { toast } = useToast();

  useEffect(() => { fetchStreams(); }, []);

  const fetchStreams = async () => {
    const { data } = await supabase.from("match_streams").select("*").order("created_at", { ascending: false });
    setStreams((data as StreamRow[]) || []);
  };

  const handleSaveStream = async () => {
    if (!streamForm.match_id || !streamForm.stream_url) {
      toast({ title: "خطأ", description: "معرف المباراة ورابط البث مطلوبان", variant: "destructive" }); return;
    }
    const { error } = await supabase.from("match_streams").insert({ ...streamForm, is_active: true });
    if (error) { toast({ title: "خطأ", description: error.message, variant: "destructive" }); return; }
    toast({ title: "تم إضافة رابط البث" });
    setStreamForm({ match_id: "", match_label: "", stream_url: "", stream_source: "سيرفر 1" });
    fetchStreams();
  };

  const handleDeleteStream = async (id: string) => {
    const { error } = await supabase.from("match_streams").delete().eq("id", id);
    if (error) { toast({ title: "خطأ", description: error.message, variant: "destructive" }); return; }
    toast({ title: "تم حذف رابط البث" }); fetchStreams();
  };

  return (
    <>
      <div className="rounded-xl border border-border bg-card p-4 mb-6 space-y-3 font-body">
        <h2 className="font-bold flex items-center gap-2"><Tv className="h-5 w-5" /> إضافة رابط بث مباشر (متعدد السيرفرات)</h2>
        <p className="text-xs text-muted-foreground">أضف عدة سيرفرات لنفس المباراة بنفس معرف المباراة لتظهر كخيارات متعددة للمشاهد</p>
        <Input placeholder="معرف المباراة (match ID)" value={streamForm.match_id} onChange={(e) => setStreamForm({ ...streamForm, match_id: e.target.value })} />
        <Input placeholder="وصف المباراة (مثال: الأهلي ضد الزمالك)" value={streamForm.match_label} onChange={(e) => setStreamForm({ ...streamForm, match_label: e.target.value })} />
        <Input placeholder="رابط البث (m3u8 أو رابط مباشر)" value={streamForm.stream_url} onChange={(e) => setStreamForm({ ...streamForm, stream_url: e.target.value })} />
        <select value={streamForm.stream_source} onChange={(e) => setStreamForm({ ...streamForm, stream_source: e.target.value })} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm font-body">
          <option>سيرفر 1</option>
          <option>سيرفر 2</option>
          <option>سيرفر 3</option>
          <option>سيرفر احتياطي</option>
        </select>
        <Button onClick={handleSaveStream}><Plus className="h-4 w-4 me-1" /> إضافة البث</Button>
      </div>
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
  );
}
