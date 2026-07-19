import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Clock, Wallet, MessageCircle, Headphones, Smile, BadgeCheck, Star, Plus, Pencil, Trash2, X, Upload, MessageSquarePlus, ChevronLeft, ChevronRight } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { portfolio } from "@/lib/site-data";
import { PageHero } from "./about";
import { useState } from "react";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Portfolio — Shaikh.IT Solutions" },
      { name: "description", content: "See our recent projects and customer feedback delivered for local businesses." },
    ],
  }),
  component: PortfolioPage,
});

const whyWorkWithUs = [
  { icon: Clock, title: "Fast Response Time", desc: "Quick callbacks and same-day service across Vadodara whenever possible." },
  { icon: Wallet, title: "Affordable Pricing", desc: "Transparent quotes in INR with no hidden charges." },
  { icon: MessageCircle, title: "Honest Advice", desc: "Repair when we can, replace only when we must." },
  { icon: Headphones, title: "On-Site & Remote Support", desc: "Visit your home or office, or fix issues remotely." },
  { icon: Smile, title: "Customer Satisfaction Focus", desc: "We're not done until you're happy with the result." },
  { icon: BadgeCheck, title: "Service Warranty", desc: "Every repair and installation comes with a service warranty." },
];

interface ReviewItem {
  id: string;
  name: string;
  role: string;
  rating: number;
  text: string;
  projectImages: string[]; // Dynamic multi-image stack array configuration
}

function PortfolioPage() {
  const [dynamicReviews, setDynamicReviews] = useState<ReviewItem[]>([
    {
      id: "1",
      name: "Shahid Shaikh",
      role: "owner",
      rating: 5,
      text: "best",
      projectImages: [
        "https://images.unsplash.com/photo-1557597774-9d273605dfa9?q=80&w=400&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=400&auto=format&fit=crop"
      ]
    }
  ]);

  // Clean Form Interface States
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [text, setText] = useState("");
  const [rating, setRating] = useState(5);
  const [projectImages, setProjectImages] = useState<string[]>([]);
  const [hoverRating, setHoverRating] = useState(0);
  
  const [editingId, setEditingId] = useState<string | null>(null);
  const [activeModalReview, setActiveModalReview] = useState<ReviewItem | null>(null);
  const [currentModalImgIdx, setCurrentModalImgIdx] = useState(0);

  const scrollToFeedbackForm = () => {
    const element = document.getElementById("feedback-form-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  // Multiple files local reader engine pipeline conversion
  const handleMultipleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const loadedImages: string[] = [];
      let readCount = 0;

      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        reader.onloadend = () => {
          loadedImages.push(reader.result as string);
          readCount++;
          if (readCount === files.length) {
            setProjectImages(loadedImages);
          }
        };
        reader.readAsDataURL(files[i]);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !text) return alert("Please fill Name and Feedback message!");

    if (editingId) {
      setDynamicReviews(dynamicReviews.map(review => 
        review.id === editingId ? { ...review, name, role: role || "Valued Customer", rating, text, projectImages } : review
      ));
      setEditingId(null);
    } else {
      const newReview: ReviewItem = {
        id: Date.now().toString(),
        name,
        role: role || "Valued Customer",
        rating,
        text,
        projectImages: projectImages.length > 0 ? projectImages : []
      };
      setDynamicReviews([...dynamicReviews, newReview]);
    }
    
    setName("");
    setRole("");
    setText("");
    setRating(5);
    setProjectImages([]);
  };

  const startEdit = (review: ReviewItem, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingId(review.id);
    setName(review.name);
    setRole(review.role);
    setText(review.text);
    setRating(review.rating);
    setProjectImages(review.projectImages);
    setTimeout(scrollToFeedbackForm, 100);
  };

  const deleteReview = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setDynamicReviews(dynamicReviews.filter(review => review.id !== id));
    if (editingId === id) setEditingId(null);
  };

  // Lightbox navigational controls
  const handlePrevImage = (e: React.MouseEvent, imgLength: number) => {
    e.stopPropagation();
    setCurrentModalImgIdx((prev) => (prev === 0 ? imgLength - 1 : prev - 1));
  };

  const handleNextImage = (e: React.MouseEvent, imgLength: number) => {
    e.stopPropagation();
    setCurrentModalImgIdx((prev) => (prev === imgLength - 1 ? 0 : prev + 1));
  };

  return (
    <SiteLayout>
      {/* HERO WRAPPER LAYER */}
      <div className="relative bg-navy-deep pb-8 text-center">
        <PageHero
          eyebrow="Our Work"
          title="Projects that speak for themselves"
          subtitle="A look at some of the businesses we've helped grow with smart technology solutions."
        />
        <div className="mt-[-2.5rem] mb-6 relative z-10 flex justify-center">
          <button 
            onClick={scrollToFeedbackForm}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 backdrop-blur border border-white/20 text-white font-medium hover:bg-white/20 hover:scale-105 active:scale-95 transition-all shadow-lg cursor-pointer font-sans"
          >
            <MessageSquarePlus className="h-4 w-4 text-accent" /> Give Feedback
          </button>
        </div>
      </div>

      {/* PORTFOLIO GRID */}
      <section className="py-20 lg:py-24 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {portfolio.map((p, i) => (
              <div key={p.title} className="group rounded-2xl overflow-hidden border border-border bg-card shadow-card-soft hover:shadow-elegant transition-all">
                <div className="aspect-[4/3] bg-primary-gradient relative overflow-hidden">
                  <div className="absolute inset-0 grid place-items-center text-navy-foreground/90 font-display text-8xl font-bold opacity-15">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/85 via-navy/30 to-transparent" />
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/20 backdrop-blur text-xs font-medium text-white">
                    {p.category}
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-xl font-bold font-display">{p.title}</h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY WORK WITH US */}
      <section className="py-20 bg-navy-deep text-navy-foreground">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 max-w-2xl mx-auto">
            <div className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">Why Work With Us</div>
            <h2 className="text-3xl sm:text-4xl font-bold">Reliable IT support you can trust</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {whyWorkWithUs.map((item) => (
              <div key={item.title} className="p-6 rounded-2xl bg-white/5 backdrop-blur border border-white/10">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-white/10 mb-4">
                  <item.icon className="h-5 w-5" />
                </div>
                <div className="font-semibold mb-1">{item.title}</div>
                <p className="text-sm text-navy-foreground/75 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS SECTION */}
      <section className="py-20 bg-background border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 max-w-2xl mx-auto">
            <div className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">Customer Voice</div>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Real-time Client Feedback</h2>
          </div>

          {/* Cards Display Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-16 items-start">
            {dynamicReviews.map((item) => (
              <div 
                key={item.id} 
                onClick={() => { setActiveModalReview(item); setCurrentModalImgIdx(0); }}
                className="rounded-2xl bg-card border border-border shadow-card-soft overflow-hidden hover:border-primary/40 hover:shadow-elegant transition-all group relative cursor-pointer flex flex-col justify-between"
              >
                <div>
                  {/* Renders ONLY the first image index pointer as Cover view */}
                  {item.projectImages && item.projectImages.length > 0 && (
                    <div className="aspect-[16/9] w-full bg-slate-100 overflow-hidden border-b border-border relative">
                      <img src={item.projectImages[0]} alt="Project Cover" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      {item.projectImages.length > 1 && (
                        <div className="absolute bottom-2 right-2 px-2 py-0.5 text-[10px] bg-slate-900/70 text-white rounded-md backdrop-blur-sm">
                          + {item.projectImages.length - 1} more photos
                        </div>
                      )}
                    </div>
                  )}

                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, idx) => (
                          <Star key={idx} className={`h-4 w-4 ${idx < item.rating ? 'fill-amber-400 text-amber-400' : 'text-muted/40'}`} />
                        ))}
                      </div>
                      
                      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity absolute top-4 right-4 bg-background/80 backdrop-blur p-1 rounded-xl border border-border z-10">
                        <button onClick={(e) => startEdit(item, e)} className="p-1.5 rounded-lg text-slate-500 hover:text-blue-500 hover:bg-blue-50 transition-colors">
                          <Pencil className="h-3.5 w-3.5" />
                        </button>
                        <button onClick={(e) => deleteReview(item.id, e)} className="p-1.5 rounded-lg text-slate-500 hover:text-red-500 hover:bg-red-50 transition-colors">
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground italic leading-relaxed mb-4">"{item.text}"</p>
                    
                    <div className="border-t border-border/60 pt-3">
                      <div className="font-semibold text-foreground text-sm">{item.name}</div>
                      <div className="text-xs text-muted-foreground uppercase tracking-wider">{item.role}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Form Layer */}
          <div id="feedback-form-section" className="max-w-xl mx-auto p-8 rounded-2xl border border-border bg-card shadow-card-soft scroll-mt-28">
            <h3 className="text-xl font-bold text-foreground mb-2 flex items-center gap-2">
              <Plus className="h-5 w-5 text-primary" /> {editingId ? "Modify Feedback Data" : "Share Your Experience"}
            </h3>
            <p className="text-xs text-muted-foreground mb-6">Select multiple snapshot files if needed. Only the first image prints as the thumbnail stack card.</p>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold mb-2 text-foreground uppercase tracking-wider">Select Rating *</label>
                <div className="flex gap-1.5 items-center mb-2">
                  {[1, 2, 3, 4, 5].map((starVal) => (
                    <button type="button" key={starVal} onClick={() => setRating(starVal)} onMouseEnter={() => setHoverRating(starVal)} onMouseLeave={() => setHoverRating(0)} className="focus:outline-none transition-transform active:scale-90">
                      <Star className={`h-7 w-7 transition-colors cursor-pointer ${starVal <= (hoverRating || rating) ? "fill-amber-400 text-amber-400" : "text-muted border-border"}`} />
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold mb-1 text-foreground uppercase tracking-wider">Your Name *</label>
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-2 text-sm rounded-xl border border-border bg-background focus:outline-none focus:border-primary" placeholder="e.g. Shahid Shaikh" required />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1 text-foreground uppercase tracking-wider">Designation / Role</label>
                  <input type="text" value={role} onChange={(e) => setRole(e.target.value)} className="w-full px-4 py-2 text-sm rounded-xl border border-border bg-background focus:outline-none focus:border-primary" placeholder="e.g. owner" />
                </div>
              </div>

              {/* Dynamic Multiple Image upload tag element configuration */}
              <div>
                <label className="block text-xs font-semibold mb-1 text-foreground uppercase tracking-wider">Upload Project Snapshots (You can select multiple files)</label>
                <div className="relative border border-dashed border-border rounded-xl p-4 bg-slate-50/50 flex flex-col items-center justify-center text-center hover:bg-slate-50 cursor-pointer">
                  <input 
                    type="file" 
                    accept="image/*" 
                    multiple 
                    onChange={handleMultipleFilesChange} 
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full" 
                  />
                  <Upload className="h-5 w-5 text-muted-foreground mb-1" />
                  <span className="text-xs text-muted-foreground">
                    {projectImages.length > 0 ? `${projectImages.length} images loaded successfully!` : "Choose files (Hold Ctrl key to select multiple images)"}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1 text-foreground uppercase tracking-wider">Feedback Message *</label>
                <textarea rows={3} value={text} onChange={(e) => setText(e.target.value)} className="w-full px-4 py-2 text-sm rounded-xl border border-border bg-background focus:outline-none focus:border-primary resize-none" placeholder="Type your experience here..." required />
              </div>
              
              <button type="submit" className="w-full py-3 bg-primary-gradient text-navy-foreground font-semibold rounded-xl text-sm transition-transform active:scale-95 shadow-elegant">
                {editingId ? "Update Data" : "Submit Live Feedback"}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* DYNAMIC LIGHTBOX MODAL WITH GALLERY SLIDER CONTROLS */}
      {activeModalReview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl max-h-[95vh] overflow-y-auto bg-card border border-border rounded-3xl p-6 sm:p-8 shadow-elegant text-foreground animate-in fade-in zoom-in-95 duration-200">
            <button onClick={() => setActiveModalReview(null)} className="absolute top-4 right-4 p-2 rounded-xl border border-border bg-background hover:bg-slate-50 text-muted-foreground transition-colors z-30">
              <X className="h-4 w-4" />
            </button>

            {/* Slider container mapping block */}
            {activeModalReview.projectImages && activeModalReview.projectImages.length > 0 && (
              <div className="w-full aspect-[16/9] rounded-2xl overflow-hidden bg-slate-900 mb-6 border border-border relative group/slider">
                <img 
                  src={activeModalReview.projectImages[currentModalImgIdx]} 
                  alt={`Project slide ${currentModalImgIdx + 1}`} 
                  className="w-full h-full object-contain" 
                />
                
                {/* Dynamic Image Counter Box */}
                <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md text-white text-xs font-medium">
                  {currentModalImgIdx + 1} / {activeModalReview.projectImages.length}
                </div>

                {/* Left/Right Nav Indicators (Triggered only if image counts exceed 1 block) */}
                {activeModalReview.projectImages.length > 1 && (
                  <>
                    <button 
                      onClick={(e) => handlePrevImage(e, activeModalReview.projectImages.length)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/50 text-white hover:bg-black/70 border border-white/15"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button 
                      onClick={(e) => handleNextImage(e, activeModalReview.projectImages.length)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/50 text-white hover:bg-black/70 border border-white/15"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </>
                )}
              </div>
            )}

            <div className="flex gap-1 mb-3">
              {[...Array(5)].map((_, idx) => (
                <Star key={idx} className={`h-5 w-5 ${idx < activeModalReview.rating ? 'fill-amber-400 text-amber-400' : 'text-muted/40'}`} />
              ))}
            </div>

            <p className="text-base sm:text-lg text-foreground italic leading-relaxed mb-6">"{activeModalReview.text}"</p>

            <div className="border-t border-border pt-4">
              <div className="font-bold text-base">{activeModalReview.name}</div>
              <div className="text-sm text-muted-foreground uppercase tracking-wider">{activeModalReview.role}</div>
            </div>
          </div>
        </div>
      )}

      {/* CTA SECTION */}
      <section className="py-20 bg-background text-center">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Want to be our next success story?</h2>
          <Link to="/contact" className="inline-flex items-center gap-2 mt-6 px-7 py-3.5 rounded-xl bg-primary-gradient text-navy-foreground font-semibold shadow-elegant hover:scale-105 transition-transform">
            Let's talk <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}

