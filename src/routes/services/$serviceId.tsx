import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, CheckCircle2, Phone, MessageSquare, ShieldCheck, Wrench } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { services } from "@/lib/site-data";

export const Route = createFileRoute("/services/$serviceId")({
  component: ServiceDetailPage,
});

function ServiceDetailPage() {
  const { serviceId } = Route.useParams();

  // Smart matching with id, title or slug fallback
  const service = services.find(
    (s: any) => 
      (s.id && s.id === serviceId) || 
      (s.title && s.title.toLowerCase().replace(/[^a-z0-0]/g, "-").includes(serviceId.toLowerCase()))
  ) || services[0];

  return (
    <SiteLayout>
      {/* HERO SECTION FOR INDIVIDUAL SERVICE */}
      <section className="bg-navy-deep text-white py-16 lg:py-24 relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <Link 
            to="/services" 
            className="inline-flex items-center gap-2 text-sm text-accent hover:underline mb-8 font-medium"
          >
            <ArrowLeft className="h-4 w-4" /> Back to All Services
          </Link>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="px-3 py-1 rounded-full bg-white/10 text-accent text-xs font-semibold tracking-wider uppercase mb-4 inline-block border border-white/15">
                Shaikh.IT Official Service
              </span>
              <h1 className="text-3xl sm:text-5xl font-bold font-display text-white mb-6 leading-tight">
                {service?.title || "Professional IT Service"}
              </h1>
              <p className="text-lg text-white/80 leading-relaxed mb-8">
                {service?.desc || "Professional on-site and remote IT solutions tailored for your home and business across Vadodara."}
              </p>

              <div className="flex flex-wrap gap-4">
                <a
                  href="https://wa.me/919909204090"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-500 text-white font-semibold hover:bg-emerald-600 transition-transform active:scale-95 shadow-lg"
                >
                  <MessageSquare className="h-5 w-5" /> WhatsApp Booking
                </a>
                <a
                  href="tel:+919909204090"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 text-white font-semibold hover:bg-white/20 border border-white/20 transition-transform active:scale-95"
                >
                  <Phone className="h-5 w-5 text-accent" /> Call Technician
                </a>
              </div>
            </div>

            <div className="rounded-3xl overflow-hidden border border-white/15 shadow-2xl aspect-[4/3] bg-navy/50 relative">
              <img 
                src={(service as any)?.image || "/favicon.png"} 
                alt={service?.title || "Service"} 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* SERVICE SCOPE & ADVANTAGES */}
      <section className="py-20 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            
            <div className="md:col-span-2 space-y-8">
              <div className="p-8 rounded-3xl bg-card border border-border shadow-card-soft">
                <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                  <Wrench className="h-6 w-6 text-primary" /> What's Included in This Service
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    "Complete Hardware & Software Inspection",
                    "Genuine Parts & Original Drivers Setup",
                    "On-Site Service at Your Home/Office",
                    "Post-Installation Testing & Benchmark",
                    "100% Data Protection & Confidentiality",
                    "Transparent Pricing with Service Warranty"
                  ].map((point, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-border/60">
                      <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="text-sm font-medium text-foreground">{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-8 rounded-3xl bg-card border border-border shadow-card-soft">
                <h3 className="text-xl font-bold text-foreground mb-4">Why Choose Shaikh.IT Solutions?</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  We don't just fix issues temporarily; we deliver reliable, long-term tech infrastructure. Whether you need urgent troubleshooting, CCTV setup, or bulk enterprise networking, Shahid bhai and our certified team handle everything with precision.
                </p>
                <div className="flex gap-6 border-t border-border pt-6">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    <ShieldCheck className="h-4 w-4 text-primary" /> Service Warranty
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="p-6 rounded-3xl bg-card border border-border shadow-card-soft sticky top-28">
                <h3 className="text-lg font-bold text-foreground mb-2">Need Quick Assistance?</h3>
                <p className="text-xs text-muted-foreground mb-6">Book this service directly via phone or WhatsApp for immediate technician dispatch.</p>
                
                <div className="space-y-3">
                  <a 
                    href="https://wa.me/919909204090" 
                    target="_blank" 
                    rel="noreferrer"
                    className="w-full py-3 px-4 rounded-xl bg-emerald-500 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-md hover:bg-emerald-600 transition-colors"
                  >
                    <MessageSquare className="h-4 w-4" /> Chat on WhatsApp
                  </a>
                  <a 
                    href="tel:+919909204090" 
                    className="w-full py-3 px-4 rounded-xl bg-primary-gradient text-navy-foreground font-semibold text-sm flex items-center justify-center gap-2 shadow-md hover:scale-[1.02] transition-transform"
                  >
                    <Phone className="h-4 w-4" /> Call Now: +91 99092 04090
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
