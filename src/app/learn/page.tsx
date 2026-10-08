import { Reveal } from "@/components/ui/Reveal";
import { ToastContainer } from "@/components/ui/Toast";

const articles = [
  {
    slug: "why-precious-metals",
    category: "BASICS",
    title: "Why precious metals",
    excerpt: "Gold and silver have served as stores of value for millennia. Unlike paper currency, they cannot be printed. A coin is a tangible, portable, private holding.",
    readTime: "4 min",
    featured: true,
  },
  {
    slug: "spot-price-premiums",
    category: "PRICING",
    title: "Spot price and premiums",
    excerpt: "The spot price is the current market value per gram of raw metal. The premium covers refining, minting, assay certification, packaging and distribution.",
    readTime: "5 min",
    featured: true,
  },
  {
    slug: "assay-serial-numbers",
    category: "CERTIFICATION",
    title: "Assay and serial numbers",
    excerpt: "Each coin is tested using X-ray fluorescence spectroscopy. The result is recorded against a unique serial number engraved during minting.",
    readTime: "4 min",
    featured: true,
  },
  {
    slug: "storage-care",
    category: "STORAGE",
    title: "Handling and care",
    excerpt: "Coins are sealed in tamper-evident capsules. Handle by the edge only. Store in a cool, dry environment away from direct sunlight.",
    readTime: "3 min",
    featured: true,
  },
  {
    slug: "gold-vs-silver",
    category: "BASICS",
    title: "Gold vs Silver for investors",
    excerpt: "Comparing the two metals: volatility, liquidity, storage density, and portfolio allocation strategies.",
    readTime: "6 min",
    featured: false,
  },
  {
    slug: "fineness-purity",
    category: "CERTIFICATION",
    title: "Understanding fineness and purity",
    excerpt: "What 999.9, 995, 916 and other hallmarks mean. How karats relate to parts-per-thousand purity.",
    readTime: "4 min",
    featured: false,
  },
  {
    slug: "coin-vs-bar",
    category: "BASICS",
    title: "Coins vs bars: which to buy",
    excerpt: "Comparing divisibility, premiums, liquidity, collectability and storage considerations.",
    readTime: "5 min",
    featured: false,
  },
  {
    slug: "tax-implications",
    category: "PRICING",
    title: "Tax implications in India",
    excerpt: "GST on precious metals, capital gains on sale, wealth tax considerations and documentation requirements.",
    readTime: "7 min",
    featured: false,
  },
];

export default function LearnPage() {
  return (
    <div data-metal="gold">
      <ToastContainer />
      <section className="pt-32 pb-section bg-premium-0">
        <div className="max-w-[var(--grid-max)] mx-auto px-[var(--grid-gutter)]">
          <Reveal>
            <p className="font-mono-label text-gold-500 text-[10px] mb-3">LEARN CENTER</p>
            <h1
              className="font-[family-name:var(--font-display)] text-ivory mb-6"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
            >
              Understanding precious metals
            </h1>
            <p className="text-ivory-mute max-w-lg mb-12">
              A practical guide to gold and silver as tangible assets.
              How coins are minted, priced, certified and stored.
            </p>
          </Reveal>

          {/* Featured articles */}
          <Reveal delay={0.1}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              {articles.filter(a => a.featured).map((article, i) => (
                <FeaturedArticle key={article.slug} article={article} index={i} />
              ))}
            </div>
          </Reveal>

          {/* All articles */}
          <Reveal delay={0.2}>
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-display text-ivory" style={{ fontSize: "1.5rem" }}>All Articles</h2>
              <div className="flex items-center gap-2 text-ivory-mute text-sm">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <path d="M21 21l-4.35-4.35" />
                </svg>
                <input type="search" placeholder="Search articles..." className="bg-surface-elevated border border-line px-3 py-1.5 text-ivory text-sm rounded-[var(--radius-sharp)] placeholder:text-ivory-mute/40 focus:outline-none focus:border-gold-500 w-48" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.filter(a => !a.featured).map((article, i) => (
                <ArticleCard key={article.slug} article={article} index={i} />
              ))}
            </div>
          </Reveal>

          {/* Categories */}
          <Reveal delay={0.3}>
            <div className="mt-16">
              <h2 className="font-display text-ivory mb-8" style={{ fontSize: "1.5rem" }}>Explore by Topic</h2>
              <div className="flex flex-wrap gap-3">
                {["Basics", "Pricing", "Certification", "Storage", "Investing", "Gifting"].map(cat => (
                  <button key={cat} className="px-4 py-2 bg-surface border border-line text-ivory-mute hover:text-ivory hover:border-gold-500/50 rounded-full font-mono-label text-[10px] transition-colors">
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>    </div>
  );
}

function FeaturedArticle({ article, index }: { article: typeof articles[0]; index: number }) {
  const categories: Record<string, { color: string; bg: string }> = {
    BASICS: { color: "text-gold-400", bg: "bg-gold-600/10" },
    PRICING: { color: "text-rose-400", bg: "bg-rose-600/10" },
    CERTIFICATION: { color: "text-emerald-400", bg: "bg-emerald-600/10" },
    STORAGE: { color: "text-blue-400", bg: "bg-blue-600/10" },
  };
  const cat = categories[article.category] || { color: "text-ivory-mute", bg: "bg-surface-elevated" };

  return (
    <article className="group relative overflow-hidden border border-line rounded-[var(--radius-sharp)] bg-surface hover:border-gold-700/50 transition-colors">
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-gold-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="relative p-6 md:p-8">
        <span className={`font-mono-label text-[10px] px-2 py-0.5 rounded ${cat.bg} ${cat.color}`}>
          {article.category}
        </span>
        <h2 className="font-display text-ivory mt-4 mb-3 group-hover:text-gold-400 transition-colors" style={{ fontSize: "1.5rem" }}>
          {article.title}
        </h2>
        <p className="text-ivory-mute text-sm leading-relaxed mb-6 line-clamp-3">
          {article.excerpt}
        </p>
        <div className="flex items-center justify-between pt-4 border-t border-line">
          <span className="font-mono-label text-ivory-mute/50 text-[9px]">{article.readTime} read</span>
          <button className="text-ivory-mute hover:text-gold-400 font-mono-label text-[10px] flex items-center gap-1 group-hover:gap-2 transition-all">
            Read more
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </article>
  );
}

function ArticleCard({ article, index }: { article: typeof articles[0]; index: number }) {
  const categories: Record<string, { color: string; bg: string }> = {
    BASICS: { color: "text-gold-400", bg: "bg-gold-600/10" },
    PRICING: { color: "text-rose-400", bg: "bg-rose-600/10" },
    CERTIFICATION: { color: "text-emerald-400", bg: "bg-emerald-600/10" },
    STORAGE: { color: "text-blue-400", bg: "bg-blue-600/10" },
  };
  const cat = categories[article.category] || { color: "text-ivory-mute", bg: "bg-surface-elevated" };

  return (
    <article className="group border border-line rounded-[var(--radius-sharp)] bg-surface hover:border-gold-700/50 transition-colors overflow-hidden">
      <div className="p-6">
        <span className={`font-mono-label text-[10px] px-2 py-0.5 rounded ${cat.bg} ${cat.color} inline-block mb-3`}>
          {article.category}
        </span>
        <h3 className="font-display text-ivory mb-2 group-hover:text-gold-400 transition-colors" style={{ fontSize: "1.125rem" }}>
          {article.title}
        </h3>
        <p className="text-ivory-mute text-sm leading-relaxed mb-4 line-clamp-2">
          {article.excerpt}
        </p>
        <div className="flex items-center justify-between pt-3 border-t border-line">
          <span className="font-mono-label text-ivory-mute/50 text-[9px]">{article.readTime} read</span>
          <button className="text-ivory-mute hover:text-gold-400 font-mono-label text-[10px] flex items-center gap-1 group-hover:gap-2 transition-all">
            Read
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </article>
  );
}
