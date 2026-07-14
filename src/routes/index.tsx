import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight, CheckCircle2, Phone, Sparkles,
  Search, ClipboardList, Rocket, LifeBuoy, ShieldCheck, Zap, Award,
  Clock, Wallet, MessageCircle, Headphones, Smile, BadgeCheck,
} from "lucide-react";
import heroBg from "@/assets/image/hero.png";

import logo from "@/assets/image/logo.png";
import computerRepair from "@/assets/image/computer repair.png";
import windowsInstallation from "@/assets/image/Windows Installation.png";
import networking from "@/assets/image/Networking.png";
import cctvInstallation from "@/assets/image/CCTV Installation.png";
import websiteDevelopment from "@/assets/image/Website Development.png";
import itSupport from "@/assets/image/IT support.png";
import mobileRepair from "@/assets/image/mobile repair.png";

import { SiteLayout } from "@/components/SiteLayout";
import { services, stats, features, portfolio } from "@/lib/site-data";
import {
  Accordion, AccordionItem, AccordionTrigger, AccordionContent,
} from "@/components/ui/accordion";



export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Shaikh.IT Solutions — IT Support, Repair & Web Development" },
      { name: "description", content: "Premium IT support, computer repair, networking, CCTV and modern website development for small businesses, shops and offices." },
      { property: "og:title", content: "Shaikh.IT Solutions" },
      { property: "og:description", content: "Premium IT services for businesses and homes." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: HomePage,
});

const process = [
  { icon: Search, step: "01", title: "Discover", desc: "We listen, audit your setup and understand exactly what your business needs." },
  { icon: ClipboardList, step: "02", title: "Plan", desc: "A clear, transparent proposal with timeline, scope and a fixed honest quote." },
  { icon: Rocket, step: "03", title: "Deliver", desc: "Our skilled technicians deliver reliable solutions — on time and within budget." },
  { icon: LifeBuoy, step: "04", title: "Support", desc: "Ongoing maintenance, monitoring and quick-response help whenever you need." },
];

const faqs = [
  { q: "How fast can you respond to an emergency?", a: "Most emergencies are handled within 1–2 hours. For business clients on a support plan, we guarantee priority response and on-site help the same day." },
  { q: "Do you offer warranty on repairs and installations?", a: "Yes. Every repair comes with a written warranty, and all installations (networking, CCTV, servers) include service support to give you full peace of mind." },
  { q: "Can you build a website for my business?", a: "Absolutely. We design and develop modern, mobile-responsive, SEO-friendly websites and e-commerce stores — from simple landing pages to complex custom portals." },
  { q: "Do you provide on-site or remote support?", a: "Both. We handle remote support via secure tools for quick fixes, and we travel on-site for hardware, networking and installation work." },
  { q: "How is your pricing structured?", a: "Transparent and upfront. We quote a fixed price for project work and offer affordable monthly retainer plans for ongoing support — no hidden fees, ever." },
  { q: "Which areas do you serve?", a: "We primarily serve homes and businesses across Vadodara and nearby areas in Gujarat, with remote support available across India." },
];

const trustBadges = [
  { icon: ShieldCheck, label: "Skilled Technicians" },
  { icon: Zap, label: "Same-Day Response" },
  { icon: Award, label: "Warranty Backed" },
  { icon: Sparkles, label: "Reliable Support" },
];

function HomePage() {
  return (
    <SiteLayout>
      {/* HERO */}
      <section className="relative overflow-hidden text-navy-foreground">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroBg})` }}
          aria-hidden
        />
        <div className="absolute inset-0 bg-hero-gradient opacity-40" aria-hidden />
        {/* animated blobs */}
        <div className="absolute -top-32 -left-32 h-[420px] w-[420px] rounded-full bg-accent/30 blur-3xl animate-blob" aria-hidden />
        <div className="absolute -bottom-32 -right-32 h-[420px] w-[420px] rounded-full bg-primary-glow/30 blur-3xl animate-blob [animation-delay:-7s]" aria-hidden />
        <div className="absolute inset-0 bg-dot opacity-[0.07]" aria-hidden />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" aria-hidden />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 md:py-36 lg:py-44">
          <div className="max-w-3xl animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-dark text-xs sm:text-sm font-medium mb-6">
              <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
              Based in Vadodara, Gujarat — serving all India
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-[1.05] mb-6">
              Professional IT support for <span className="text-gradient">homes & businesses</span>
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-navy-foreground/80 mb-8 max-w-2xl leading-relaxed">
              Computer repair, Windows installation, networking, CCTV and modern websites — fast response, affordable pricing and 100% customer satisfaction.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/contact"
                className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white text-navy font-semibold shadow-elegant hover:scale-105 transition-transform"
              >
                Get Free Quote
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl glass-dark font-semibold hover:bg-white/15 transition-colors"
              >
                Explore Services
              </Link>
            </div>

            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((s, i) => (
                <div key={s.label} className="flex items-start gap-3 animate-fade-in-up" style={{ animationDelay: `${i * 100}ms` }}>
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-white/10 text-accent">
                    <s.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-sm sm:text-base font-bold font-display leading-tight">{s.value}</div>
                    <div className="text-xs text-navy-foreground/70 mt-1">{s.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* trust strip */}
        <div className="relative border-t border-white/10 backdrop-blur-md bg-navy-deep/40">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-5 grid grid-cols-2 md:grid-cols-4 gap-4">
            {trustBadges.map((b) => (
              <div key={b.label} className="flex items-center justify-center gap-2 text-sm text-navy-foreground/85">
                <b.icon className="h-4 w-4 text-accent" />
                <span className="font-medium">{b.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="py-20 lg:py-28 bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)]" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">About Shaikh.IT</div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              Your local IT partner in <span className="text-gradient">Vadodara</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-5">
              Shaikh.IT Solutions is a young, customer-first IT startup based in Vadodara, Gujarat. We help homes, shops, offices and small businesses with everything technology — from a broken laptop to a complete office network.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              No jargon, no inflated bills. Just honest advice, fast service and pricing that makes sense for Indian small businesses.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/about" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary-gradient text-navy-foreground font-semibold shadow-card-soft hover:shadow-glow transition-all">
                Learn more <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/portfolio" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border font-semibold hover:bg-secondary transition-colors">
                See our work
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-6 bg-accent-gradient opacity-20 blur-3xl rounded-3xl" aria-hidden />
            <div className="relative grid grid-cols-2 gap-4">
              {stats.map((s, i) => (
                <div
                  key={s.label}
                  className={`p-6 rounded-2xl glass shadow-card-soft hover:-translate-y-1 transition-transform ${i % 2 ? "mt-8" : ""}`}
                >
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary-gradient text-navy-foreground mb-3">
                    <s.icon className="h-5 w-5" />
                  </div>
                  <div className="text-lg lg:text-xl font-bold font-display text-gradient leading-tight">{s.value}</div>
                  <div className="text-sm text-muted-foreground mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-20 lg:py-28 bg-secondary/40 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">What We Do</div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">Complete IT services under one roof</h2>
            <p className="text-muted-foreground text-lg">Everything your business needs to stay connected, secure and online.</p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.slice(0, 6).map((s, i) => (
              <div
                key={s.title}
                className="group relative p-7 rounded-2xl border border-border bg-card shadow-card-soft hover:shadow-elegant hover:-translate-y-1.5 transition-all duration-300 overflow-hidden"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div className="absolute -top-16 -right-16 h-32 w-32 rounded-full bg-accent-gradient opacity-0 group-hover:opacity-20 blur-2xl transition-opacity" />
                <div className="relative">
                  <div className="grid h-14 w-14 place-items-center rounded-xl bg-primary-gradient text-navy-foreground mb-5 group-hover:scale-110 group-hover:rotate-3 transition-transform">
                    <s.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{s.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/services" className="inline-flex items-center gap-2 font-semibold text-accent hover:gap-3 transition-all">
              View all services <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">Why Choose Us</div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">A partner who actually <span className="text-gradient">cares</span></h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              We're more than a service provider — we're an extension of your team, committed to keeping your business running smoothly.
            </p>
            <div className="grid sm:grid-cols-2 gap-5">
              {features.map((f) => (
                <div key={f.title} className="flex gap-3 group">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-primary-gradient text-navy-foreground group-hover:scale-110 transition-transform">
                    <f.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">{f.title}</h4>
                    <p className="text-sm text-muted-foreground">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="aspect-square rounded-3xl bg-primary-gradient shadow-elegant p-10 text-navy-foreground relative overflow-hidden">
              <div className="absolute -top-20 -right-20 h-60 w-60 rounded-full bg-white/10 blur-3xl animate-blob" />
              <div className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-accent/30 blur-3xl animate-blob [animation-delay:-5s]" />
              <div className="relative h-full flex flex-col justify-between">
                <div>
                  <Phone className="h-10 w-10 mb-4" />
                  <h3 className="text-3xl font-bold font-display mb-3">Need help today?</h3>
                  <p className="text-navy-foreground/80 mb-6">Call us for fast on-site service across Vadodara, or quick remote support anywhere in India.</p>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-navy-foreground/60 mb-1">Call us</div>
                  <a href="tel:+917984679052" className="text-2xl sm:text-3xl font-bold font-display hover:text-accent transition-colors">
                    +91 79846 79052
                  </a>
                  <ul className="mt-6 space-y-2 text-sm">
                    {["Fast on-site response", "Transparent pricing", "Warranty on every job"].map((t) => (
                      <li key={t} className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-300" /> {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-20 lg:py-28 bg-navy-deep text-navy-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-[0.06]" aria-hidden />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-accent/20 blur-3xl" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">Our Process</div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">How we work with you</h2>
            <p className="text-navy-foreground/75 text-lg">A simple, proven four-step process — from first call to long-term partnership.</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 relative">
            {process.map((p, i) => (
              <div
                key={p.step}
                className="relative p-7 rounded-2xl glass-dark hover:-translate-y-1.5 transition-transform group"
              >
                <div className="absolute -top-4 right-5 text-5xl font-bold font-display text-white/10 group-hover:text-accent/40 transition-colors">
                  {p.step}
                </div>
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-accent-gradient mb-5">
                  <p.icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-bold mb-2">{p.title}</h3>
                <p className="text-sm text-navy-foreground/70 leading-relaxed">{p.desc}</p>
                {i < process.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px bg-gradient-to-r from-accent/60 to-transparent" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PORTFOLIO PREVIEW */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
            <div>
              <div className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">Recent Work</div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">Projects we're proud of</h2>
            </div>
            <Link to="/portfolio" className="inline-flex items-center gap-2 font-semibold text-accent">
              See all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {portfolio.slice(0, 3).map((p, i) => (
              <div key={p.title} className="group rounded-2xl overflow-hidden border border-border bg-card shadow-card-soft hover:shadow-elegant hover:-translate-y-1 transition-all">
                <div className="aspect-[4/3] bg-primary-gradient relative overflow-hidden">
                  <div className="absolute inset-0 bg-dot opacity-20" />
                  <div className="absolute inset-0 grid place-items-center text-navy-foreground/90 font-display text-7xl font-bold opacity-20 group-hover:scale-110 transition-transform">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/80 to-transparent" />
                  <div className="absolute bottom-4 left-4 px-3 py-1 rounded-full glass-dark text-xs font-medium text-white">
                    {p.category}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold mb-1.5">{p.title}</h3>
                  <p className="text-sm text-muted-foreground">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY WORK WITH US */}
      <section className="py-20 lg:py-28 bg-secondary/40 relative overflow-hidden">
        <div className="absolute inset-0 bg-dot opacity-30" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">Why Work With Us</div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">A trusted IT partner in Vadodara</h2>
            <p className="text-muted-foreground text-lg">We're a young IT startup focused on doing right by every customer — honest work, fair prices and real support.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: Clock, title: "Fast Response Time", desc: "Quick callbacks and same-day service across Vadodara whenever possible." },
              { icon: Wallet, title: "Affordable Pricing", desc: "Transparent quotes in INR with no hidden charges or upselling." },
              { icon: MessageCircle, title: "Honest Advice", desc: "We tell you what actually needs fixing — repair when we can, replace only when we must." },
              { icon: Headphones, title: "On-Site & Remote Support", desc: "Visit your home or office, or fix issues remotely — whichever is faster for you." },
              { icon: Smile, title: "Customer Satisfaction Focus", desc: "We're not done until you're happy with the result. Your trust matters more than one job." },
              { icon: BadgeCheck, title: "Service Warranty", desc: "Every repair and installation comes with a service warranty for your peace of mind." },
            ].map((item, i) => (
              <div
                key={item.title}
                className="p-7 rounded-2xl glass shadow-card-soft hover:-translate-y-1.5 hover:shadow-elegant transition-all"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary-gradient text-navy-foreground mb-4">
                  <item.icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* FAQ */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">FAQ</div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">Frequently asked questions</h2>
            <p className="text-muted-foreground text-lg">Quick answers to the things clients ask us most often.</p>
          </div>

          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((f, i) => (
              <AccordionItem
                key={f.q}
                value={`item-${i}`}
                className="rounded-2xl border border-border bg-card px-6 shadow-card-soft hover:shadow-elegant transition-shadow"
              >
                <AccordionTrigger className="text-left text-base font-semibold hover:no-underline py-5">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="text-center mt-10">
            <p className="text-muted-foreground mb-4">Still have questions?</p>
            <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary-gradient text-navy-foreground font-semibold shadow-card-soft hover:shadow-glow transition-all">
              Talk to our team <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-24 bg-background">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-primary-gradient text-navy-foreground p-10 lg:p-16 text-center shadow-elegant relative overflow-hidden">
            <div className="absolute -top-32 -left-32 h-72 w-72 rounded-full bg-white/10 blur-3xl animate-blob" />
            <div className="absolute -bottom-32 -right-32 h-72 w-72 rounded-full bg-accent/30 blur-3xl animate-blob [animation-delay:-6s]" />
            <div className="absolute inset-0 bg-dot opacity-10" />
            <div className="relative">
              <Sparkles className="h-10 w-10 mx-auto mb-5 text-accent" />
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">Ready to upgrade your IT?</h2>
              <p className="text-navy-foreground/80 text-lg mb-8 max-w-2xl mx-auto">
                Get a free consultation and discover how we can save you time, money and headaches.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white text-navy font-semibold shadow-elegant hover:scale-105 transition-transform"
                >
                  Start your project <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href="tel:+917984679052"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl glass-dark font-semibold hover:bg-white/15 transition-colors"
                >
                  <Phone className="h-4 w-4" /> +91 79846 79052
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
