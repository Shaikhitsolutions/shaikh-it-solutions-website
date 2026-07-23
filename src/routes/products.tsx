import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  MessageCircle,
  Layers,
  Loader2,
  Sparkles,
  X,
  Heart,
  Share2,
  ShoppingCart,
  Trash2,
  CheckCircle,
  MessageSquare,
  Pencil,
  ShieldAlert,
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
  reviews?: Review[];
}

// Device ID Generator (To identify individual customer)
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
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  // User & Admin Identity
  const deviceId = getDeviceId();
  const [isAdmin, setIsAdmin] = useState(false);

  // Modals & Panels
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [productReviews, setProductReviews] = useState<Review[]>([]);
  const [cart, setCart] = useState<Product[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isFavOpen, setIsFavOpen] = useState(false);

  // Review Input & Editing States
  const [editingReviewId, setEditingReviewId] = useState<string | null>(null);
  const [reviewName, setReviewName] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState("");

  // Toast State
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts();
    const adminToken = localStorage.getItem("shaikh_it_admin");
    if (adminToken === "true") setIsAdmin(true);
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
        setFilteredProducts(data.filter((p) => !p.is_affiliate));
      }
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  }

  // Fetch Reviews Fix
  async function fetchReviews(productId: number) {
    try {
      const { data, error } = await supabase
        .from("reviews")
        .select("*")
        .eq("product_id", productId)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching reviews:", error);
      } else if (data) {
        setProductReviews(data);
      }
    } catch (err) {
      console.error("Error in fetchReviews:", err);
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
      showNotification("🔗 Link copied to clipboard!");
    }
  };

 // Add or Update Review in Supabase
  const handleSaveReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct || !reviewName || !reviewComment) return;

    if (editingReviewId) {
      // Update Existing Review
      const { error } = await supabase
        .from("reviews")
        .update({
          user_name: reviewName,
          rating: reviewRating,
          comment: reviewComment,
        })
        .eq("id", editingReviewId);

      if (error) {
        alert("Error updating: " + error.message);
      } else {
        showNotification("✏️ Review updated successfully!");
        setEditingReviewId(null);
      }
    } else {
      // Add New Review
      const newReview = {
        product_id: Number(selectedProduct.id),
        user_name: reviewName,
        rating: Number(reviewRating),
        comment: reviewComment,
        user_device_id: deviceId,
      };

      const { data, error } = await supabase
        .from("reviews")
        .insert([newReview])
        .select();

      if (error) {
        console.error("Supabase Error:", error);
        alert("Supabase Error: " + error.message);
      } else if (data) {
        showNotification("⭐ Review published!");
        // Instantly update local state so it shows on screen immediately!
        setProductReviews((prev) => [data[0], ...prev]);
      }
    }

    setReviewName("");
    setReviewComment("");
    fetchReviews(selectedProduct.id);
  };

  // Delete Review Handler (Allowed for Author or Admin)
  const handleDeleteReview = async (reviewId: string) => {
    if (!confirm("Are you sure you want to delete this review?")) return;

    const { error } = await supabase.from("reviews").delete().eq("id", reviewId);
    if (!error && selectedProduct) {
      showNotification("🗑️ Review deleted.");
      fetchReviews(selectedProduct.id);
    } else {
      console.error("Delete Review Error:", error);
    }
  };

  // Start Edit Mode for User's own review
  const handleStartEdit = (rev: Review) => {
    setEditingReviewId(rev.id);
    setReviewName(rev.user_name);
    setReviewRating(rev.rating);
    setReviewComment(rev.comment);
  };

  return (
    <SiteLayout>
      <div className="relative min-h-screen bg-navy text-navy-foreground overflow-hidden pt-36 pb-24 font-sans">
        
        {/* Top Control Bar */}
        <div className="w-full bg-white py-1 px-4 border-b border-black/5 shadow-sm flex justify-between items-center absolute top-[64px] left-0 z-20">
          <div className="flex gap-2">
            <button
              onClick={() => { setIsCartOpen(true); setIsFavOpen(false); }}
              className="flex items-center gap-2 px-4 py-2 bg-navy text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-navy/95 transition cursor-pointer"
            >
              <ShoppingCart className="h-4 w-4" />
              My Cart ({cart.length})
            </button>

            <button
              onClick={() => { setIsFavOpen(true); setIsCartOpen(false); }}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-red-700 transition cursor-pointer"
            >
              <Heart className="h-4 w-4 fill-current" />
              Wishlist ({favorites.length})
            </button>
          </div>

          <button
            onClick={() => {
              setIsAdmin(!isAdmin);
              localStorage.setItem("shaikh_it_admin", (!isAdmin).toString());
              showNotification(isAdmin ? "Admin Mode Off" : "👑 Admin Mode Active!");
            }}
            className={`text-[10px] font-bold px-3 py-1.5 rounded-lg border flex items-center gap-1 ${
              isAdmin ? "bg-amber-500 text-black border-amber-400" : "bg-slate-200 text-slate-700"
            }`}
          >
            <ShieldAlert size={12} /> {isAdmin ? "Admin ON" : "Admin OFF"}
          </button>
        </div>

        {/* Content Container */}
        <div className="relative mx-auto max-w-7xl px-3 sm:px-6 lg:px-8 z-10">
          <div className="text-center max-w-3xl mx-auto mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">
              Hardware & Tech <span className="text-gradient">Peripherals</span>
            </h1>
            <p className="text-navy-foreground/75 text-xs sm:text-sm max-w-xl mx-auto">
              Premium quality business components with direct service support.
            </p>
          </div>

          {/* Grid Layout */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-3">
              <Loader2 className="h-8 w-8 text-accent animate-spin" />
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {filteredProducts.map((item) => (
                <div
                  key={item.id}
                  className="group flex flex-col justify-between rounded-xl border border-white/10 glass shadow-md hover:border-accent/40 transition-all overflow-hidden relative cursor-pointer"
                  onClick={() => openProductDetails(item)}
                >
                  <div className="aspect-square bg-white flex items-center justify-center p-3 relative">
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="p-3">
                    <h3 className="text-xs font-semibold text-white line-clamp-2 h-8">
                      {item.name}
                    </h3>
                    <span className="text-sm font-extrabold text-accent block mt-1">
                      ₹{item.retail_price}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 🌟 PRODUCT DETAILS & REVIEWS MODAL 🌟 */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md bg-black/80 animate-fade-in">
          <div className="relative bg-[#0b1329] text-white w-full max-w-2xl rounded-2xl border border-white/10 shadow-2xl p-5 overflow-y-auto max-h-[90vh]">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-3 right-3 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Product Header */}
            <div className="grid md:grid-cols-2 gap-5">
              <div className="flex items-center justify-center p-3 bg-white rounded-xl h-48">
                <img
                  src={selectedProduct.image_url}
                  alt={selectedProduct.name}
                  className="max-h-full object-contain"
                />
              </div>

              <div className="flex flex-col justify-between text-left">
                <div>
                  <h2 className="text-base font-bold text-white mb-1">
                    {selectedProduct.name}
                  </h2>
                  <div className="text-xl font-extrabold text-accent mb-2">
                    ₹{selectedProduct.retail_price}
                  </div>
                  <p className="text-xs text-navy-foreground/80 leading-relaxed bg-white/5 p-3 rounded-xl max-h-24 overflow-y-auto">
                    {selectedProduct.description}
                  </p>
                </div>
              </div>
            </div>

            <hr className="my-5 border-white/10" />

            {/* REVIEWS & FEEDBACK SECTION */}
            <div className="text-left">
              <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-accent" />
                Customer Reviews ({productReviews.length})
              </h3>

              {/* Reviews List with Conditional Edit/Delete Actions */}
              <div className="space-y-2 max-h-40 overflow-y-auto mb-4 pr-1">
                {productReviews.length === 0 ? (
                  <p className="text-xs text-navy-foreground/50 italic">
                    No reviews yet. Be the first to review!
                  </p>
                ) : (
                  productReviews.map((rev) => {
                    const isMyReview = rev.user_device_id === deviceId;

                    return (
                      <div
                        key={rev.id}
                        className="bg-white/5 p-2.5 rounded-xl border border-white/5 text-xs flex justify-between items-start"
                      >
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold text-white">{rev.user_name}</span>
                            {isMyReview && (
                              <span className="text-[9px] bg-blue-500/20 text-blue-300 px-1.5 py-0.5 rounded font-bold">
                                You
                              </span>
                            )}
                            <span className="text-amber-400 font-bold">★ {rev.rating}/5</span>
                          </div>
                          <p className="text-navy-foreground/80">{rev.comment}</p>
                        </div>

                        {/* 🔒 AUTHOR & ADMIN CONTROL ACTIONS */}
                        {(isMyReview || isAdmin) && (
                          <div className="flex gap-2">
                            {isMyReview && (
                              <button
                                onClick={() => handleStartEdit(rev)}
                                className="text-blue-400 hover:text-blue-300 p-1"
                                title="Edit your review"
                              >
                                <Pencil size={13} />
                              </button>
                            )}
                            <button
                              onClick={() => handleDeleteReview(rev.id)}
                              className="text-red-400 hover:text-red-300 p-1"
                              title="Delete review"
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>

              {/* Add or Edit Review Form */}
              <form onSubmit={handleSaveReview} className="bg-white/5 p-3 rounded-xl border border-white/10 space-y-2">
                <div className="flex justify-between items-center">
                  <h4 className="text-[11px] font-bold text-white uppercase">
                    {editingReviewId ? "✏️ Edit Your Feedback" : "Leave A Review"}
                  </h4>
                  {editingReviewId && (
                    <button
                      type="button"
                      onClick={() => setEditingReviewId(null)}
                      className="text-[10px] text-red-400 hover:underline"
                    >
                      Cancel Edit
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    required
                    placeholder="Your Name"
                    value={reviewName}
                    onChange={(e) => setReviewName(e.target.value)}
                    className="bg-navy border border-white/10 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-accent"
                  />
                  <select
                    value={reviewRating}
                    onChange={(e) => setReviewRating(Number(e.target.value))}
                    className="bg-navy border border-white/10 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-accent"
                  >
                    <option value={5}>⭐⭐⭐⭐⭐ (5 Star)</option>
                    <option value={4}>⭐⭐⭐⭐ (4 Star)</option>
                    <option value={3}>⭐⭐⭐ (3 Star)</option>
                    <option value={2}>⭐⭐ (2 Star)</option>
                    <option value={1}>⭐ (1 Star)</option>
                  </select>
                </div>
                <textarea
                  required
                  rows={2}
                  placeholder="Write feedback about this product..."
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  className="w-full bg-navy border border-white/10 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-accent"
                ></textarea>
                <button
                  type="submit"
                  className="bg-accent hover:bg-accent/90 text-navy font-bold px-4 py-1.5 rounded-lg text-xs transition"
                >
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
                <button onClick={() => setIsCartOpen(false)} className="p-2 text-white/70 hover:text-white">
                  <X className="h-5 w-5" />
                </button>
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
                      <button onClick={() => removeFromCart(item.id)} className="text-red-400 hover:text-red-500 p-2">
                        <Trash2 className="h-4 w-4" />
                      </button>
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
                    const message = encodeURIComponent(
                      `Hello Shaikh.IT Solutions, I want to order:\n\n${itemList}\n\n*Total: ₹${total}*`
                    );
                    window.open(`https://wa.me/917984679052?text=${message}`, "_blank");
                  }}
                  className="w-full py-3 bg-primary-gradient text-navy-foreground font-black text-xs uppercase tracking-widest rounded-xl hover:shadow-glow transition-all flex items-center justify-center gap-2"
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
                <button onClick={() => setIsFavOpen(false)} className="p-2 text-white/70 hover:text-white">
                  <X className="h-5 w-5" />
                </button>
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
                        <button
                          onClick={() => { addToCart(item); toggleFavorite(item.id); }}
                          className="p-1.5 bg-white/10 rounded-lg text-xs font-semibold"
                        >
                          + Cart
                        </button>
                        <button onClick={() => toggleFavorite(item.id)} className="text-red-400 p-1.5">
                          <Trash2 className="h-4 w-4" />
                        </button>
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
