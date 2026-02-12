import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  message: z.string().trim().min(1).max(2000),
});

export default function ContactUs() {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = contactSchema.safeParse(form);
    if (!result.success) {
      toast({ title: "خطأ", description: "يرجى ملء جميع الحقول بشكل صحيح.", variant: "destructive" });
      return;
    }
    setSending(true);
    const mailto = `mailto:frtofartoo305@gmail.com?subject=${encodeURIComponent(`رسالة من ${form.name}`)}&body=${encodeURIComponent(`الاسم: ${form.name}\nالبريد: ${form.email}\n\n${form.message}`)}`;
    window.open(mailto, "_blank");
    setSending(false);
    toast({ title: "تم", description: "تم فتح تطبيق البريد الإلكتروني لإرسال رسالتك." });
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-xl">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground font-body mb-6">
          <ArrowRight className="h-4 w-4" /> العودة إلى الرئيسية
        </Link>

        <h1 className="text-3xl font-black mb-6">اتصل بنا</h1>

        <form onSubmit={handleSubmit} className="space-y-4 font-body">
          <div>
            <label className="block text-sm font-semibold mb-1">الاسم</label>
            <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="اسمك الكامل" required maxLength={100} />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">البريد الإلكتروني</label>
            <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="example@email.com" required maxLength={255} />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">الرسالة</label>
            <textarea
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder="اكتب رسالتك هنا..."
              required
              maxLength={2000}
              rows={5}
              className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm font-body ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            />
          </div>
          <Button type="submit" disabled={sending} className="w-full font-body">
            <Send className="h-4 w-4 me-2" />
            إرسال الرسالة
          </Button>
        </form>
      </div>
    </div>
  );
}
