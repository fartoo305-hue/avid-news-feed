import { MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "201070366961";

export function WhatsAppButton() {
  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="تواصل معنا عبر واتساب"
      className="fixed bottom-6 start-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-elevated transition-transform hover:scale-110 active:scale-95"
    >
      <MessageCircle className="h-7 w-7" />
    </a>
  );
}

export function WhatsAppShareButton({ title, url }: { title: string; url: string }) {
  const shareUrl = `https://wa.me/?text=${encodeURIComponent(`${title}\n${url}`)}`;
  return (
    <a
      href={shareUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 rounded-md border border-input bg-background px-3 py-1.5 text-sm font-semibold font-body transition-colors hover:bg-muted"
    >
      <MessageCircle className="h-4 w-4 text-[#25D366]" />
      واتساب
    </a>
  );
}
