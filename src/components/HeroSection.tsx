import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Article } from "@/data/mockData";
import heroImage from "@/assets/hero-stadium.jpg";

interface HeroSectionProps {
  article: Article;
}

export function HeroSection({ article }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden rounded-xl mb-8">
      <div className="relative h-[400px] md:h-[500px]">
        <img
          src={heroImage}
          alt="أخبار عاجلة"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="absolute bottom-0 left-0 right-0 p-6 md:p-10"
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground font-body uppercase tracking-wide">
              <span className="h-2 w-2 rounded-full bg-primary-foreground animate-pulse-live" />
              عاجل
            </span>
            <span className="text-sm text-white/70 font-body">{article.date}</span>
          </div>
          <Link to={`/article/${article.id}`}>
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-black text-white leading-tight mb-3 hover:underline decoration-primary underline-offset-4">
              {article.title}
            </h1>
          </Link>
          <p className="text-white/80 text-sm md:text-base max-w-2xl font-body line-clamp-2">
            {article.excerpt}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
