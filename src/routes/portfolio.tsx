import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Clock, Wallet, MessageCircle, Headphones, Smile, BadgeCheck } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { portfolio } from "@/lib/site-data";
import { PageHero } from "./about";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Portfolio — Shaikh.IT Solutions" },
      { name: "description", content: "See our recent projects — websites, networking deployments, CCTV installations and IT solutions delivered for local businesses." },
      { property: "og:title", content: "Portfolio — Shaikh.IT Solutions" },
      { property: "og:description", content: "Recent IT projects delivered for local businesses." },
      { property: "og:url", content: "/portfolio" },
    ],
    links: [{ rel: "canonical", href: "/portfolio" }],
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

function PortfolioPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Our Work"
        title="Projects that speak for themselves"
        subtitle="A look at some of the businesses we've helped grow with smart technology solutions."
      />

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

