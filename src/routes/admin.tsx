import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  PlusCircle,
  UploadCloud,
  Trash2,
  Edit2,
  Loader2,
  XCircle,
  Link2,
  ShoppingBag,
  MessageSquare,
  RefreshCw,
} from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { supabase } from "@/lib/supabaseClient";

export const Route = createFileRoute("/admin")({
  component: AdminPage,
});

interface Product {
  id: number;
  name: string;
  category: string;
  wholesale_price: number;
  retail_price: number;
  description: string;
  image_url: string;
  is_affiliate?: boolean;
  amazon_link?: string;
  flipkart_link?: string;
  shopsy_link?: string;
  coupon_code?: string;
}

interface Review {
  id: string;
  product_id: number;
  user_name: string;
  rating: number;
  comment: string;
  created_at: string;
}

function AdminPage() {
  const [prodName, setProdName] = useState("");
  const [wholesalePrice, setWholesalePrice] = useState("");
  const [retailPrice, setRetailPrice] = useState("");
  const [category, setCategory] = useState("Keyboard");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [isEditing, setIsEditing] = useState(false);
  const [editProductId, setEditProductId] = useState<number | null>(null);
  const [existingImageUrl, setExistingImageUrl] = useState("");

  const [existingProducts, setExistingProducts] = useState<Product[]>([]);
  const [fetchLoading, setFetchLoading] = useState(true);

  // Affiliate States
  const [isAffiliate, setIsAffiliate] = useState(false);
  const [amazonLink, setAmazonLink] = useState("");
  const [flipkartLink, setFlipkartLink] = useState("");
  const [shopsyLink, setShopsyLink] = useState("");
  const [couponCode, setCouponCode] = useState("");

  // Reviews Admin States
  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewsLoading, setReviewsLoading] = useState(true);

  const fetchAdminProducts = async () => {
    try {
      setFetchLoading(true);
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("id", { ascending: false });

      if (error) throw error;
      if (data) setExistingProducts(data);
    } catch (err: any) {
      console.error("Error loading products:", err.message);
    } finally {
      setFetchLoading(false);
    }
  };

  const fetchAdminReviews = async () => {
    try {
      setReviewsLoading(true);
      const { data, error } = await supabase
        .from("reviews")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data) {
        setReviews(data);
      }
    } catch (err: any) {
      console.error("Error loading reviews:", err.message);
    } finally {
      setReviewsLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminProducts();
    fetchAdminReviews();
  }, []);

  const handleWholesaleChange = (val: string) => {
    setWholesalePrice(val);
    if (val && !isNaN(Number(val))) {
      const autoRetail = Math.round(Number(val) * 1.3);
      setRetailPrice(autoRetail.toString());
    } else {
      setRetailPrice("");
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const resetFormState = () => {
    setProdName("");
    setWholesalePrice("");
    setRetailPrice("");
    setDescription("");
    setImageFile(null);
    setImagePreview(null);
    setIsEditing(false);
    setEditProductId(null);
    setExistingImageUrl("");

    setIsAffiliate(false);
    setAmazonLink("");
    setFlipkartLink("");
    setShopsyLink("");
    setCouponCode("");
  };

  const startEditProduct = (item: Product) => {
    setIsEditing(true);
    setEditProductId(item.id);
    setProdName(item.name);
    setCategory(item.category);
    setWholesalePrice(item.wholesale_price.toString());
    setRetailPrice(item.retail_price.toString());
    setDescription(item.description || "");
    setExistingImageUrl(item.image_url);
    setImagePreview(item.image_url);
    setImageFile(null);

    setIsAffiliate(!!item.is_affiliate);
    setAmazonLink(item.amazon_link || "");
    setFlipkartLink(item.flipkart_link || "");
    setShopsyLink(item.shopsy_link || "");
    setCouponCode(item.coupon_code || "");

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      let finalImageUrl = existingImageUrl;

      if (imageFile) {
        const fileExt = imageFile.name.split(".").pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("product-images")
          .upload(filePath, imageFile);

        if (uploadError) throw uploadError;

        const { data: urlData } = supabase.storage
          .from("product-images")
          .getPublicUrl(filePath);

        finalImageUrl = urlData.publicUrl;
      } else if (!isEditing && !imageFile) {
        alert("Please upload product photos!");
        setLoading(false);
        return;
      }

      const productPayload = {
        name: prodName,
        category: category,
        wholesale_price: parseInt(wholesalePrice),
        retail_price: parseInt(retailPrice),
        description: description,
        image_url: finalImageUrl,
        is_affiliate: isAffiliate,
        amazon_link: isAffiliate ? amazonLink : null,
        flipkart_link: isAffiliate ? flipkartLink : null,
        shopsy_link: isAffiliate ? shopsyLink : null,
        coupon_code: isAffiliate ? couponCode : null,
      };

      if (isEditing && editProductId) {
        const { error: updateError } = await supabase
          .from("products")
          .update(productPayload)
          .eq("id", editProductId);

        if (updateError) throw updateError;
        alert(`✏️ Details successfully updated for "${prodName}"!`);
      } else {
        const { error: dbError } = await supabase
          .from("products")
          .insert([productPayload]);

        if (dbError) throw dbError;
        alert(`🎉 Congratulations! "${prodName}" successfully added to your inventory.`);
      }

      resetFormState();
      fetchAdminProducts();
    } catch (error: any) {
      alert(`Operation failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (id: number, name: string) => {
    const confirmDelete = window.confirm(
      `Kya aap sach me "${name}" ko website se delete karna chahte hain?`
    );
    if (!confirmDelete) return;

    try {
      const { error } = await supabase.from("products").delete().eq("id", id);

      if (error) throw error;

      alert("🗑️ Product website se hata diya gaya hai!");
      if (editProductId === id) resetFormState();
      fetchAdminProducts();
    } catch (err: any) {
      alert(`Delete error: ${err.message}`);
    }
  };

  // Delete Customer Review Function
  const handleDeleteReview = async (id: string) => {
    if (!confirm("Are you sure you want to delete this customer review?")) return;

    try {
      const { error } = await supabase.from("reviews").delete().eq("id", id);
      if (error) throw error;

      alert("🗑️ Review successfully deleted!");
      fetchAdminReviews();
    } catch (err: any) {
      alert(`Delete error: ${err.message}`);
    }
  };

  return (
    <SiteLayout>
      <div className="relative min-h-screen bg-navy text-navy-foreground overflow-hidden py-24 font-sans">
        <div className="absolute inset-0 bg-dot opacity-[0.05]" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 z-10">
          {/* Header */}
          <div className="text-center mb-12">
            <span className="text-xs font-semibold uppercase tracking-widest text-accent bg-accent/10 px-4 py-1.5 rounded-full border border-white/5">
              Secure Interface Console
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mt-4">
              Shaikh.IT Master Dashboard
            </h1>
            <p className="text-navy-foreground/70 mt-2 text-sm">
              Synchronize active storage units and update structural peripheral info.
            </p>
          </div>

          {/* Form and Image Wrapper */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
            <div
              className={`lg:col-span-2 glass p-6 rounded-2xl border transition-all duration-300 ${
                isEditing
                  ? "border-accent bg-navy-deep/60 shadow-glow"
                  : "border-white/10 bg-navy-deep/40"
              }`}
            >
              <div className="flex justify-between items-center mb-6 border-b border-white/5 pb-4">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <PlusCircle className="h-5 w-5 text-accent" />
                  {isEditing ? "Modify Core Properties" : "Register New Peripheral"}
                </h2>
                {isEditing && (
                  <button
                    onClick={resetFormState}
                    className="flex items-center gap-1 text-xs text-red-400 hover:text-red-300 font-semibold transition-colors"
                  >
                    <XCircle className="h-4 w-4" /> Cancel Session
                  </button>
                )}
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-navy-foreground/70 mb-1.5">
                    Distribution Channels
                  </label>
                  <select
                    value={isAffiliate ? "affiliate" : "normal"}
                    onChange={(e) => setIsAffiliate(e.target.value === "affiliate")}
                    className="w-full glass-dark border border-white/10 rounded-xl px-3 py-3 text-white focus:outline-none focus:border-white/20 text-sm"
                  >
                    <option value="normal">Normal Product (Local Stock)</option>
                    <option value="affiliate">
                      Partner Affiliate Product (Amazon, Flipkart, etc.)
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-navy-foreground/70 mb-1.5">
                    Product Name
                  </label>
                  <input
                    type="text"
                    required
                    value={prodName}
                    onChange={(e) => setProdName(e.target.value)}
                    placeholder="e.g., Quantron QKB11 USB Keyboard"
                    className="w-full glass-dark border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/20 placeholder-white/20 text-sm transition-all"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-navy-foreground/70 mb-1.5">
                      Category
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full glass-dark border border-white/10 rounded-xl px-3 py-3 text-white focus:outline-none focus:border-white/20 text-sm"
                    >
                      <option>Keyboard</option>
                      <option>Mouse</option>
                      <option>Peripherals</option>
                      <option>USB Hub</option>
                      <option>CCTV Systems</option>
                      <option>Powerbank</option>
                      <option>Speakers & Headphones</option>
                      <option>Cooling Pad</option>
                      <option>Charger</option>
                      <option>Networking</option>
                      <option>Accessories</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-navy-foreground/70 mb-1.5">
                      Wholesale Cost
                    </label>
                    <input
                      type="text"
                      required
                      value={wholesalePrice}
                      onChange={(e) => handleWholesaleChange(e.target.value)}
                      placeholder="175"
                      className="w-full glass-dark border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/20 placeholder-white/20 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-accent mb-1.5">
                      Retail Price (+30%)
                    </label>
                    <input
                      type="text"
                      required
                      value={retailPrice}
                      onChange={(e) => setRetailPrice(e.target.value)}
                      placeholder="228"
                      className="w-full glass-dark border border-accent/30 text-accent font-bold rounded-xl px-4 py-3 text-sm focus:outline-none"
                    />
                  </div>
                </div>

                {isAffiliate && (
                  <div className="p-4 rounded-xl border border-accent/20 bg-accent/5 space-y-4 animate-fadeIn">
                    <h3 className="text-xs font-bold uppercase text-accent tracking-widest flex items-center gap-1.5">
                      <Link2 className="h-4 w-4" /> Affiliate URL Router Configuration
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-bold text-navy-foreground/80 mb-1">
                          Amazon Link
                        </label>
                        <input
                          type="text"
                          value={amazonLink}
                          onChange={(e) => setAmazonLink(e.target.value)}
                          placeholder="https://amazon.in/dp/..."
                          className="w-full glass-dark border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-navy-foreground/80 mb-1">
                          Flipkart Link
                        </label>
                        <input
                          type="text"
                          value={flipkartLink}
                          onChange={(e) => setFlipkartLink(e.target.value)}
                          placeholder="https://flipkart.com/..."
                          className="w-full glass-dark border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-bold text-navy-foreground/80 mb-1">
                          Shopsy/Meesho Link
                        </label>
                        <input
                          type="text"
                          value={shopsyLink}
                          onChange={(e) => setShopsyLink(e.target.value)}
                          placeholder="https://shopsy.in/..."
                          className="w-full glass-dark border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-navy-foreground/80 mb-1">
                          Exclusive Coupon Code
                        </label>
                        <input
                          type="text"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value)}
                          placeholder="e.g. SHAIKHIT05"
                          className="w-full glass-dark border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-navy-foreground/70 mb-1.5">
                    Short Description
                  </label>
                  <textarea
                    rows={2}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Specification logs and warranty bounds..."
                    className="w-full glass-dark border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/20 placeholder-white/20 text-sm"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary-gradient text-navy-foreground font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all shadow-card-soft hover:shadow-glow disabled:opacity-40 uppercase text-xs tracking-wider cursor-pointer"
                >
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : isEditing ? (
                    "Commit Structural Updates"
                  ) : (
                    "Deploy Live Storage Node"
                  )}
                </button>
              </form>
            </div>

            {/* Photo Preview Upload Panel */}
            <div className="glass p-6 rounded-2xl border border-white/10 bg-navy-deep/40 text-center flex flex-col justify-center items-center min-h-[200px]">
              <label className="cursor-pointer w-full h-full flex flex-col justify-center items-center">
                {imagePreview ? (
                  <div className="relative w-full h-44 rounded-xl overflow-hidden bg-navy-deep/80 border border-white/5">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-full object-contain p-2"
                    />
                    <span className="absolute bottom-2 left-1/2 -translate-x-1/2 glass-dark text-[9px] font-bold text-white px-3 py-1 rounded-full border border-white/10 uppercase tracking-widest shadow-md">
                      Modify Asset
                    </span>
                  </div>
                ) : (
                  <div className="py-4">
                    <UploadCloud className="h-8 w-8 text-accent/60 mx-auto mb-2" />
                    <span className="text-xs text-white font-medium block uppercase tracking-wider">
                      Upload Asset
                    </span>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Active Cloud Catalog Management Grid */}
          <div className="glass p-6 rounded-2xl border border-white/10 bg-navy-deep/40 shadow-xl mb-12">
            <h2 className="text-sm font-bold uppercase tracking-widest text-white mb-6 border-b border-white/5 pb-4">
              📦 Registered Inventory Units ({existingProducts.length})
            </h2>

            {fetchLoading ? (
              <div className="text-center py-10 gap-2 flex items-center justify-center text-navy-foreground/50 text-xs uppercase tracking-wider">
                <Loader2 className="h-4 w-4 animate-spin text-accent" /> Reading Database
                Nodes...
              </div>
            ) : existingProducts.length === 0 ? (
              <div className="text-center py-8 text-navy-foreground/40 text-xs uppercase">
                No Active Logs Detected.
              </div>
            ) : (
              <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
                {existingProducts.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between bg-navy-deep/60 p-3 rounded-xl border border-white/5 hover:border-white/10 transition-all duration-200"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={item.image_url}
                        alt={item.name}
                        className="w-12 h-12 object-contain bg-navy/80 rounded-lg p-1.5 border border-white/5 shadow-inner"
                      />
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h4 className="text-sm font-bold text-white line-clamp-1">
                            {item.name}
                          </h4>
                          {item.is_affiliate && (
                            <span className="flex items-center text-[9px] font-bold text-accent bg-accent/10 px-1.5 py-0.5 rounded border border-accent/20 uppercase tracking-wider gap-0.5">
                              <ShoppingBag className="h-2.5 w-2.5" /> Partner
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-navy-foreground/70 font-medium tracking-wide mt-0.5">
                          {item.category} • Cost:{" "}
                          <span className="text-white/60">₹{item.wholesale_price}</span> •{" "}
                          <span className="text-accent font-semibold">
                            Retail: ₹{item.retail_price}
                          </span>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => startEditProduct(item)}
                        className="p-2.5 rounded-xl glass-dark text-accent hover:bg-white hover:text-navy transition-all duration-200 border border-white/5 cursor-pointer"
                        title="Edit Properties"
                      >
                        <Edit2 className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(item.id, item.name)}
                        className="p-2.5 rounded-xl bg-red-600/10 text-red-400 hover:bg-red-600 hover:text-white transition-all duration-200 border border-red-500/10 cursor-pointer"
                        title="Purge Node"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 🌟 REVIEWS & FEEDBACKS MODERATION PANEL 🌟 */}
          <div className="glass p-6 rounded-2xl border border-white/10 bg-navy-deep/40 shadow-xl">
            <div className="flex justify-between items-center mb-6 border-b border-white/5 pb-4">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-accent" />
                <h2 className="text-sm font-bold uppercase tracking-widest text-white">
                  Customer Feedbacks & Reviews ({reviews.length})
                </h2>
              </div>
              <button
                onClick={fetchAdminReviews}
                className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-xs px-3 py-1.5 rounded-xl border border-white/10 text-white transition cursor-pointer"
              >
                <RefreshCw size={13} /> Refresh List
              </button>
            </div>

            {reviewsLoading ? (
              <div className="text-center py-8 gap-2 flex items-center justify-center text-navy-foreground/50 text-xs uppercase tracking-wider">
                <Loader2 className="h-4 w-4 animate-spin text-accent" /> Reading Reviews
                Node...
              </div>
            ) : reviews.length === 0 ? (
              <div className="text-center py-8 text-navy-foreground/40 text-xs uppercase">
                No Customer Reviews Recorded.
              </div>
            ) : (
              <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
                {reviews.map((rev) => (
                  <div
                    key={rev.id}
                    className="flex items-center justify-between bg-navy-deep/60 p-3.5 rounded-xl border border-white/5 hover:border-white/10 transition-all duration-200"
                  >
                    <div className="flex-1 pr-4">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold text-white">{rev.user_name}</span>
                        <span className="text-[10px] font-mono text-accent bg-accent/10 px-1.5 py-0.5 rounded border border-accent/20">
                          Product ID #{rev.product_id}
                        </span>
                        <span className="text-amber-400 font-bold text-xs">
                          ★ {rev.rating}/5
                        </span>
                      </div>
                      <p className="text-xs text-navy-foreground/80 leading-relaxed">
                        {rev.comment}
                      </p>
                    </div>

                    <button
                      onClick={() => handleDeleteReview(rev.id)}
                      className="p-2.5 rounded-xl bg-red-600/10 text-red-400 hover:bg-red-600 hover:text-white transition-all duration-200 border border-red-500/10 cursor-pointer shrink-0"
                      title="Delete Customer Review"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}