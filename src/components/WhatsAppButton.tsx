import { MessageCircle } from "lucide-react";

export function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/917984679052?text=Hello%20Shaikh.IT%2C%20I%20need%20help%20with..."
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="group fixed bottom-6 right-6 z-40 flex items-center gap-3 pr-2"
    >
      <span className="hidden sm:inline-block glass text-sm font-medium px-3 py-2 rounded-xl shadow-card-soft opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
        Chat with us
      </span>
      <span
        className="relative grid h-14 w-14 place-items-center rounded-full text-white shadow-elegant animate-glow hover:scale-110 transition-transform"
        style={{ background: "linear-gradient(135deg, #25D366, #128C7E)" }}
      >
        <span className="absolute inset-0 rounded-full bg-[#25D366]/40 animate-ping" />
        <MessageCircle className="relative h-6 w-6" fill="currentColor" />
      </span>
    </a>
  );
}
