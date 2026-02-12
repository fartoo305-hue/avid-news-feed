import { useState } from "react";
import { Search, Menu, X, MessageCircle } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { categories, Category } from "@/data/mockData";

interface HeaderProps {
  onSearch: (query: string) => void;
  activeCategory: Category;
  onCategoryChange: (cat: Category) => void;
}

export function Header({ onSearch, activeCategory, onCategoryChange }: HeaderProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenu, setMobileMenu] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
    setSearchOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              className="lg:hidden"
              onClick={() => setMobileMenu(!mobileMenu)}
              aria-label="القائمة"
            >
              {mobileMenu ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                <span className="text-lg font-black text-primary-foreground font-body">S</span>
              </div>
              <span className="text-xl font-black tracking-tight font-body hidden sm:inline">
                سبورتس بالس
              </span>
            </Link>
          </div>

          <nav className="hidden lg:flex items-center gap-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => onCategoryChange(cat)}
                className={`px-3 py-2 text-sm font-semibold rounded-md transition-colors font-body ${
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {cat}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {searchOpen ? (
              <form onSubmit={handleSearch} className="flex items-center">
                <input
                  autoFocus
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="ابحث في الأخبار..."
                  className="h-9 w-48 rounded-lg border border-input bg-muted px-3 text-sm font-body focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <Button type="submit" size="sm" variant="ghost" className="ms-1">
                  <Search className="h-4 w-4" />
                </Button>
              </form>
            ) : (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSearchOpen(true)}
                className="rounded-full"
              >
                <Search className="h-5 w-5" />
              </Button>
            )}
            <a
              href="https://wa.me/201070366961"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1 rounded-full bg-[#25D366] px-3 py-1.5 text-xs font-bold text-white font-body transition-transform hover:scale-105"
            >
              <MessageCircle className="h-3.5 w-3.5" />
              قناتنا
            </a>
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile category nav */}
        {mobileMenu && (
          <div className="lg:hidden pb-4 flex flex-wrap gap-2 animate-slide-up">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  onCategoryChange(cat);
                  setMobileMenu(false);
                }}
                className={`px-3 py-1.5 text-sm font-semibold rounded-full transition-colors font-body ${
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
