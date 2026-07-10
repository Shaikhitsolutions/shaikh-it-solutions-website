import { createFileRoute, Link } from "@tanstack/react-router";
import { Target, Eye, Heart, Users, Award, Clock, ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import aboutImage from "@/assets/image/about.png";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Shaikh.IT Solutions" },
      { name: "description", content: "Learn about Shaikh.IT Solutions — a trusted IT services company helping small businesses with technology since day one." },
      { property: "og:title", content: "About — Shaikh.IT Solutions" },
      { property: "og:description", content: "Trusted IT services company built on quality and care." },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

const values = [
  { icon: Target, title: "Our Mission", desc: "To empower local businesses with reliable, affordable technology solutions that drive real growth." },
  { icon: Eye, title: "Our Vision", desc: "To become the most trusted IT partner for small businesses in the region." },
  { icon: Heart, title: "Our Values", desc: "Honesty, quality workmanship and genuine care for every customer we serve." },
];

const team = [
  { name: "Skilled Technicians", role: "Hands-on IT engineers", icon: Users },
  { name: "Customer First", role: "Honest advice, friendly service", icon: Award },
  { name: "Always Reachable", role: "Quick response on call & WhatsApp", icon: Clock },
];

function AboutPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="About Us"
        title="Built on trust, powered by expertise"
        subtitle="Shaikh.IT Solutions is a Vadodara-based IT startup helping homes, shops and small businesses across Gujarat with reliable technology service."
      />

      <section className="py-20 lg:py-24 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-14 items-center">
          <div className="space-y-5 text-muted-foreground leading-relaxed">
            <div className="text-xs font-semibold uppercase tracking-widest text-accent">Our Story</div>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">A young IT startup with a simple promise</h2>
            <p>
              Shaikh.IT Solutions was founded and is operated by <strong className="text-foreground">Shahid Shaikh</strong>. Based in Vadodara, Gujarat, we provide professional IT services for homes, shops, offices, and small businesses across India.
            </p>
            <p>
              Our goal is to deliver honest advice, reliable service, affordable pricing, and excellent customer support — whether it's a slow home laptop, a new shop network, a CCTV setup or a small business website.
            </p>
            <p>
              Our services include computer & laptop repair, Windows installation, networking & router setup, CCTV installation, website development and ongoing IT support.
            </p>

          </div>

          <div className="relative">
  <img
    src={aboutImage}
    alt="Shaikh.IT Solutions"
    className="w-full rounded-3xl shadow-2xl object-cover"
  />
</div>
              </div>
      </section>

      <section className="py-20 bg-secondary/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-3">
            {values.map((v) => (
              <div key={v.title} className="p-8 rounded-2xl bg-background shadow-card-soft border border-border">
                <div className="grid h-14 w-14 place-items-center rounded-xl bg-primary-gradient text-navy-foreground mb-5">
                  <v.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">{v.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-12">Why businesses choose us</h2>
          <div className="grid gap-6 md:grid-cols-3 max-w-4xl mx-auto">
            {team.map((t) => (
              <div key={t.name} className="p-8 rounded-2xl border border-border">
                <div className="grid h-16 w-16 mx-auto place-items-center rounded-full bg-primary-gradient text-navy-foreground mb-4">
                  <t.icon className="h-7 w-7" />
                </div>
                <div className="font-bold text-lg">{t.name}</div>
                <div className="text-sm text-muted-foreground">{t.role}</div>
              </div>
            ))}
          </div>
          <Link to="/contact" className="inline-flex items-center gap-2 mt-12 px-7 py-3.5 rounded-xl bg-primary-gradient text-navy-foreground font-semibold shadow-elegant hover:scale-105 transition-transform">
            Work with us <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}

export function PageHero({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle: string }) {
  return (
    <section className="relative bg-hero-gradient text-navy-foreground overflow-hidden">
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: "radial-gradient(circle at 20% 30%, oklch(0.55 0.18 256) 0%, transparent 40%), radial-gradient(circle at 80% 70%, oklch(0.45 0.15 256) 0%, transparent 40%)",
      }} />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-28 text-center animate-fade-in-up">
        <div className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">{eyebrow}</div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-5 max-w-3xl mx-auto leading-tight">{title}</h1>
        <p className="text-lg text-navy-foreground/80 max-w-2xl mx-auto">{subtitle}</p>
      </div>
    </section>
  );
}
