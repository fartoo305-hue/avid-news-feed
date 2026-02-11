import { useParams, Link } from "react-router-dom";
import { ArrowRight, Share2, Twitter, Facebook, Link as LinkIcon, Clock } from "lucide-react";
import { articles } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function ArticlePage() {
  const { id } = useParams();
  const article = articles.find((a) => a.id === id);

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">المقال غير موجود</h1>
          <Link to="/" className="text-primary font-body hover:underline">
            العودة إلى الرئيسية
          </Link>
        </div>
      </div>
    );
  }

  const shareUrl = window.location.href;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6 max-w-3xl">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground font-body mb-6 transition-colors"
        >
          <ArrowRight className="h-4 w-4" />
          العودة إلى الأخبار
        </Link>

        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground font-body uppercase tracking-wide mb-4">
            {article.category}
          </span>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black leading-tight mb-4">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground font-body mb-6">
            <span className="font-semibold text-foreground">{article.author}</span>
            <span>{article.date}</span>
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {article.readTime}
            </span>
          </div>

          <div className="rounded-xl overflow-hidden mb-8 aspect-video">
            <img
              src={article.image}
              alt={article.title}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="prose prose-lg max-w-none font-body text-foreground/90 leading-relaxed space-y-4 mb-8">
            {article.content.split("\n\n").map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          {/* Share buttons */}
          <div className="border-t border-border pt-6">
            <div className="flex items-center gap-3">
              <Share2 className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-semibold font-body">شارك هذا المقال</span>
            </div>
            <div className="flex gap-2 mt-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(article.title)}`, "_blank")}
                className="font-body"
              >
                <Twitter className="h-4 w-4 me-1.5" />
                تويتر
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, "_blank")}
                className="font-body"
              >
                <Facebook className="h-4 w-4 me-1.5" />
                فيسبوك
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  navigator.clipboard.writeText(shareUrl);
                }}
                className="font-body"
              >
                <LinkIcon className="h-4 w-4 me-1.5" />
                نسخ الرابط
              </Button>
            </div>
          </div>
        </motion.article>
      </div>
    </div>
  );
}
