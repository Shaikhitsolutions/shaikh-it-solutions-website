import { Link } from "@tanstack/react-router";
import { Cpu, Mail, Phone, MapPin, Facebook, Instagram, Linkedin } from "lucide-react";
import logo from "@/assets/image/Logo.png";

export function SiteFooter() {
  return (
    <footer className="bg-navy-deep text-navy-foreground">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
             
             <img
  src={logo}
  alt="Shaikh.IT Solutions"
  className="h-12 w-12 object-contain rounded-xl"
/>
              <div>
                <div className="font-display font-bold text-lg">Shaikh.IT</div>
                <div className="text-xs text-navy-foreground/60 uppercase tracking-wider">Solutions</div>
              </div>
            </div>
            <p className="text-sm text-navy-foreground/70 leading-relaxed">
         Professional IT support, computer repair, networking, CCTV installation and website development for homes, businesses and organizations across India.
            </p>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4 text-sm uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2.5 text-sm text-navy-foreground/75">
              <li><Link to="/" className="hover:text-accent transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-accent transition-colors">About</Link></li>
              <li><Link to="/services" className="hover:text-accent transition-colors">Services</Link></li>
              <li><Link to="/portfolio" className="hover:text-accent transition-colors">Portfolio</Link></li>
              <li><Link to="/contact" className="hover:text-accent transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4 text-sm uppercase tracking-wider">Services</h4>
            <ul className="space-y-2.5 text-sm text-navy-foreground/75">
              <li>Computer & Laptop Repair</li>
              <li>Windows Installation</li>
              <li>Networking & Router Setup</li>
              <li>CCTV Installation</li>
              <li>Website Development</li>
              <li>IT Support</li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4 text-sm uppercase tracking-wider">Contact</h4>
            <ul className="space-y-3 text-sm text-navy-foreground/75">
              <li className="flex items-start gap-3">
                <Phone className="h-4 w-4 mt-0.5 shrink-0 text-accent" />
                <span>+91 79846 79052</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="h-4 w-4 mt-0.5 shrink-0 text-accent" />
                <span>shaikh.itsolutions11@gmail.com</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-accent" />
                <span>Head Office: Vadodara, Gujarat
Serving Clients Across India 🇮🇳</span>
              </li>
            </ul>
            <div className="flex gap-3 mt-5">
              {[Facebook, Instagram, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="grid h-9 w-9 place-items-center rounded-lg bg-white/5 hover:bg-accent transition-colors">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between gap-4 text-sm text-navy-foreground/60">
          <p>&copy; {new Date().getFullYear()} © 2026 Shaikh.IT Solutions. All rights reserved.

Founded & Managed by Shahid Shaikh</p>
          <p>Crafted with Precision, Innovation & Passion
by Shahid Shaikh • Founder, Shaikh.IT Solutions &amp; care.</p>
        </div>
      </div>
    </footer>
  );
}
