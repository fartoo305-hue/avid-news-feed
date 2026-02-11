import { useState, useMemo } from "react";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { NewsCard } from "@/components/NewsCard";
import { LiveScores } from "@/components/LiveScores";
import { LeagueTable } from "@/components/LeagueTable";
import { NewsletterPopup } from "@/components/NewsletterPopup";
import { articles, Category } from "@/data/mockData";

const Index = () => {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const breakingArticle = articles.find((a) => a.isBreaking) || articles[0];

  const filteredArticles = useMemo(() => {
    let filtered = articles.filter((a) => a.id !== breakingArticle.id);
    if (activeCategory !== "All") {
      filtered = filtered.filter((a) => a.category === activeCategory);
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.excerpt.toLowerCase().includes(q) ||
          a.category.toLowerCase().includes(q)
      );
    }
    return filtered;
  }, [activeCategory, searchQuery, breakingArticle.id]);

  return (
    <div className="min-h-screen bg-background">
      <Header
        onSearch={setSearchQuery}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />

      <main className="container mx-auto px-4 py-6">
        <HeroSection article={breakingArticle} />

        <div className="flex flex-col lg:flex-row gap-8">
          {/* News Grid */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-black">
                {activeCategory === "All" ? "Trending News" : activeCategory}
              </h2>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="text-sm text-primary font-body hover:underline"
                >
                  Clear search
                </button>
              )}
            </div>

            {filteredArticles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredArticles.map((article, i) => (
                  <NewsCard key={article.id} article={article} index={i} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground font-body">
                <p className="text-lg">No articles found.</p>
                <p className="text-sm mt-1">Try a different category or search term.</p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="w-full lg:w-80 shrink-0 space-y-6">
            <LiveScores />
            <LeagueTable />
          </aside>
        </div>
      </main>

      <footer className="border-t border-border mt-12 py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground font-body">
          <p>© 2025 SportsPulse. All rights reserved.</p>
        </div>
      </footer>

      <NewsletterPopup />
    </div>
  );
};

export default Index;
