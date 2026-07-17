import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2 } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { PageHero } from "./about";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Shaikh.IT Solutions" },
      { name: "description", content: "Get in touch with Shaikh.IT Solutions for IT support, computer repair, networking, CCTV or website development." },
      { property: "og:title", content: "Contact — Shaikh.IT Solutions" },
      { property: "og:description", content: "Get in touch for IT services and consultations." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(80),
  email: z.string().trim().email("Invalid email").max(120),
  phone: z.string().trim().min(7, "Please enter a valid phone").max(30),
  service: z.string().min(1, "Please choose a service"),
  message: z.string().trim().min(10, "Please describe your needs").max(1000),
});

const contactInfo = [
  { icon: Phone, title: "Phone", value: "+91 79846 79052", href: "tel:+917984679052" },
  { icon: Mail, title: "Email", value: "shaikh.itsolutions11@gmail.com", href: "mailto:shaikh.itsolutions11@gmail.com" },
  { icon: MapPin, title: "Location", value: "Vadodara, Gujarat, India" },
  { icon: Clock, title: "Hours", value: "24x7" },
];

function ContactPage() {
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd) as Record<string, string>;
    const parsed = contactSchema.safeParse(data);
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      parsed.error.issues.forEach((i) => { errs[String(i.path[0])] = i.message; });
      setErrors(errs);
      return;
    }
    setErrors({});
    // Send via WhatsApp
    const msg = `Hello Shaikh.IT, I'm ${parsed.data.name} (${parsed.data.phone}, ${parsed.data.email}).\nService: ${parsed.data.service}\n\n${parsed.data.message}`;
    window.open(`https://wa.me/917984679052?text=${encodeURIComponent(msg)}`, "_blank");
    setSent(true);
    e.currentTarget.reset();
  }

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Contact Us"
        title="Let's start the conversation"
        subtitle="Tell us what you need — we'll get back to you within 24 hours with a free quote."
      />

      <section className="py-20 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-5 gap-10">
          {/* Form */}
          <div className="lg:col-span-3 p-8 lg:p-10 rounded-2xl bg-card border border-border shadow-card-soft">
            <h2 className="text-2xl font-bold mb-2">Send us a message</h2>
            <p className="text-muted-foreground text-sm mb-6">We typically reply within a few hours during business days.</p>

            {sent && (
              <div className="mb-5 p-4 rounded-xl bg-green-50 border border-green-200 text-green-800 flex gap-2 text-sm">
                <CheckCircle2 className="h-5 w-5 shrink-0" />
                Thanks! We'll open WhatsApp so you can send the message directly.
              </div>
            )}

            <form onSubmit={handleSubmit} className="grid gap-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Your Name" name="name" error={errors.name} />
                <Field label="Phone" name="phone" type="tel" error={errors.phone} />
              </div>
              <Field label="Email" name="email" type="email" error={errors.email} />
              <div>
                <label className="block text-sm font-medium mb-1.5">Service Needed</label>
                <select
                  name="service"
                  className="w-full px-4 py-3 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  defaultValue=""
                >
                  <option value="" disabled>Select a service…</option>
                  <option>Computer & Laptop Repair</option>
                  <option>Windows Installation</option>
                  <option>Networking & Router Setup</option>
                  <option>CCTV Installation</option>
                  <option>Website Development</option>
                  <option>IT Support</option>
                  <option>Other</option>
                </select>
                {errors.service && <p className="text-xs text-destructive mt-1">{errors.service}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Message</label>
                <textarea
                  name="message"
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                  placeholder="Tell us about your project or issue..."
                />
                {errors.message && <p className="text-xs text-destructive mt-1">{errors.message}</p>}
              </div>
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-primary-gradient text-navy-foreground font-semibold shadow-card-soft hover:shadow-glow transition-all"
              >
                Send Message <Send className="h-4 w-4" />
              </button>
            </form>
          </div>

          {/* Contact info */}
          <div className="lg:col-span-2 space-y-4">
            {contactInfo.map((c) => {



              const Inner = (
                <div className="p-6 rounded-2xl border border-border bg-card hover:shadow-card-soft transition-shadow flex gap-4 items-start">
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-primary-gradient text-navy-foreground">
                    <c.icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs uppercase tracking-wider text-muted-foreground mb-0.5">{c.title}</div>
                    <div className="font-semibold break-words">{c.value}</div>
                  </div>
                </div>
              );
              return c.href ? (
                <a key={c.title} href={c.href} className="block">{Inner}</a>
              ) : (
                <div key={c.title}>{Inner}</div>
              );
            })}

          {/* Google Map */}
<div className="overflow-hidden rounded-2xl border border-border shadow-card-soft">
  <div className="p-5 rounded-2xl border border-border bg-card mb-4">
  <h3 className="font-bold text-lg mb-2">
    🇮🇳 Serving Clients Across India
  </h3>

  <p className="text-sm text-muted-foreground leading-relaxed">
    🇮🇳 Serving Clients Across India
    We provide professional IT solutions for homes, businesses, schools, offices, and organizations across India. Remote support is available nationwide, and on-site services can be arranged based on project requirements.
  </p>

  <ul className="mt-4 space-y-2 text-sm">
    <li>✅ On-site IT Services</li>
    <li>✅ Remote IT Support</li>
    <li>✅ Website Development</li>
    <li>✅ Networking & CCTV Solutions</li>
  </ul>

  <p className="mt-4 text-sm text-muted-foreground">
    For projects outside Vadodara, travel and other project-related expenses will
    be included in the final quotation.
  </p>
</div>
  <iframe
    src="https://www.google.com/maps?q=Vadodara,Gujarat&output=embed"
    width="100%"
    height="300"
    loading="lazy"
    allowFullScreen
    referrerPolicy="no-referrer-when-downgrade"
    className="border-0"
  />
</div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

function Field({ label, name, type = "text", error }: { label: string; name: string; type?: string; error?: string }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1.5">{label}</label>
      <input
        name={name}
        type={type}
        className="w-full px-4 py-3 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
      />
      {error && <p className="text-xs text-destructive mt-1">{error}</p>}
    </div>
  );
}
