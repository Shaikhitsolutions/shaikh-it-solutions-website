import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
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
    price: "From ₹499",
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
            {services.map((s) => (
              <div key={s.title} className="group p-7 rounded-2xl border border-border bg-card shadow-card-soft hover:shadow-elegant hover:-translate-y-1 transition-all duration-300">
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
  className="w-full h-52 object-cover rounded-xl mb-5"
/>
                <h3 className="text-xl font-bold mb-2">{s.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
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
