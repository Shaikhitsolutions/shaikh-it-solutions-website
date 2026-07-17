import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ShoppingBag, MessageCircle, Layers, Loader2, Link2, Sparkles } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { supabase } from "@/lib/supabaseClient";

export const Route = createFileRoute("/products")({
  component: Products,
});

interface Product {
  id: number;
  name: string;
  category: string;
  retail_price: number;
  description: string;
  image_url: string;
  is_affiliate?: boolean;
  amazon_link?: string;
  flipkart_link?: string;
  shopsy_link?: string;
  coupon_code?: string;
}

function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .order("id", { ascending: false });

        if (error) throw error;
        if (data) {
          setProducts(data);
          setFilteredProducts(data.filter((p) => !p.is_affiliate));
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const handleCategoryFilter = (category: string) => {
    setActiveCategory(category);
    if (category === "All") {
      setFilteredProducts(products.filter((p) => !p.is_affiliate));
    } else if (category === "Partner Offers") {
      setFilteredProducts(products.filter((p) => p.is_affiliate));
    } else {
      const filtered = products.filter(
        (p) => p.category.toLowerCase() === category.toLowerCase() && !p.is_affiliate
      );
      setFilteredProducts(filtered);
    }
  };

  const fixedCategories = ["All", "Keyboard", "Mouse", "Peripherals", "USB Hub", "CCTV Systems"];

  return (
    <SiteLayout>
      {/* Purana standard screen height grid layer context reset matching your layout */}
      <div className="relative min-h-screen bg-navy text-navy-foreground overflow-hidden pt-36 pb-24">
        
        {/* White Sub-Bar line - Positioned slightly higher using top-[64px] framework layout */}
        <div className="w-full bg-white py-1 px-4 border-b border-black/5 shadow-sm flex justify-center items-center absolute top-[64px] left-0 z-20">
          <div className="max-w-7xl w-full flex justify-end px-4 sm:px-6 lg:px-8">
            {/* Custom Interactive Button: White background, Bold Black Text, half mm padded margins */}
            <button
              onClick={() => handleCategoryFilter("Partner Offers")}
              className={`inline-flex items-center gap-1.5 font-bold uppercase tracking-wider transition-all duration-300 shadow-md cursor-pointer rounded-xl border border-black/10 text-xs bg-white text-black hover:bg-black/5
                ${activeCategory === "Partner Offers" ? "scale-105 ring-2 ring-navy-deep/20" : ""}
              `}
              style={{ padding: "10px 18px" }} // Added extra 0.5mm (2px) on all 4 directions for size expansion
            >
              <Sparkles className="h-3.5 w-3.5 text-black" />
              Partner Offers
            </button>
          </div>
        </div>

        {/* Glowing animated background blobs from hero identity */}
        <div className="absolute top-0 left-1/4 h-[500px] w-[500px] rounded-full bg-primary-glow/10 blur-3xl animate-blob" aria-hidden />
        <div className="absolute top-1/3 right-1/4 h-[450px] w-[450px] rounded-full bg-accent/10 blur-3xl animate-blob [animation-delay:-4s]" aria-hidden />
        <div className="absolute inset-0 bg-dot opacity-[0.06]" aria-hidden />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-navy-deep/40 to-background" aria-hidden />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10">
          
          {/* Header Identity */}
          <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-dark text-xs font-medium mb-4 border border-white/5">
              <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
              Direct Inventory Hub — Vadodara
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
              Hardware & Tech <span className="text-gradient">Peripherals</span>
            </h1>
            <p className="text-navy-foreground/75 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              Premium quality business components, verified configurations, and instant logistics integration backed by official service support.
            </p>
          </div>

          {/* Standard Categories Layout Line */}
          <div className="flex flex-wrap justify-center items-center gap-3 mb-16 border-b border-white/10 pb-8 max-w-4xl mx-auto">
            {fixedCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryFilter(cat)}
                className={`px-6 py-2.5 rounded-xl font-semibold text-xs uppercase tracking-wider transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-white text-navy shadow-elegant hover:scale-105"
                    : "glass-dark text-navy-foreground/80 hover:bg-white/10 border border-white/5"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Loader State */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-24 gap-4">
              <Loader2 className="h-10 w-10 text-accent animate-spin" />
              <p className="text-navy-foreground/60 text-xs tracking-widest uppercase">Syncing Cloud Server Catalog...</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center glass-dark max-w-md mx-auto p-12 rounded-2xl border border-white/5 shadow-card-soft">
              <Layers className="h-10 w-10 text-accent/60 mx-auto mb-4 animate-pulse" />
              <h3 className="text-lg font-bold">Category Currently Empty</h3>
              <p className="text-navy-foreground/60 text-sm mt-2">Stock updates for this category are pending from the dashboard.</p>
            </div>
          ) : (
            /* Premium Core Card Grid */
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {filteredProducts.map((item) => {
                const whatsappLink = `https://wa.me/917984679052?text=Hello%20Shaikh.IT%20Solutions,%20I%20want%20to%20order%20the%20product%20"${encodeURIComponent(
                  item.name
                )}"%20listed%20at%20%E2%82%B9${item.retail_price}.%20Please%20confirm%20availability.`;

                return (
                  <div
                    key={item.id}
                    className="group flex flex-col justify-between rounded-2xl border border-white/10 glass shadow-card-soft hover:shadow-elegant hover:-translate-y-1.5 transition-all duration-300 overflow-hidden"
                  >
                    <div>
                      {/* Premium Frame for Visual Content */}
                      <div className="aspect-[4/3] bg-navy-deep/50 relative overflow-hidden flex items-center justify-center p-6 border-b border-white/5 transition-colors group-hover:bg-navy-deep/20">
                        <div className="absolute inset-0 bg-dot opacity-[0.04]" />
                        <img
                          src={item.image_url}
                          alt={item.name}
                          className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                        />
                        <span className="absolute top-4 left-4 text-[9px] font-bold tracking-widest uppercase px-3 py-1 rounded-full glass-dark text-white border border-white/10 shadow-sm">
                          {item.is_affiliate ? "Partner Offer" : item.category}
                        </span>
                        
                        {item.is_affiliate && item.coupon_code && (
                          <span className="absolute top-4 right-4 text-[9px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full bg-accent/20 text-accent border border-accent/30 shadow-sm animate-pulse">
                            Use Code: {item.coupon_code}
                          </span>
                        )}
                      </div>

                      {/* Content Info Panel */}
                      <div className="p-6">
                        <div className="flex justify-between items-start gap-3">
                          <h3 className="text-lg font-bold text-white tracking-wide group-hover:text-accent transition-colors leading-tight line-clamp-2">
                            {item.name}
                          </h3>
                          <div className="text-xl font-bold text-gradient font-display whitespace-nowrap bg-white/5 px-3 py-0.5 rounded-lg border border-white/10 shadow-inner">
                            ₹{item.retail_price}
                          </div>
                        </div>
                        <p className="text-navy-foreground/70 text-sm leading-relaxed mt-4 border-t border-white/5 pt-4">
                          {item.description || "Premium operational accessory optimized for standard business applications with replacement support assurance."}
                        </p>
                      </div>
                    </div>

                    {/* Conditional Action Button Interface */}
                    <div className="p-6 pt-0">
                      {item.is_affiliate ? (
                        <div className="flex flex-col gap-2 w-full">
                          {item.amazon_link && (
                            <a
                              href={item.amazon_link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-full py-2.5 rounded-xl bg-[#FF9900] text-black font-bold flex items-center justify-center gap-1.5 transition-all hover:opacity-90 text-xs uppercase tracking-wider shadow-sm"
                            >
                              <Link2 className="h-3.5 w-3.5" /> Buy on Amazon
                            </a>
                          )}
                          {item.flipkart_link && (
                            <a
                              href={item.flipkart_link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-full py-2.5 rounded-xl bg-[#2874F0] text-white font-bold flex items-center justify-center gap-1.5 transition-all hover:opacity-90 text-xs uppercase tracking-wider shadow-sm"
                            >
                              <Link2 className="h-3.5 w-3.5" /> Buy on Flipkart
                            </a>
                          )}
                          {item.shopsy_link && (
                            <a
                              href={item.shopsy_link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-full py-2.5 rounded-xl bg-[#E0144C] text-white font-bold flex items-center justify-center gap-1.5 transition-all hover:opacity-90 text-xs uppercase tracking-wider shadow-sm"
                            >
                              <Link2 className="h-3.5 w-3.5" /> Buy on Shopsy
                            </a>
                          )}
                        </div>
                      ) : (
                        <a
                          href={whatsappLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group inline-flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-primary-gradient text-navy-foreground font-semibold shadow-card-soft hover:shadow-glow hover:scale-[1.02] transition-all duration-200 text-xs uppercase tracking-wider"
                        >
                          <MessageCircle className="h-4 w-4" />
                          Order via WhatsApp
                          <ShoppingBag className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-200" />
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

        </div>
      </div>
    </SiteLayout>
  );
}


