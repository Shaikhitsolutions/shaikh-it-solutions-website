import { useEffect } from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { SiteLayout } from '@/components/SiteLayout'
import { services } from '@/lib/site-data'
import { ArrowLeft, CheckCircle2, Phone, MessageSquare } from 'lucide-react'

export const Route = createFileRoute('/services/$serviceId')({
  component: ServiceDetailComponent,
})

function ServiceDetailComponent() {
  const { serviceId } = Route.useParams()

  // Page load hote hi top par laane ke liye
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [serviceId]);

  // URL token ko data se match kar rahe hain
  const currentService = services.find((s) => {
    const id = s.title === "Computer & Laptop Repair" ? "computer-repair" :
               s.title === "Windows Installation" ? "windows-installation" :
               s.title === "Networking & Router Setup" ? "networking-setup" :
               s.title === "CCTV Installation" ? "cctv-installation" :
               s.title === "Website Development" ? "website-development" : "it-support";
    return id === serviceId;
  })

  if (!currentService) {
    return (
      <SiteLayout>
        <div className="py-24 text-center max-w-xl mx-auto pt-32">
          <h1 className="text-3xl font-bold mb-4">Service Not Found</h1>
          <Link to="/services" className="text-accent font-semibold inline-flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" /> Back to all services
          </Link>
        </div>
      </SiteLayout>
    )
  }

  return (
    <SiteLayout>
      {/* 🌟 PT-36 LAGAYA HAI TAAKI FIXED NAVBAR KE NICHE SE DYNAMIC TITLE DIKHE 🌟 */}
      <div className="pt-36 bg-background min-h-screen">
        <div className="mx-auto max-w-5xl px-4">
          
          {/* Breadcrumb back link */}
          <Link to="/services" className="inline-flex items-center gap-2 text-sm text-accent mb-6 hover:underline">
            <ArrowLeft className="h-4 w-4" /> Back to All Services
          </Link>

          {/* Dynamic Service Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-navy">
            {currentService.title}
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground mb-10 max-w-3xl leading-relaxed">
            {currentService.desc}
          </p>

          <hr className="border-border mb-10" />

          {/* Content Layout */}
          <div className="grid md:grid-cols-3 gap-8 pb-20">
            {/* Left Column */}
            <div className="md:col-span-2 space-y-6">
              <h2 className="text-xl font-bold">What's Included in this Service</h2>
              <div className="grid gap-3">
                {[
                  `Professional & Certified ${currentService.title} experts`,
                  "Transparent diagnostics and upfront pricing",
                  "100% genuine parts and reliable solutions",
                  "Service warranty support for your peace of mind",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3 p-4 rounded-xl border border-border bg-card">
                    <CheckCircle2 className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <span className="text-muted-foreground text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Sidebar */}
            <div>
              <div className="p-6 rounded-2xl bg-secondary/50 border border-border">
                <h3 className="text-lg font-bold mb-2">Book Service Now</h3>
                <p className="text-xs text-muted-foreground mb-4">
                  Need professional help right away in Vadodara?
                </p>
                
                <div className="space-y-3">
                  <a
                    href="tel:+917984679052"
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl bg-primary-gradient text-navy-foreground font-semibold shadow-card-soft hover:shadow-glow transition-all text-sm"
                  >
                    <Phone className="h-4 w-4" /> Call Expert
                  </a>
                  
                  <Link
                    to="/contact"
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl border border-border bg-background font-semibold hover:bg-card transition-colors text-sm"
                  >
                    Request Online Quote
                  </Link>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </SiteLayout>
  )
}