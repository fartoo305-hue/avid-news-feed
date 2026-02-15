import { useState, useEffect, forwardRef } from "react";
import { X, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const MotionDiv = forwardRef<HTMLDivElement, any>((props, ref) => (
  <motion.div ref={ref} {...props} />
));
MotionDiv.displayName = "MotionDiv";

export function NewsletterPopup() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const dismissed = sessionStorage.getItem("newsletter-dismissed");
    if (!dismissed) {
      const timer = setTimeout(() => setShow(true), 8000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setShow(false);
      sessionStorage.setItem("newsletter-dismissed", "true");
    }, 2000);
  };

  const handleClose = () => {
    setShow(false);
    sessionStorage.setItem("newsletter-dismissed", "true");
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.95 }}
          className="fixed bottom-6 start-6 z-50 w-[340px] max-w-[calc(100vw-2rem)] rounded-xl border border-border bg-card p-6 shadow-elevated"
        >
          <button
            onClick={handleClose}
            className="absolute top-3 start-3 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>

          {submitted ? (
            <div className="text-center py-2">
              <p className="font-bold font-body text-lg">🎉 تم الاشتراك!</p>
              <p className="text-sm text-muted-foreground font-body mt-1">
                تحقق من بريدك الإلكتروني لآخر التحديثات الرياضية.
              </p>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-2 mb-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                  <Mail className="h-4 w-4 text-primary" />
                </div>
                <h4 className="font-bold font-body">ابقَ على اطلاع</h4>
              </div>
              <p className="text-sm text-muted-foreground font-body mb-4">
                احصل على آخر الأخبار الرياضية العاجلة مباشرة في بريدك الإلكتروني.
              </p>
              <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="بريدك@الإلكتروني.com"
                  className="flex-1 h-9 rounded-lg border border-input bg-muted px-3 text-sm font-body focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <Button type="submit" size="sm" className="font-body font-semibold">
                  اشترك
                </Button>
              </form>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
