import { Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Menu, X, Cpu } from "lucide-react";
import logo from "@/assets/image/logo.png";

const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/products", label: "Products" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "glass shadow-card-soft"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center h-16 lg:h-20 gap-4">
          <Link to="/" className="flex min-w-0 items-center gap-2.5 group">
          <img
  src={logo}
  alt="Shaikh.IT Solutions"
  className="w-20 h-20 object-contain"
/>
            <div className="min-w-0">
              <div className="font-display font-bold text-base sm:text-lg leading-tight truncate text-foreground">
                Shaikh.IT
              </div>
              <div className="text-[10px] sm:text-xs text-muted-foreground tracking-wider uppercase truncate">
                Solutions
              </div>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className="px-4 py-2 text-sm font-medium text-foreground/80 hover:text-foreground rounded-lg hover:bg-secondary transition-colors"
                activeProps={{ className: "px-4 py-2 text-sm font-semibold text-foreground bg-secondary rounded-lg" }}
                activeOptions={{ exact: n.to === "/" }}
              >
                {n.label}
              </Link>
            ))}
            <Link
              to="/contact"
              className="ml-3 inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold rounded-lg bg-primary-gradient text-navy-foreground shadow-card-soft hover:shadow-glow transition-all"
            >
              Get a Quote
            </Link>
          </nav>

          <button
            className="lg:hidden p-2 rounded-lg hover:bg-secondary"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {open && (
          <div className="lg:hidden pb-4 animate-fade-in">
            <nav className="flex flex-col gap-1 pt-2">
              {nav.map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  onClick={() => setOpen(false)}
                  className="px-4 py-3 text-sm font-medium rounded-lg hover:bg-secondary"
                  activeProps={{ className: "px-4 py-3 text-sm font-semibold rounded-lg bg-secondary" }}
                  activeOptions={{ exact: n.to === "/" }}
                >
                  {n.label}
                </Link>
              ))}
              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="mt-2 text-center px-5 py-3 text-sm font-semibold rounded-lg bg-primary-gradient text-navy-foreground"
              >
                Get a Quote
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
