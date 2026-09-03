import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowRight, Sparkles, Download, PlayCircle, HelpCircle, ShieldCheck, Zap } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { WhatsAppButton } from "@/components/WhatsAppButton";

export const Route = createFileRoute("/softwares")({
  component: SoftwaresPage,
});

function SoftwaresPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col justify-between selection:bg-indigo-500 selection:text-white">
      {/* Official Website Header */}
      <SiteHeader />

      {/* Main Content with Background */}
      <div 
        className="flex-1 text-slate-800 pt-36 pb-20 px-4 sm:px-6 lg:px-8 relative bg-cover bg-center bg-no-repeat bg-fixed overflow-hidden"
        style={{ backgroundImage: `url('/softwares-bg.png')` }}
      >
        {/* Background Glowing Ambient Orbs */}
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl pointer-events-none animate-pulse"></div>
        <div className="absolute bottom-1/3 right-10 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl pointer-events-none animate-pulse duration-1000"></div>

        <div className="max-w-7xl mx-auto space-y-16 relative z-10">

          {/* Header Section with Smooth Fade-in */}
          <div className="text-center space-y-4 max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-black uppercase tracking-widest shadow-2xs">
              <Sparkles size={14} /> Official Shaikh.IT Solutions Softwares
            </div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900">
              Professional Desktop & Web Softwares
            </h1>
            <p className="text-sm text-slate-600 font-medium leading-relaxed">
              Explore high-performance business applications engineered for maximum reliability, speed, and automation.
            </p>
          </div>

          {/* Softwares Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">

            {/* SITS Billing Card - Coming Soon State */}
            <div 
              className="bg-white/90 backdrop-blur-md border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-lg relative overflow-hidden flex flex-col justify-between space-y-6"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/5 rounded-full blur-2xl"></div>

              <div className="space-y-4 relative z-10">
                <div className="flex items-center justify-between">
                  <div className="w-14 h-14 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-black text-2xl shadow-xl shadow-indigo-600/30">
                    S
                  </div>
                  <span className="px-3.5 py-1.5 rounded-full bg-amber-50 text-amber-700 text-xs font-black tracking-wide uppercase border border-amber-200">
                    Coming Soon
                  </span>
                </div>
                <div className="space-y-2">
                  <span className="text-[10px] font-black uppercase text-indigo-600 tracking-wider bg-indigo-50 px-3 py-1 rounded-full">
                    POS & EMI Software
                  </span>
                  <h3 className="text-xl font-black text-slate-900">
                    SITS Billing Software
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    Advanced billing, inventory management, customer WhatsApp reminders, and CA-ready audit reporting system.
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-400 relative z-10">
                <span>Under Development & Final Polish</span>
              </div>
            </div>

            {/* Future Software Slot Placeholder */}
            <div className="bg-white/40 backdrop-blur-sm border border-slate-200/60 rounded-3xl p-6 sm:p-8 border-dashed flex flex-col items-center justify-center text-center space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center font-bold text-2xl shadow-inner">
                +
              </div>
              <h3 className="text-sm font-bold text-slate-700">More Softwares Coming Soon</h3>
              <p className="text-[11px] text-slate-500 font-medium">Custom business solutions under development.</p>
            </div>

          </div>

          {/* ULTRA ANIMATED HOW TO DOWNLOAD & TUTORIALS SECTION ON LIST PAGE */}
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-2xl space-y-8 relative overflow-hidden max-w-5xl mx-auto">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none"></div>

            <div className="border-b border-slate-100 pb-5 flex items-center justify-between flex-wrap gap-4 relative z-10">
              <div>
                <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase text-indigo-600 tracking-widest bg-indigo-50 px-3.5 py-1.5 rounded-full border border-indigo-100 shadow-2xs">
                  <Sparkles size={12} /> Step-by-Step Guide
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
                  How to Download, Install & Use SITS Softwares
                </h3>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-600 bg-slate-100/80 backdrop-blur-sm px-4 py-2.5 rounded-2xl border border-slate-200/60 shadow-2xs">
  <HelpCircle size={16} className="text-indigo-600" /> Need Expert Help? Direct Support Available
</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">

              {/* Step 1 */}
              <div className="bg-gradient-to-b from-slate-50 to-white border border-slate-200/80 rounded-2xl p-6 space-y-3 hover:border-indigo-500 hover:shadow-xl transition-all duration-300 group">
                <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-black text-sm shadow-md shadow-indigo-600/30 group-hover:scale-110 transition-transform">
                  01
                </div>
                <h4 className="font-extrabold text-base text-slate-900">Request Setup File</h4>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  Click on any software card to view details and get the secure installer package directly from our team via WhatsApp.
                </p>
              </div>

              {/* Step 2 */}
              <div className="bg-gradient-to-b from-slate-50 to-white border border-slate-200/80 rounded-2xl p-6 space-y-3 hover:border-indigo-500 hover:shadow-xl transition-all duration-300 group">
                <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-black text-sm shadow-md shadow-indigo-600/30 group-hover:scale-110 transition-transform">
                  02
                </div>
                <h4 className="font-extrabold text-base text-slate-900">Install on Windows PC</h4>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  Run the installer on your computer. Our technical team also provides free remote installation support via AnyDesk.
                </p>
              </div>

              {/* Step 3 */}
              <div className="bg-gradient-to-b from-slate-50 to-white border border-slate-200/80 rounded-2xl p-6 space-y-3 hover:border-indigo-500 hover:shadow-xl transition-all duration-300 group">
                <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-black text-sm shadow-md shadow-indigo-600/30 group-hover:scale-110 transition-transform">
                  03
                </div>
                <h4 className="font-extrabold text-base text-slate-900">Watch Video Tutorials</h4>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  Access complete video walkthroughs to learn invoicing, stock management, and customer accounts setup in minutes.
                </p>
              </div>

            </div>

            {/* Glowing Video Tutorial Banner */}
            <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>

              <div className="space-y-2 text-center sm:text-left relative z-10">
                <span className="text-[10px] font-black uppercase text-indigo-400 tracking-wider flex items-center gap-1.5 justify-center sm:justify-start">
                  <Sparkles size={12} /> Free Training Available
                </span>
                <h4 className="text-lg sm:text-xl font-extrabold tracking-tight">Want a live screen-share demo & training session?</h4>
                <p className="text-xs text-slate-300 font-medium max-w-xl leading-relaxed">
                  Our experts will personally walk you through all software features and help set up your business profile.
                </p>
              </div>

              <a
                href="https://wa.me/917984679052?text=Hello%20Shaikh.IT%20Solutions,%20I%20want%20a%20free%20live%20demo%20and%20video%20tutorial%20for%20SITS%20Softwares."
                target="_blank"
                rel="noopener noreferrer"
                className="bg-indigo-600 hover:bg-indigo-500 text-white px-7 py-4 rounded-2xl font-black text-xs sm:text-sm flex items-center gap-2.5 whitespace-nowrap shadow-xl shadow-indigo-600/40 cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95 relative z-10"
              >
                <PlayCircle size={20} className="animate-pulse" /> Request Free Live Demo
              </a>
            </div>

          </div>

        </div>
      </div>

      {/* Official Website Footer */}
      <SiteFooter />
      <WhatsAppButton />
    </div>
  );
}