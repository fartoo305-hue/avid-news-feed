import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Clock } from "lucide-react";
import { Article } from "@/data/mockData";

interface NewsCardProps {
  article: Article;
  index: number;
}

export function NewsCard({ article, index }: NewsCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="group overflow-hidden rounded-xl border border-border bg-card shadow-card hover:shadow-elevated transition-all duration-300"
    >
      <Link to={`/article/${article.id}`}>
        <div className="relative overflow-hidden aspect-video">
          <img
            src={article.image}
            alt={article.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute top-3 left-3">
            <span className="rounded-full bg-primary px-2.5 py-1 text-[11px] font-bold text-primary-foreground font-body uppercase tracking-wide">
              {article.category}
            </span>
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-bold leading-snug mb-2 group-hover:text-primary transition-colors line-clamp-2">
            {article.title}
          </h3>
          <p className="text-sm text-muted-foreground font-body line-clamp-2 mb-3">
            {article.excerpt}
          </p>
          <div className="flex items-center justify-between text-xs text-muted-foreground font-body">
            <span>{article.author}</span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {article.readTime}
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
