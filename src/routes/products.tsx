import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ShoppingBag, MessageCircle, Layers, Loader2, Link2, Sparkles, X, Heart, Share2, ShoppingCart, Trash2, CheckCircle } from "lucide-react";
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
  
  // States for Pop-ups, Cart, and Favorites Panels
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<Product[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]); 
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isFavOpen, setIsFavOpen] = useState(false);

  // Dynamic Toast Notification Message State
  const [toastMessage, setToastMessage] = useState<string | null>(null);

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

  // Custom Toast Trigger Function
  const showNotification = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Cart Functions
  const addToCart = (product: Product) => {
    setCart((prev) => {
      if (prev.some((item) => item.id === product.id)) {
        showNotification("Item is already in your cart!");
        return prev;
      }
      showNotification(`🛒 "${product.name}" added to cart successfully!`);
      return [...prev, product];
    });
  };

  const removeFromCart = (id: number) => {
    const item = cart.find((i) => i.id === id);
    if (item) showNotification(`Removed "${item.name}" from cart.`);
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const handleCartOrder = () => {
    if (cart.length === 0) return;
    let itemList = cart.map((item, index) => `${index + 1}. ${item.name} - ₹${item.retail_price}`).join("\n");
    let total = cart.reduce((sum, item) => sum + item.retail_price, 0);
    
    const message = encodeURIComponent(
      `Hello Shaikh.IT Solutions, I want to order the following items from your inventory:\n\n${itemList}\n\n*Total Amount: ₹${total}*\n\n[If applicable, type your Coupon Code here]: `
    );
    window.open(`https://wa.me/917984679052?text=${message}`, "_blank");
  };

  // Toggle Favorites
  const toggleFavorite = (id: number) => {
    const product = products.find((p) => p.id === id);
    setFavorites((prev) => {
      if (prev.includes(id)) {
        if (product) showNotification(`💔 Removed "${product.name}" from wishlist.`);
        return prev.filter((favId) => favId !== id);
      } else {
        if (product) showNotification(`💖 Added "${product.name}" to your favorites list!`);
        return [...prev, id];
      }
    });
  };

  const favoriteProducts = products.filter((p) => favorites.includes(p.id));

  // Web Share API
  const handleShare = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Check out ${product.name} at ₹${product.retail_price} on Shaikh.IT Solutions!`,
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(`${window.location.origin}/products?id=${product.id}`);
      showNotification("🔗 Product link copied to clipboard!");
    }
  };

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
      <div className="relative min-h-screen bg-navy text-navy-foreground overflow-hidden pt-36 pb-24">
        
        {/* White Sub-Bar line */}
        <div className="w-full bg-white py-1 px-4 border-b border-black/5 shadow-sm flex justify-between items-center absolute top-[64px] left-0 z-20">
          
          {/* Action Control Triggers Panel */}
          <div className="flex gap-2">
            <button 
              onClick={() => { setIsCartOpen(true); setIsFavOpen(false); }}
              className="flex items-center gap-2 px-4 py-2 bg-navy text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all hover:bg-navy/95 relative cursor-pointer"
            >
              <ShoppingCart className="h-4 w-4" />
              My Cart ({cart.length})
            </button>

            <button 
              onClick={() => { setIsFavOpen(true); setIsCartOpen(false); }}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all hover:bg-red-700 relative cursor-pointer"
            >
              <Heart className="h-4 w-4 fill-current" />
              Wishlist ({favorites.length})
            </button>
          </div>

          <div className="flex justify-end px-4 sm:px-6 lg:px-8">
            <button
              onClick={() => handleCategoryFilter("Partner Offers")}
              className={`inline-flex items-center gap-1.5 font-bold uppercase tracking-wider transition-all duration-300 shadow-md cursor-pointer rounded-xl border border-black/10 text-xs bg-white text-black hover:bg-black/5
                ${activeCategory === "Partner Offers" ? "scale-105 ring-2 ring-navy-deep/20" : ""}
              `}
              style={{ padding: "10px 18px" }}
            >
              <Sparkles className="h-3.5 w-3.5 text-black" />
              Partner Offers
            </button>
          </div>
        </div>

        {/* Glowing background blobs */}
        <div className="absolute top-0 left-1/4 h-[500px] w-[500px] rounded-full bg-primary-glow/10 blur-3xl animate-blob" aria-hidden />
        <div className="absolute top-1/3 right-1/4 h-[450px] w-[450px] rounded-full bg-accent/10 blur-3xl animate-blob [animation-delay:-4s]" aria-hidden />
        <div className="absolute inset-0 bg-dot opacity-[0.06]" aria-hidden />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-navy-deep/40 to-background" aria-hidden />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10">
          
          {/* Header Identity */}
          <div className="text-center max-w-3xl mx-auto mb-12 animate-fade-in-up">
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

          {/* ⚡ NEW: PROMOTIONAL MAIN PAGE BANNER (Products page par display ke liye) ⚡ */}
          <div className="max-w-4xl mx-auto mb-10 p-5 rounded-2xl border border-accent/20 bg-[#0f1b35]/70 backdrop-blur-md text-left flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-accent font-bold text-xs uppercase tracking-wider">
                <Sparkles className="h-4 w-4 text-accent animate-pulse" /> Dynamic Bulk Discount Active
              </div>
              <p className="text-base font-bold text-white">
                "Shop 2+ items now & get a customized special offer coupon code for your next order!"
              </p>
              <p className="text-xs text-navy-foreground/70 leading-relaxed">
                <span className="font-semibold text-white">How to apply:</span> Simply select your items, trigger your WhatsApp cart checkout order, and add your coupon code inside the WhatsApp text box window!
              </p>
            </div>
            <button 
              onClick={() => { setIsCartOpen(true); setIsFavOpen(false); }}
              className="px-5 py-2.5 bg-primary-gradient text-navy-foreground text-xs font-black uppercase tracking-wider rounded-xl hover:shadow-glow shrink-0 transition-all cursor-pointer"
            >
              Open Active Cart
            </button>
          </div>

          {/* Categories Layout */}
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
            /* Card Grid */
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {filteredProducts.map((item) => {
                const isFavorite = favorites.includes(item.id);

                return (
                  <div
                    key={item.id}
                    className="group flex flex-col justify-between rounded-2xl border border-white/10 glass shadow-card-soft hover:shadow-elegant hover:-translate-y-1.5 transition-all duration-300 overflow-hidden relative"
                  >
                    {/* Floating Controls */}
                    <div className="absolute top-4 right-4 z-20 flex gap-2">
                      <button 
                        onClick={(e) => { e.stopPropagation(); toggleFavorite(item.id); }}
                        className={`p-2 rounded-xl backdrop-blur-md transition-all ${isFavorite ? "bg-red-500 text-white" : "bg-black/40 text-white/80 hover:bg-black/60"}`}
                      >
                        <Heart className="h-4 w-4 fill-current opacity-90" />
                      </button>
                      <button 
                        onClick={(e) => handleShare(item, e)}
                        className="p-2 rounded-xl bg-black/40 text-white/80 backdrop-blur-md hover:bg-black/60 transition-all"
                      >
                        <Share2 className="h-4 w-4" />
                      </button>
                    </div>

                    {/* Card Body Click */}
                    <div className="cursor-pointer" onClick={() => setSelectedProduct(item)}>
                      <div className="aspect-[4/3] bg-navy-deep/50 relative overflow-hidden flex items-center justify-center p-6 border-b border-white/5">
                        <div className="absolute inset-0 bg-dot opacity-[0.04]" />
                        <img src={item.image_url} alt={item.name} className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105" />
                        <span className="absolute top-4 left-4 text-[9px] font-bold tracking-widest uppercase px-3 py-1 rounded-full glass-dark text-white border border-white/10">
                          {item.category}
                        </span>
                      </div>

                      <div className="p-6">
                        <div className="flex justify-between items-start gap-3">
                          <h3 className="text-lg font-bold text-white tracking-wide group-hover:text-accent transition-colors leading-tight line-clamp-2">
                            {item.name}
                          </h3>
                          <div className="text-xl font-bold text-gradient font-display whitespace-nowrap bg-white/5 px-3 py-0.5 rounded-lg border border-white/10">
                            ₹{item.retail_price}
                          </div>
                        </div>
                        <p className="text-navy-foreground/77 text-sm mt-4 border-t border-white/5 pt-4 line-clamp-2">
                          {item.description || "Premium hardware optimization components."}
                        </p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="p-6 pt-0 flex gap-2">
                      <button
                        onClick={() => addToCart(item)}
                        className="flex-1 py-3 rounded-xl bg-white/10 border border-white/10 text-white font-bold text-xs uppercase tracking-wider hover:bg-white/20 transition-all"
                      >
                        Add to Cart
                      </button>
                      <a
                        href={`https://wa.me/917984679052?text=Hello%20Shaikh.IT%20Solutions,%20I%20want%20to%20order%20the%20product%20"${encodeURIComponent(item.name)}".`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center p-3 rounded-xl bg-primary-gradient text-navy-foreground font-semibold hover:shadow-glow transition-all"
                      >
                        <MessageCircle className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

        </div>
      </div>

      {/* 🌟 DETAILS DIALOG OVERLAY MODAL 🌟 */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md bg-black/70 animate-fade-in">
          <div className="relative bg-[#0b1329] text-white w-full max-w-3xl rounded-3xl border border-white/10 shadow-2xl p-6 overflow-y-auto max-h-[90vh] grid md:grid-cols-2 gap-6">
            <button onClick={() => setSelectedProduct(null)} className="absolute top-4 right-4 p-2 rounded-full border border-white/10 bg-navy hover:bg-white/10 text-white transition-colors z-10">
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center justify-center p-2 bg-white rounded-2xl w-full h-auto overflow-hidden">
              <img src={selectedProduct.image_url} alt={selectedProduct.name} className="w-full h-auto max-h-[75vh] object-contain rounded-xl" />
            </div>

            <div className="flex flex-col justify-between text-left pt-2">
              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="inline-block px-3 py-1 text-[9px] font-bold rounded-full bg-white/5 border border-white/10 uppercase tracking-widest text-accent">
                    {selectedProduct.category}
                  </span>
                  <button 
                    onClick={() => toggleFavorite(selectedProduct.id)}
                    className={`p-2 rounded-xl transition-all border ${favorites.includes(selectedProduct.id) ? "bg-red-500 text-white border-red-600" : "bg-white/5 border-white/10 text-white"}`}
                  >
                    <Heart className="h-4 w-4 fill-current" />
                  </button>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold mb-3 text-white">{selectedProduct.name}</h2>
                <div className="text-2xl font-black text-gradient font-display mb-6">₹{selectedProduct.retail_price}</div>

                <div className="space-y-3 mb-6">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-navy-foreground/60">Product Description:</h4>
                  <p className="text-sm text-navy-foreground/80 leading-relaxed bg-white/5 p-4 rounded-xl border border-white/5 max-h-[220px] overflow-y-auto">
                    {selectedProduct.description || "Premium operational gear accessory details loading."}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-white/5 flex gap-2">
                <button onClick={() => { addToCart(selectedProduct); setSelectedProduct(null); }} className="flex-1 py-3.5 rounded-xl bg-white/10 border border-white/10 text-white font-bold text-xs uppercase tracking-wider hover:bg-white/20 transition-all">
                  Add to Cart
                </button>
                <a href={`https://wa.me/917984679052?text=Hello%20Shaikh.IT%20Solutions,%20I%20am%20interested%20in%20"${encodeURIComponent(selectedProduct.name)}".`} target="_blank" rel="noopener noreferrer" className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-primary-gradient text-navy-foreground font-bold text-xs uppercase tracking-wider hover:shadow-glow transition-all">
                  <MessageCircle className="h-4 w-4" /> Order Now
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 🌟 WHATSAPP BULK CART PANEL WITH DYNAMIC PROMO BANNER 🌟 */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md h-full bg-[#0b1329] border-l border-white/10 p-6 flex flex-col justify-between text-white shadow-2xl">
            <div>
              <div className="flex justify-between items-center pb-4 border-b border-white/10 mb-4">
                <h3 className="text-lg font-bold flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5 text-accent" /> Your Bulk Cart ({cart.length})
                </h3>
                <button onClick={() => setIsCartOpen(false)} className="p-2 text-white/70 hover:text-white transition-colors cursor-pointer">
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* ⚡ PROMOTIONAL AD BANNER WITH WHATSAPP INSTRUCTIONS ⚡ */}
              <div className="mb-6 p-4 rounded-xl bg-accent/10 border border-accent/20 text-left space-y-2">
                <p className="text-xs font-bold text-accent tracking-wide uppercase">
                  🎁 Special Offer Available
                </p>
                <p className="text-sm font-semibold text-white leading-snug">
                  "Shop 2+ items now & get a customized special offer coupon code for your next order!"
                </p>
                <div className="text-[11px] text-navy-foreground/70 bg-black/30 p-2.5 rounded-lg border border-white/5 mt-2">
                  <span className="font-bold text-white block mb-0.5">How to claim:</span>
                  Select your items below, tap the button to order, and simply add your received coupon code in the WhatsApp chat window!
                </div>
              </div>

              {cart.length === 0 ? (
                <div className="text-center py-16 text-navy-foreground/50 text-sm">Your cart is empty.</div>
              ) : (
                <div className="space-y-4 max-h-[42vh] overflow-y-auto pr-1">
                  {cart.map((item) => (
                    <div key={item.id} className="flex gap-3 p-3 bg-white/5 border border-white/5 rounded-xl justify-between items-center">
                      <img src={item.image_url} alt={item.name} className="h-12 w-12 rounded-lg bg-white object-contain p-1 shrink-0" />
                      <div className="flex-1 min-w-0 text-left">
                        <h4 className="text-xs font-bold text-white truncate">{item.name}</h4>
                        <span className="text-xs text-accent font-bold">₹{item.retail_price}</span>
                      </div>
                      <button onClick={() => removeFromCart(item.id)} className="text-red-400 hover:text-red-500 p-2 shrink-0">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Total Section and Order Checkout Trigger */}
            {cart.length > 0 && (
              <div className="pt-4 border-t border-white/10 space-y-4">
                <div className="flex justify-between items-center font-bold text-sm">
                  <span>Subtotal Amount:</span>
                  <span className="text-accent text-lg">₹{cart.reduce((s, i) => s + i.retail_price, 0)}</span>
                </div>
                <button 
                  onClick={() => {
                    let itemList = cart.map((item, index) => `${index + 1}. ${item.name} - ₹${item.retail_price}`).join("\n");
                    let total = cart.reduce((sum, item) => sum + item.retail_price, 0);
                    const message = encodeURIComponent(
                      `Hello Shaikh.IT Solutions, I want to order the following multiple items from your inventory:\n\n${itemList}\n\n*Total Amount: ₹${total}*\n\n[If applicable, type your Coupon Code here]: `
                    );
                    window.open(`https://wa.me/917984679052?text=${message}`, "_blank");
                  }} 
                  className="w-full py-3.5 bg-primary-gradient text-navy-foreground font-black text-xs uppercase tracking-widest rounded-xl hover:shadow-glow transition-all flex items-center justify-center gap-2"
                >
                  <MessageCircle className="h-4.5 w-4.5" /> Send Order List via WhatsApp
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 🌟 FAVORITES WISHLIST SLIDEOUT PANEL (❤️) 🌟 */}
      {isFavOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md h-full bg-[#0b1329] border-l border-white/10 p-6 flex flex-col justify-between text-white shadow-2xl">
            <div>
              <div className="flex justify-between items-center pb-4 border-b border-white/10 mb-6">
                <h3 className="text-lg font-bold flex items-center gap-2 text-red-400">
                  <Heart className="h-5 w-5 fill-current" /> My Wishlist ({favorites.length})
                </h3>
                <button onClick={() => setIsFavOpen(false)} className="p-2 text-white/70 hover:text-white transition-colors">
                  <X className="h-5 w-5" />
                </button>
              </div>

              {favoriteProducts.length === 0 ? (
                <div className="text-center py-20 text-navy-foreground/50 text-sm">
                  No items in wishlist yet. Click ❤️ on products to save!
                </div>
              ) : (
                <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
                  {favoriteProducts.map((item) => (
                    <div key={item.id} className="flex gap-3 p-3 bg-white/5 border border-white/5 rounded-xl justify-between items-center">
                      <img src={item.image_url} alt={item.name} className="h-12 w-12 rounded-lg bg-white object-contain p-1 shrink-0" />
                      <div className="flex-1 min-w-0 text-left">
                        <h4 className="text-xs font-bold text-white truncate">{item.name}</h4>
                        <span className="text-xs text-accent font-bold">₹{item.retail_price}</span>
                      </div>
                      
                      <div className="flex gap-1 shrink-0">
                        <button 
                          onClick={() => { addToCart(item); toggleFavorite(item.id); }}
                          className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-all text-xs font-semibold"
                        >
                          + Cart
                        </button>
                        <button onClick={() => toggleFavorite(item.id)} className="text-red-400 hover:text-red-500 p-2">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-white/10">
              <p className="text-[11px] text-navy-foreground/60 text-center italic">
                Tracked items monitor real-time database updates.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 🌟 DYNAMIC TOAST ALERT POPUP BUBBLE (Bottom Left Location) 🌟 */}
      {toastMessage && (
        <div className="fixed bottom-6 left-6 z-50 bg-[#16223f] border border-white/10 text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-2.5 animate-slide-in-up backdrop-blur-md">
          <CheckCircle className="h-4.5 w-4.5 text-accent shrink-0" />
          <span className="text-xs font-semibold tracking-wide">{toastMessage}</span>
        </div>
      )}

    </SiteLayout>
  );
}