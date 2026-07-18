import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, Eye } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { services } from "@/lib/site-data";
import { PageHero } from "./about";
import computerRepair from "@/assets/image/computer repair.png";
import windowsInstallation from "@/assets/image/Windows Installation.png";
import networking from "@/assets/image/Networking.png";
import cctvInstallation from "@/assets/image/CCTV Installation.png";
import websiteDevelopment from "@/assets/image/Website Development.png";
import itSupport from "@/assets/image/IT support.png";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Shaikh.IT Solutions" },
      { name: "description", content: "Computer repair, IT support, networking, CCTV, web development and more — complete IT services for businesses and homes." },
      { property: "og:title", content: "Services — Shaikh.IT Solutions" },
      { property: "og:description", content: "Complete IT services for businesses and homes." },
      { property: "og:url", content: "/services" },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
  component: ServicesPage,
});

const packages = [
  {
    name: "Home & Starter",
    price: "From",
    desc: "Perfect for home users and small shops",
    features: ["On-call computer & laptop repair", "Windows installation & setup", "Basic networking & WiFi", "Remote support on call"],
  },
  {
    name: "Business",
    price: "Most Popular",
    desc: "Comprehensive support for small businesses",
    features: ["Everything in Starter", "Monthly maintenance visits", "Router & network monitoring", "Priority response", "CCTV health checks"],
    highlighted: true,
  },
  {
    name: "Office & Custom",
    price: "Custom Quote",
    desc: "Tailored IT for offices and growing teams",
    features: ["Everything in Business", "Dedicated technician", "On-site emergency support", "Full network & CCTV setup", "Website & software solutions"],
  },
];

function ServicesPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Our Services"
        title="Complete IT solutions for every need"
        subtitle="From a single broken laptop to a full office network — we've got the expertise to handle it all."
      />

      <section className="py-20 lg:py-24 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => {
              // Creating custom clean path parameters tokens matching standard strings
              const serviceId = 
                s.title === "Computer & Laptop Repair" ? "computer-repair" :
                s.title === "Windows Installation" ? "windows-installation" :
                s.title === "Networking & Router Setup" ? "networking-setup" :
                s.title === "CCTV Installation" ? "cctv-installation" :
                s.title === "Website Development" ? "website-development" : "it-support";

             return (
                <Link
                  key={s.title}
                  to={"/services/" + serviceId}
                  className="group block rounded-2xl border border-border bg-card p-7 shadow-card-soft hover:shadow-elegant hover:-translate-y-1.5 transition-all duration-300 overflow-hidden text-left relative"
                >
                  <div className="relative overflow-hidden rounded-xl mb-5 aspect-[4/3] w-full bg-navy-deep/20">
                    <img
                      src={
                        s.title === "Computer & Laptop Repair"
                          ? computerRepair
                          : s.title === "Windows Installation"
                          ? windowsInstallation
                          : s.title === "Networking & Router Setup"
                          ? networking
                          : s.title === "CCTV Installation"
                          ? cctvInstallation
                          : s.title === "Website Development"
                          ? websiteDevelopment
                          : itSupport
                      }
                      alt={s.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    
                    {/* Modern Action Overlay Layer Indicator on Hover */}
                    <div className="absolute inset-0 bg-navy/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-300">
                      <span className="glass-dark text-xs text-white px-4 py-2 rounded-xl font-bold flex items-center gap-1.5 uppercase tracking-wider border border-white/10 shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                        <Eye className="h-3.5 w-3.5" /> View Scope & Book
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-xl font-bold group-hover:text-accent transition-colors">
                      {s.title}
                    </h3>
                    <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all" />
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {s.desc}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-secondary/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">Support Plans</div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">Flexible plans for every business</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {packages.map((p) => (
              <div
                key={p.name}
                className={`p-8 rounded-2xl border transition-all ${
                  p.highlighted
                    ? "bg-primary-gradient text-navy-foreground border-transparent shadow-elegant lg:scale-105"
                    : "bg-background border-border shadow-card-soft"
                }`}
              >
                <div className={`text-xs uppercase tracking-widest mb-2 ${p.highlighted ? "text-accent" : "text-accent"}`}>{p.price}</div>
                <h3 className="text-2xl font-bold mb-2">{p.name}</h3>
                <p className={`text-sm mb-6 ${p.highlighted ? "text-navy-foreground/80" : "text-muted-foreground"}`}>{p.desc}</p>
                <ul className="space-y-3 mb-8">
                  {p.features.map((f) => (
                    <li key={f} className="flex gap-2 text-sm">
                      <Check className={`h-5 w-5 shrink-0 ${p.highlighted ? "text-green-300" : "text-accent"}`} />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/contact"
                  className={`block text-center px-5 py-3 rounded-xl font-semibold transition-all ${
                    p.highlighted ? "bg-white text-navy hover:scale-105" : "bg-primary-gradient text-navy-foreground hover:shadow-glow"
                  }`}
                >
                  Get Started
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Not sure what you need?</h2>
          <p className="text-muted-foreground text-lg mb-8">Talk to our team — we'll recommend the right solution.</p>
          <Link to="/contact" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-primary-gradient text-navy-foreground font-semibold shadow-elegant hover:scale-105 transition-transform">
            Free consultation <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}