import {
  Wrench, Network, Globe, ShieldCheck, Monitor, MonitorCog,
  Camera, Headphones, Laptop, Smile, Zap, Wallet,
} from "lucide-react";

export const services = [
  { icon: Laptop, title: "Computer & Laptop Repair", desc: "Fast, reliable repairs for desktops and laptops — hardware diagnostics, board-level fixes and upgrades." },
  { icon: MonitorCog, title: "Windows Installation", desc: "Genuine Windows installation, driver setup, software activation and complete PC tune-up." },
  { icon: Network, title: "Networking & Router Setup", desc: "LAN/WiFi setup, router configuration, structured cabling and network security for homes and offices." },
  { icon: Camera, title: "CCTV Installation", desc: "End-to-end CCTV installation with mobile monitoring, DVR/NVR setup and remote viewing." },
  { icon: Globe, title: "Website Development", desc: "Modern, SEO-friendly websites and e-commerce stores that convert visitors into customers." },
  { icon: Headphones, title: "IT Support", desc: "Remote and on-site IT support tailored for small businesses, shops and offices across Vadodara." },
] as const;

export const portfolio = [
  { title: "Retail Chain Network Upgrade", category: "Networking", desc: "Designed and deployed a multi-branch WiFi & VPN infrastructure in Vadodara." },
  { title: "Local Business Website", category: "Web Development", desc: "Modern e-commerce store with payment integration & SEO for a Gujarat-based retailer." },
  { title: "Office IT Setup", category: "IT Support", desc: "Complete IT setup and workstation configuration for a growing startup office." },
  { title: "CCTV Installation – Warehouse", category: "Surveillance", desc: "16-camera HD system with cloud backup & mobile monitoring." },
  { title: "Windows & Software Rollout", category: "Software", desc: "Genuine Windows installation and productivity setup for a small office." },
  { title: "Clinic Website & Booking", category: "Web Development", desc: "Custom clinic website with online appointment booking." },
] as const;


export const stats = [
  { icon: Headphones, value: "Pro IT Support", label: "For homes & businesses" },
  { icon: Zap, value: "Fast Response", label: "Same-day service" },
  { icon: Wallet, value: "Affordable", label: "Transparent pricing" },
  { icon: Smile, value: "100% Satisfaction", label: "Customer-first approach" },
] as const;

export const features = [
  { icon: Laptop, title: "Skilled Technicians", desc: "Experienced engineers who genuinely care about your problem." },
  { icon: Zap, title: "Fast Response", desc: "Same-day service across Vadodara and quick remote support." },
  { icon: Wallet, title: "Affordable Pricing", desc: "Transparent quotes in INR with no hidden charges." },
  { icon: ShieldCheck, title: "Service Warranty", desc: "All repairs and installations come with a service warranty." },
] as const;

export const products = [
  {
    id: "qnt-qkb11",
    name: "Quantron QKB11 USB Keyboard",
    image: "https://shaikhitsolutions.netlify.app/favicon.png", // Ya real image path
    price: "₹249", // Distributor price + aapka margin
    whatsappUrl: "https://wa.me/917984679052?text=Hi%20Shahid,%20I%20want%20to%20order%20Quantron%20QKB11%20Keyboard"
  },
  {
    id: "qmu-540",
    name: "Quantron QMU 540 Optical Mouse",
    image: "https://shaikhitsolutions.netlify.app/favicon.png",
    price: "₹120", 
    whatsappUrl: "https://wa.me/917984679052?text=Hi%20Shahid,%20I%20want%20to%20order%20Quantron%20QMU%20540%20Mouse"
  }
];

// re-export so existing imports keep working
export { Monitor, Wrench };
