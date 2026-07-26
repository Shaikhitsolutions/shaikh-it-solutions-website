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

  // Reviews Admin States
  const [reviews, setReviews] = useState<Review[]>([]);

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
      const { data, error } = await supabase
        .from("reviews")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data) setReviews(data);
    } catch (err: any) {
      console.error("Error loading reviews:", err.message);
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
  };

  const startEditProduct = (item: Product) => {
    setIsEditing(true);
    setEditProductId(item.id);
    setProdName(item.name);
    setCategory(item.category);
    setWholesalePrice(item.wholesale_price ? item.wholesale_price.toString() : "0");
    setRetailPrice(item.retail_price ? item.retail_price.toString() : "0");
    setDescription(item.description || "");
    setExistingImageUrl(item.image_url);
    setImagePreview(item.image_url);
    setImageFile(null);

    setIsAffiliate(!!item.is_affiliate);
    setAmazonLink(item.amazon_link || "");

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
        alert("Kripya Product Image select karein!");
        setLoading(false);
        return;
      }

      const productPayload = {
        name: prodName,
        category: category,
        wholesale_price: wholesalePrice ? parseInt(wholesalePrice) : 0,
        retail_price: retailPrice ? parseInt(retailPrice) : 0,
        description: description,
        image_url: finalImageUrl,
        is_affiliate: isAffiliate,
        amazon_link: isAffiliate ? amazonLink : null,
      };

      if (isEditing && editProductId) {
        const { error: updateError } = await supabase
          .from("products")
          .update(productPayload)
          .eq("id", editProductId);

        if (updateError) throw updateError;
        alert(`✏️ Product successfully updated!`);
      } else {
        const { error: dbError } = await supabase
          .from("products")
          .insert([productPayload]);

        if (dbError) throw dbError;
        alert(`🎉 Product successfully added!`);
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
    if (!window.confirm(`Delete "${name}"?`)) return;

    try {
      const { error } = await supabase.from("products").delete().eq("id", id);
      if (error) throw error;

      alert("🗑️ Product deleted!");
      if (editProductId === id) resetFormState();
      fetchAdminProducts();
    } catch (err: any) {
      alert(`Delete error: ${err.message}`);
    }
  };

  const handleDeleteReview = async (id: string) => {
    if (!confirm("Delete this review?")) return;

    try {
      const { error } = await supabase.from("reviews").delete().eq("id", id);
      if (error) throw error;

      alert("🗑️ Review deleted!");
      fetchAdminReviews();
    } catch (err: any) {
      alert(`Delete error: ${err.message}`);
    }
  };

  const localProducts = existingProducts.filter((p) => !p.is_affiliate);
  const affiliateProducts = existingProducts.filter((p) => p.is_affiliate);

  return (
    <SiteLayout>
      <div className="relative min-h-screen bg-navy text-navy-foreground overflow-hidden py-24 font-sans">
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 z-10">
          
          <div className="text-center mb-10">
            <span className="text-xs font-semibold uppercase tracking-widest text-accent bg-accent/10 px-4 py-1.5 rounded-full border border-white/5">
              Secure Console
            </span>
            <h1 className="text-3xl font-bold text-white mt-3">
              Shaikh.IT Master Dashboard
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
            <div
              className={`lg:col-span-2 glass p-6 rounded-2xl border transition-all ${
                isEditing
                  ? "border-amber-400/80 bg-amber-500/5 shadow-lg"
                  : "border-white/10 bg-navy-deep/40"
              }`}
            >
              <div className="flex justify-between items-center mb-6 border-b border-white/5 pb-4">
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <PlusCircle className="h-5 w-5 text-accent" />
                  {isEditing ? "✏️ Mode: Editing Product" : "Register New Peripheral"}
                </h2>
                {isEditing && (
                  <button
                    onClick={resetFormState}
                    className="flex items-center gap-1 text-xs bg-red-500/20 text-red-400 px-3 py-1 rounded-lg hover:bg-red-500 hover:text-white transition-all cursor-pointer font-semibold"
                  >
                    <XCircle className="h-4 w-4" /> Cancel Edit
                  </button>
                )}
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-navy-foreground/70 mb-1">
                    Distribution Channel
                  </label>
                  <select
                    value={isAffiliate ? "affiliate" : "normal"}
                    onChange={(e) => setIsAffiliate(e.target.value === "affiliate")}
                    className="w-full glass-dark border border-white/10 rounded-xl px-3 py-2.5 text-white text-xs focus:outline-none"
                  >
                    <option value="normal">Normal Product (Local Stock)</option>
                    <option value="affiliate">
                      Partner Affiliate Product (Amazon, Flipkart, etc.)
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-navy-foreground/70 mb-1">
                    Product Title
                  </label>
                  <input
                    type="text"
                    required
                    value={prodName}
                    onChange={(e) => setProdName(e.target.value)}
                    placeholder="e.g. Zebronics 256GB Internal SSD"
                    className="w-full glass-dark border border-white/10 rounded-xl px-3.5 py-2.5 text-white text-xs focus:outline-none placeholder-white/20"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-navy-foreground/70 mb-1">
                      Category
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full glass-dark border border-white/10 rounded-xl px-3 py-2.5 text-white text-xs focus:outline-none"
                    >
                      <option>Keyboard</option>
                      <option>Mouse</option>
                      <option>Peripherals</option>
                      <option>USB Hub</option>
                      <option>CCTV Systems</option>
                      <option>Networking</option>
                      <option>Accessories</option>
                    </select>
                  </div>

                  {!isAffiliate && (
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-navy-foreground/70 mb-1">
                        Wholesale Cost (₹)
                      </label>
                      <input
                        type="text"
                        value={wholesalePrice}
                        onChange={(e) => handleWholesaleChange(e.target.value)}
                        placeholder="0"
                        className="w-full glass-dark border border-white/10 rounded-xl px-3.5 py-2.5 text-white text-xs focus:outline-none"
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-accent mb-1">
                      {isAffiliate ? "Offer / Deal Price (₹)" : "Retail Price (₹)"}
                    </label>
                    <input
                      type="text"
                      value={retailPrice}
                      onChange={(e) => setRetailPrice(e.target.value)}
                      placeholder="0"
                      className="w-full glass-dark border border-accent/30 text-accent font-bold rounded-xl px-3.5 py-2.5 text-xs focus:outline-none"
                    />
                  </div>
                </div>

                {isAffiliate && (
                  <div className="p-3.5 rounded-xl border border-amber-400/30 bg-amber-500/10 space-y-3">
                    <h3 className="text-xs font-bold uppercase text-amber-400 tracking-widest flex items-center gap-1.5">
                      <Link2 className="h-4 w-4" /> Amazon Direct Affiliate Link
                    </h3>

                    <div>
                      <label className="block text-[10px] font-bold text-navy-foreground/80 mb-1">
                        Amazon Product Link
                      </label>
                      <input
                        type="text"
                        required
                        value={amazonLink}
                        onChange={(e) => setAmazonLink(e.target.value)}
                        placeholder="Paste Amazon affiliate link"
                        className="w-full glass-dark border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-navy-foreground/70 mb-1">
                    Short Description
                  </label>
                  <textarea
                    rows={2}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Short specs..."
                    className="w-full glass-dark border border-white/10 rounded-xl px-3.5 py-2.5 text-white text-xs focus:outline-none placeholder-white/20"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md uppercase text-xs tracking-wider cursor-pointer ${
                    isEditing
                      ? "bg-amber-400 text-slate-900 hover:bg-amber-300"
                      : "bg-primary-gradient text-navy-foreground hover:shadow-glow"
                  }`}
                >
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : isEditing ? (
                    "Save Changes"
                  ) : (
                    "Deploy Product"
                  )}
                </button>
              </form>
            </div>

            <div className="glass p-6 rounded-2xl border border-white/10 bg-navy-deep/40 text-center flex flex-col justify-center items-center min-h-[200px]">
              <label className="cursor-pointer w-full h-full flex flex-col justify-center items-center">
                {imagePreview ? (
                  <div className="relative w-full h-44 rounded-xl overflow-hidden bg-white/10 border border-white/10 p-2">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-full object-contain"
                    />
                  </div>
                ) : (
                  <div className="py-4 space-y-2">
                    <UploadCloud className="h-10 w-10 text-accent mx-auto" />
                    <span className="text-xs text-white font-bold block uppercase tracking-wider">
                      Click To Select Image
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

          <div className="glass p-6 rounded-2xl border border-white/10 bg-navy-deep/40 shadow-xl mb-8">
            <h2 className="text-sm font-bold uppercase tracking-widest text-white mb-6 border-b border-white/5 pb-4 flex items-center gap-2">
              📦 Local Shop Stock ({localProducts.length})
            </h2>

            {fetchLoading ? (
              <div className="text-center py-6 text-xs"><Loader2 className="h-4 w-4 animate-spin text-accent inline" /> Loading...</div>
            ) : localProducts.length === 0 ? (
              <div className="text-xs text-white/40 italic">No local inventory logged.</div>
            ) : (
              <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
                {localProducts.map((item) => (
                  <div
                    key={item.id}
                    className={`flex items-center justify-between p-3 rounded-xl border bg-navy-deep/60 border-white/5 ${
                      editProductId === item.id ? "border-amber-400 bg-amber-500/10" : ""
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={item.image_url}
                        alt={item.name}
                        className="w-10 h-10 object-contain bg-white rounded-lg p-1"
                      />
                      <div>
                        <h4 className="text-xs font-bold text-white truncate max-w-[250px] sm:max-w-[350px]">{item.name}</h4>
                        <p className="text-[10px] text-navy-foreground/70">
                          {item.category} • Cost: ₹{item.wholesale_price} | Retail: ₹{item.retail_price}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button onClick={() => startEditProduct(item)} className="p-2 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500 hover:text-white cursor-pointer"><Edit2 size={13} /></button>
                      <button onClick={() => handleDeleteProduct(item.id, item.name)} className="p-2 rounded-lg bg-red-600/20 text-red-400 hover:bg-red-600 hover:text-white cursor-pointer"><Trash2 size={13} /></button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="glass p-6 rounded-2xl border border-amber-400/30 bg-amber-500/5 shadow-xl mb-12">
            <h2 className="text-sm font-bold uppercase tracking-widest text-amber-400 mb-6 border-b border-amber-400/20 pb-4 flex items-center gap-2">
              🏷️ Partner Affiliate Deals (Amazon) ({affiliateProducts.length})
            </h2>

            {fetchLoading ? (
              <div className="text-center py-6 text-xs"><Loader2 className="h-4 w-4 animate-spin text-amber-400 inline" /> Loading...</div>
            ) : affiliateProducts.length === 0 ? (
              <div className="text-xs text-amber-400/50 italic">No partner deals active.</div>
            ) : (
              <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
                {affiliateProducts.map((item) => (
                  <div
                    key={item.id}
                    className={`flex items-center justify-between p-3 rounded-xl border bg-slate-900/80 border-amber-400/30 ${
                      editProductId === item.id ? "border-amber-400 bg-amber-500/20" : ""
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={item.image_url}
                        alt={item.name}
                        className="w-10 h-10 object-contain bg-white rounded-lg p-1"
                      />
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h4 className="text-xs font-bold text-white truncate max-w-[220px] sm:max-w-[320px]">{item.name}</h4>
                          <span className="text-[8px] font-black text-amber-400 bg-amber-400/20 px-1.5 py-0.5 rounded border border-amber-400/30">AMAZON DEAL</span>
                        </div>
                        <p className="text-[10px] text-amber-400/70 truncate max-w-[250px]">
                          Price: ₹{item.retail_price || "0"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button onClick={() => startEditProduct(item)} className="p-2 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500 hover:text-white cursor-pointer"><Edit2 size={13} /></button>
                      <button onClick={() => handleDeleteProduct(item.id, item.name)} className="p-2 rounded-lg bg-red-600/20 text-red-400 hover:bg-red-600 hover:text-white cursor-pointer"><Trash2 size={13} /></button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="glass p-6 rounded-2xl border border-white/10 bg-navy-deep/40 shadow-xl">
            <div className="flex justify-between items-center mb-6 border-b border-white/5 pb-4">
              <h2 className="text-sm font-bold uppercase tracking-widest text-white">
                Customer Reviews ({reviews.length})
              </h2>
              <button onClick={fetchAdminReviews} className="flex items-center gap-1 bg-white/10 text-xs px-3 py-1.5 rounded-xl text-white cursor-pointer">
                <RefreshCw size={12} /> Refresh
              </button>
            </div>

            {reviews.map((rev) => (
              <div key={rev.id} className="flex items-center justify-between bg-navy-deep/60 p-3 rounded-xl border border-white/5 mb-2">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-white">{rev.user_name}</span>
                    <span className="text-amber-400 font-bold text-xs">★ {rev.rating}/5</span>
                  </div>
                  <p className="text-xs text-navy-foreground/80">{rev.comment}</p>
                </div>
                <button onClick={() => handleDeleteReview(rev.id)} className="p-2 text-red-400 hover:text-red-500 cursor-pointer">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>

        </div>
      </div>
    </SiteLayout>
  );
}
