import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  MessageCircle,
  Loader2,
  X,
  Heart,
  ShoppingCart,
  Trash2,
  CheckCircle,
  MessageSquare,
  Pencil,
  Sparkles,
  Tag,
  ExternalLink,
} from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { supabase } from "@/lib/supabaseClient";

export const Route = createFileRoute("/products")({
  component: Products,
});

interface Review {
  id: string;
  product_id: number;
  user_name: string;
  rating: number;
  comment: string;
  user_device_id: string;
  created_at?: string;
}

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
}

const getDeviceId = () => {
  let deviceId = localStorage.getItem("shaikh_it_device_id");
  if (!deviceId) {
    deviceId = "dev_" + Math.random().toString(36).substring(2, 11);
    localStorage.setItem("shaikh_it_device_id", deviceId);
  }
  return deviceId;
};

function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("ALL");

  const deviceId = getDeviceId();

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [productReviews, setProductReviews] = useState<Review[]>([]);
  const [cart, setCart] = useState<Product[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isFavOpen, setIsFavOpen] = useState(false);

  const [editingReviewId, setEditingReviewId] = useState<string | null>(null);
  const [reviewName, setReviewName] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState("");

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const categories = [
    "ALL",
    "KEYBOARD",
    "MOUSE",
    "PERIPHERALS",
    "USB HUB",
    "CCTV SYSTEMS",
  ];

  useEffect(() => {
    fetchProducts();
  }, []);

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
        setFilteredProducts(data);
      }
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  }

  const handleCategoryFilter = (cat: string) => {
    setSelectedCategory(cat);
    if (cat === "ALL") {
      setFilteredProducts(products);
    } else if (cat === "PARTNER OFFERS") {
      setFilteredProducts(products.filter((p) => p.is_affiliate));
    } else {
      setFilteredProducts(
        products.filter(
          (p) => p.category.toUpperCase() === cat && !p.is_affiliate
        )
      );
    }
  };

  async function fetchReviews(productId: number) {
    try {
      const { data, error } = await supabase
        .from("reviews")
        .select("*")
        .eq("product_id", productId)
        .order("created_at", { ascending: false });

      if (!error && data) {
        setProductReviews(data);
      }
    } catch (err) {
      console.error("Error fetching reviews:", err);
    }
  }

  const openProductDetails = (product: Product) => {
    setSelectedProduct(product);
    setEditingReviewId(null);
    setReviewName("");
    setReviewComment("");
    fetchReviews(product.id);
  };

  const showNotification = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const addToCart = (product: Product) => {
    setCart((prev) => {
      if (prev.some((item) => item.id === product.id)) {
        showNotification("Item is already in your cart!");
        return prev;
      }
      showNotification(`🛒 "${product.name}" added to cart!`);
      return [...prev, product];
    });
  };

  const removeFromCart = (id: number) => {
    const item = cart.find((i) => i.id === id);
    if (item) showNotification(`Removed "${item.name}" from cart.`);
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const toggleFavorite = (id: number) => {
    const product = products.find((p) => p.id === id);
    setFavorites((prev) => {
      if (prev.includes(id)) {
        if (product) showNotification(`💔 Removed from wishlist.`);
        return prev.filter((favId) => favId !== id);
      } else {
        if (product) showNotification(`💖 Added to favorites!`);
        return [...prev, id];
      }
    });
  };

  const favoriteProducts = products.filter((p) => favorites.includes(p.id));

  const handleSaveReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct || !reviewName || !reviewComment) return;

    if (editingReviewId) {
      const { error } = await supabase
        .from("reviews")
        .update({
          user_name: reviewName,
          rating: reviewRating,
          comment: reviewComment,
        })
        .eq("id", editingReviewId);

      if (!error) {
        showNotification("✏️ Review updated!");
        setEditingReviewId(null);
      }
    } else {
      const newReview = {
        product_id: selectedProduct.id,
        user_name: reviewName,
        rating: reviewRating,
        comment: reviewComment,
        user_device_id: deviceId,
      };

      const { data, error } = await supabase.from("reviews").insert([newReview]).select();
      if (!error && data) {
        showNotification("⭐ Review published!");
      }
    }

    setReviewName("");
    setReviewComment("");
    fetchReviews(selectedProduct.id);
  };

  const handleDeleteReview = async (reviewId: string) => {
    if (!confirm("Are you sure you want to delete your review?")) return;

    const { error } = await supabase.from("reviews").delete().eq("id", reviewId);
    if (!error && selectedProduct) {
      showNotification("🗑️ Review deleted.");
      fetchReviews(selectedProduct.id);
    }
  };

  const handleStartEdit = (rev: Review) => {
    setEditingReviewId(rev.id);
    setReviewName(rev.user_name);
    setReviewRating(rev.rating);
    setReviewComment(rev.comment);
  };

  return (
    <SiteLayout>
      <div className="relative min-h-screen bg-navy text-navy-foreground overflow-hidden pt-32 pb-24 font-sans">
        
        {/* Top Strip Navigation */}
        <div className="w-full bg-[#16223f]/80 backdrop-blur-md py-2 px-4 border-b border-white/10 shadow-md flex justify-between items-center absolute top-[64px] left-0 z-20">
          <div className="flex gap-2">
            <button
              onClick={() => { setIsCartOpen(true); setIsFavOpen(false); }}
              className="flex items-center gap-2 px-4 py-1.5 bg-navy text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-slate-800 transition cursor-pointer border border-white/10"
            >
              <ShoppingCart className="h-4 w-4 text-accent" />
              My Cart ({cart.length})
            </button>

            <button
              onClick={() => { setIsFavOpen(true); setIsCartOpen(false); }}
              className="flex items-center gap-2 px-4 py-1.5 bg-red-600/20 text-red-400 border border-red-500/30 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-red-600 hover:text-white transition cursor-pointer"
            >
              <Heart className="h-4 w-4 fill-current" />
              Wishlist ({favorites.length})
            </button>

            <button
              onClick={() => handleCategoryFilter("PARTNER OFFERS")}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition cursor-pointer border ${
                selectedCategory === "PARTNER OFFERS"
                  ? "bg-amber-400 text-slate-950 font-black border-amber-400 shadow-lg"
                  : "bg-amber-400/20 text-amber-400 border-amber-400/40 hover:bg-amber-400 hover:text-slate-950"
              }`}
            >
              <Tag className="h-4 w-4" />
              Partner Offers
            </button>
          </div>
        </div>

        {/* Content Container */}
        <div className="relative mx-auto max-w-7xl px-3 sm:px-6 lg:px-8 z-10">
          <div className="text-center max-w-3xl mx-auto mb-8 pt-6">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-3.5 py-1 rounded-full border border-emerald-500/20 mb-4">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Direct Inventory Hub — Vadodara
            </span>

            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-3 text-white">
              Hardware & Tech <br />
              <span className="text-accent">Peripherals</span>
            </h1>

            <p className="text-navy-foreground/75 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
              Premium quality business components, verified configurations, and instant logistics integration backed by official service support.
            </p>
          </div>

          <div className="max-w-4xl mx-auto mb-8 glass p-5 rounded-2xl border border-white/10 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-left">
              <span className="text-[10px] font-bold text-accent uppercase tracking-widest flex items-center gap-1">
                <Sparkles className="h-3 w-3" /> DYNAMIC BULK DISCOUNT ACTIVE
              </span>
              <h3 className="text-sm sm:text-base font-extrabold text-white">
                "Shop 2+ items now & get a customized special offer coupon code for your next order!"
              </h3>
              <p className="text-[11px] text-navy-foreground/70">
                <span className="font-bold text-navy-foreground">How to apply:</span> Simply select your items, trigger your WhatsApp cart checkout order, and add your coupon code inside the WhatsApp text box window!
              </p>
            </div>

            <button
              onClick={() => setIsCartOpen(true)}
              className="bg-primary-gradient text-navy-foreground font-extrabold text-xs px-5 py-2.5 rounded-xl uppercase tracking-wider transition shrink-0 cursor-pointer shadow-lg hover:shadow-glow"
            >
              OPEN ACTIVE CART
            </button>
          </div>

          {/* Category Filter Buttons */}
          <div className="flex items-center justify-center gap-2 overflow-x-auto pb-6 mb-6 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryFilter(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition cursor-pointer whitespace-nowrap border ${
                  selectedCategory === cat
                    ? "bg-white text-navy font-black border-white shadow-lg"
                    : "glass-dark text-navy-foreground/80 border-white/10 hover:border-white/30"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Product Grid */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-3">
              <Loader2 className="h-8 w-8 text-accent animate-spin" />
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {filteredProducts.map((item) => (
                <div
                  key={item.id}
                  className="group flex flex-col justify-between rounded-2xl border border-white/10 glass shadow-xl hover:border-accent/50 transition-all overflow-hidden relative cursor-pointer"
                  onClick={() => openProductDetails(item)}
                >
                  <div className="aspect-square bg-white flex items-center justify-center p-3 relative">
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                    />
                    {item.is_affiliate && (
                      <span className="absolute top-2 right-2 bg-amber-400 text-slate-950 text-[9px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider shadow">
                        Partner Deal
                      </span>
                    )}
                  </div>

                  <div className="p-3 glass-dark text-center">
                    <h3 className="text-[11px] font-extrabold text-white uppercase tracking-wide truncate">
                      {item.name}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Product Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md bg-black/80 animate-fade-in">
          <div className="relative bg-[#0b1329] text-white w-full max-w-lg rounded-2xl border border-white/10 shadow-2xl p-5 overflow-y-auto max-h-[90vh]">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-3 right-3 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer z-10"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-center p-3 bg-white rounded-xl h-48 w-full">
                <img
                  src={selectedProduct.image_url}
                  alt={selectedProduct.name}
                  className="max-h-full max-w-full object-contain"
                />
              </div>

              <div className="text-left">
                <h2 className="text-sm font-bold text-white mb-1">
                  {selectedProduct.name}
                </h2>

                {/* Price Display Fix for All Products */}
                {selectedProduct.retail_price > 0 && (
                  <div className="text-lg font-extrabold text-accent mb-2">
                    ₹{selectedProduct.retail_price}
                  </div>
                )}

                <p className="text-xs text-navy-foreground/80 leading-relaxed bg-white/5 p-3 rounded-xl max-h-24 overflow-y-auto mt-2">
                  {selectedProduct.description || "Verified hardware quality."}
                </p>

                <div className="flex gap-2 mt-4">
                  {selectedProduct.is_affiliate ? (
                    <a
                      href={selectedProduct.amazon_link || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black py-2.5 rounded-xl text-xs transition cursor-pointer text-center uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg"
                    >
                      <ExternalLink size={14} /> Buy Best Price on Amazon
                    </a>
                  ) : (
                    <button
                      onClick={() => addToCart(selectedProduct)}
                      className="flex-1 bg-primary-gradient text-navy-foreground font-bold py-2 rounded-xl text-xs transition cursor-pointer"
                    >
                      Add to Cart
                    </button>
                  )}
                  <button
                    onClick={() => toggleFavorite(selectedProduct.id)}
                    className="p-2 border border-white/10 rounded-xl hover:bg-white/10 cursor-pointer"
                  >
                    <Heart className={`h-4 w-4 ${favorites.includes(selectedProduct.id) ? "text-red-500 fill-current" : "text-white"}`} />
                  </button>
                </div>
              </div>
            </div>

            <hr className="my-4 border-white/10" />

            <div className="text-left">
              <h3 className="text-xs font-bold text-white mb-2 flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-accent" />
                Customer Reviews ({productReviews.length})
              </h3>

              <div className="space-y-2 max-h-32 overflow-y-auto mb-3 pr-1">
                {productReviews.length === 0 ? (
                  <p className="text-xs text-navy-foreground/50 italic">No reviews yet.</p>
                ) : (
                  productReviews.map((rev) => {
                    const isMyReview = rev.user_device_id === deviceId;
                    return (
                      <div key={rev.id} className="bg-white/5 p-2 rounded-xl border border-white/5 text-xs flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold text-white">{rev.user_name}</span>
                            <span className="text-amber-400 font-bold">★ {rev.rating}/5</span>
                          </div>
                          <p className="text-navy-foreground/80">{rev.comment}</p>
                        </div>
                        {isMyReview && (
                          <div className="flex gap-2">
                            <button onClick={() => handleStartEdit(rev)} className="text-blue-400 p-1 cursor-pointer"><Pencil size={12} /></button>
                            <button onClick={() => handleDeleteReview(rev.id)} className="text-red-400 p-1 cursor-pointer"><Trash2 size={12} /></button>
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>

              <form onSubmit={handleSaveReview} className="bg-white/5 p-3 rounded-xl border border-white/10 space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text" required placeholder="Your Name" value={reviewName}
                    onChange={(e) => setReviewName(e.target.value)}
                    className="bg-navy border border-white/10 rounded-lg p-1.5 text-xs text-white focus:outline-none"
                  />
                  <select
                    value={reviewRating} onChange={(e) => setReviewRating(Number(e.target.value))}
                    className="bg-navy border border-white/10 rounded-lg p-1.5 text-xs text-white focus:outline-none"
                  >
                    <option value={5}>⭐⭐⭐⭐⭐ (5 Star)</option>
                    <option value={4}>⭐⭐⭐⭐ (4 Star)</option>
                    <option value={3}>⭐⭐⭐ (3 Star)</option>
                    <option value={2}>⭐⭐ (2 Star)</option>
                    <option value={1}>⭐ (1 Star)</option>
                  </select>
                </div>
                <textarea
                  required rows={2} placeholder="Write feedback..." value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  className="w-full bg-navy border border-white/10 rounded-lg p-1.5 text-xs text-white focus:outline-none"
                ></textarea>
                <button type="submit" className="bg-primary-gradient text-navy-foreground font-bold px-3 py-1 rounded-lg text-xs transition cursor-pointer">
                  {editingReviewId ? "Update Review" : "Submit Review"}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md h-full bg-[#0b1329] border-l border-white/10 p-6 flex flex-col justify-between text-white shadow-2xl">
            <div>
              <div className="flex justify-between items-center pb-4 border-b border-white/10 mb-4">
                <h3 className="text-lg font-bold flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5 text-accent" /> Your Cart ({cart.length})
                </h3>
                <button onClick={() => setIsCartOpen(false)} className="p-2 text-white/70 hover:text-white cursor-pointer"><X className="h-5 w-5" /></button>
              </div>
              {cart.length === 0 ? (
                <div className="text-center py-16 text-navy-foreground/50 text-sm">Your cart is empty.</div>
              ) : (
                <div className="space-y-3 max-h-[50vh] overflow-y-auto pr-1">
                  {cart.map((item) => (
                    <div key={item.id} className="flex gap-3 p-3 bg-white/5 border border-white/5 rounded-xl justify-between items-center">
                      <img src={item.image_url} alt={item.name} className="h-10 w-10 rounded-lg bg-white object-contain p-1 shrink-0" />
                      <div className="flex-1 min-w-0 text-left">
                        <h4 className="text-xs font-bold text-white truncate">{item.name}</h4>
                        <span className="text-xs text-accent font-bold">₹{item.retail_price}</span>
                      </div>
                      <button onClick={() => removeFromCart(item.id)} className="text-red-400 hover:text-red-500 p-2 cursor-pointer"><Trash2 className="h-4 w-4" /></button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {cart.length > 0 && (
              <div className="pt-4 border-t border-white/10 space-y-3">
                <div className="flex justify-between items-center font-bold text-sm">
                  <span>Subtotal Amount:</span>
                  <span className="text-accent text-lg">₹{cart.reduce((s, i) => s + i.retail_price, 0)}</span>
                </div>
                <button
                  onClick={() => {
                    let itemList = cart.map((item, index) => `${index + 1}. ${item.name} - ₹${item.retail_price}`).join("\n");
                    let total = cart.reduce((sum, item) => sum + item.retail_price, 0);
                    const message = encodeURIComponent(`Hello Shaikh.IT Solutions, I want to order:\n\n${itemList}\n\n*Total: ₹${total}*`);
                    window.open(`https://wa.me/917984679052?text=${message}`, "_blank");
                  }}
                  className="w-full py-3 bg-primary-gradient text-navy-foreground font-black text-xs uppercase tracking-widest rounded-xl hover:shadow-glow transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageCircle className="h-4 w-4" /> Send Order via WhatsApp
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Wishlist Drawer */}
      {isFavOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md h-full bg-[#0b1329] border-l border-white/10 p-6 flex flex-col justify-between text-white shadow-2xl">
            <div>
              <div className="flex justify-between items-center pb-4 border-b border-white/10 mb-6">
                <h3 className="text-lg font-bold flex items-center gap-2 text-red-400">
                  <Heart className="h-5 w-5 fill-current" /> My Wishlist ({favorites.length})
                </h3>
                <button onClick={() => setIsFavOpen(false)} className="p-2 text-white/70 hover:text-white cursor-pointer"><X className="h-5 w-5" /></button>
              </div>
              {favoriteProducts.length === 0 ? (
                <div className="text-center py-20 text-navy-foreground/50 text-sm">Wishlist is empty.</div>
              ) : (
                <div className="space-y-3 max-h-[70vh] overflow-y-auto pr-1">
                  {favoriteProducts.map((item) => (
                    <div key={item.id} className="flex gap-3 p-3 bg-white/5 border border-white/5 rounded-xl justify-between items-center">
                      <img src={item.image_url} alt={item.name} className="h-10 w-10 rounded-lg bg-white object-contain p-1 shrink-0" />
                      <div className="flex-1 min-w-0 text-left">
                        <h4 className="text-xs font-bold text-white truncate">{item.name}</h4>
                        <span className="text-xs text-accent font-bold">₹{item.retail_price}</span>
                      </div>
                      <div className="flex gap-1">
                        <button onClick={() => { addToCart(item); toggleFavorite(item.id); }} className="p-1.5 bg-accent/20 text-accent rounded-lg text-xs font-semibold cursor-pointer">+ Cart</button>
                        <button onClick={() => toggleFavorite(item.id)} className="text-red-400 p-1.5 cursor-pointer"><Trash2 className="h-4 w-4" /></button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 left-6 z-50 bg-[#16223f] border border-white/10 text-white px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2 animate-slide-in-up">
          <CheckCircle className="h-4 w-4 text-accent shrink-0" />
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}
    </SiteLayout>
  );
}