import { createFileRoute, Link } from "@tanstack/react-router";
import { FileText, CreditCard, Package, ShieldCheck, Zap, ArrowLeft, Download, PlayCircle, HelpCircle, Sparkles, CheckCircle, Terminal } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/softwares/sits-billing")({
  component: SitsBillingDetailPage,
});

function SitsBillingDetailPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col justify-between selection:bg-indigo-500 selection:text-white">
      <SiteHeader />

      <div 
        className="flex-1 text-slate-800 pt-36 pb-20 px-4 sm:px-6 lg:px-8 relative bg-cover bg-center bg-no-repeat bg-fixed overflow-hidden"
        style={{ backgroundImage: `url('/softwares-bg.png')` }}
      >
        {/* Background Glowing Ambient Orbs for High-End Animation Look */}
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl pointer-events-none animate-pulse"></div>
        <div className="absolute bottom-1/3 right-10 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl pointer-events-none animate-pulse duration-1000"></div>

        <div className="max-w-5xl mx-auto space-y-10 relative z-10">
          
          {/* Animated Back Button */}
          <Link
            to="/softwares"
            className="inline-flex items-center gap-2 text-xs font-bold text-indigo-600 hover:text-indigo-700 bg-white/90 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-sm border border-slate-200/80 transition-all duration-300 hover:scale-105 hover:shadow-md group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Softwares
          </Link>

          {/* Main Hero Software Card with Floating Entry Animation */}
          <div className="bg-white/95 backdrop-blur-xl text-slate-900 rounded-3xl shadow-2xl overflow-hidden border border-slate-200/80 relative transition-all duration-500 hover:shadow-indigo-500/10 animate-in fade-in zoom-in-95">
            
            {/* Header Bar */}
            <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 via-transparent to-purple-600/20 animate-pulse"></div>
              <div className="flex items-center gap-3 relative z-10">
                <div className="w-10 h-10 rounded-2xl bg-indigo-600 flex items-center justify-center font-black text-white shadow-lg shadow-indigo-600/50 animate-bounce">
                  S
                </div>
                <div>
                  <h3 className="font-extrabold text-sm tracking-wide">SITS Billing & POS Software</h3>
                  <p className="text-[10px] text-indigo-400 font-bold uppercase tracking-wider">Shaikh.IT Solutions Flagship Product</p>
                </div>
              </div>
              <span className="relative z-10 text-xs bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3.5 py-1 rounded-full font-bold flex items-center gap-1.5 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span> v2.4 Latest Stable
              </span>
            </div>

            {/* Content Section */}
            <div className="p-6 sm:p-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-gradient-to-b from-white to-slate-50/50">
              
              {/* Left Side: Features & Highlights */}
              <div className="space-y-6">
                <div>
                  <span className="inline-flex items-center gap-1.5 bg-indigo-50 text-indigo-700 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider border border-indigo-100 shadow-2xs">
                    <Sparkles size={12} /> Advanced POS & EMI Software
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-3 leading-tight">
                    Manage Billing, Stock & EMI Khata with <span className="text-indigo-600 underline decoration-indigo-300 decoration-wavy">99.9% Reliability</span>
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 mt-3 font-medium leading-relaxed">
                    Designed specifically for modern businesses and retail shops. Fast invoicing, automated customer WhatsApp reminders, and CA-ready audit reports.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3.5">
                  <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs hover:border-indigo-500 hover:shadow-md transition-all duration-300 group cursor-pointer space-y-1">
                    <FileText size={20} className="text-indigo-600 group-hover:scale-110 transition-transform" />
                    <h4 className="text-xs font-bold text-slate-900">Fast POS Billing</h4>
                    <p className="text-[10px] text-slate-500">Create & print tax invoices instantly.</p>
                  </div>

                  <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs hover:border-emerald-500 hover:shadow-md transition-all duration-300 group cursor-pointer space-y-1">
                    <CreditCard size={20} className="text-emerald-600 group-hover:scale-110 transition-transform" />
                    <h4 className="text-xs font-bold text-slate-900">EMI Tracker</h4>
                    <p className="text-[10px] text-slate-500">Manage advance payments & due dates.</p>
                  </div>

                  <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs hover:border-amber-500 hover:shadow-md transition-all duration-300 group cursor-pointer space-y-1">
                    <Package size={20} className="text-amber-600 group-hover:scale-110 transition-transform" />
                    <h4 className="text-xs font-bold text-slate-900">Stock Inventory</h4>
                    <p className="text-[10px] text-slate-500">Low stock alerts & product management.</p>
                  </div>

                  <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs hover:border-indigo-500 hover:shadow-md transition-all duration-300 group cursor-pointer space-y-1">
                    <ShieldCheck size={20} className="text-indigo-600 group-hover:scale-110 transition-transform" />
                    <h4 className="text-xs font-bold text-slate-900">CA Audit Reports</h4>
                    <p className="text-[10px] text-slate-500">Government tax & profit margin ready.</p>
                  </div>
                </div>

                {/* Direct WhatsApp Action Button */}
                <div className="flex flex-wrap gap-3 pt-2">
                  <a
                    href="https://wa.me/917984679052?text=Hello%20Shaikh.IT%20Solutions,%20I%20want%20to%20buy%20or%20get%20setup%20file%20for%20SITS%20Billing%20Software."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white px-6 py-4 rounded-2xl font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all duration-300 shadow-xl shadow-indigo-600/30 hover:scale-[1.02] active:scale-95 cursor-pointer"
                  >
                    <Download size={18} className="animate-bounce" /> Get Setup & Pricing on WhatsApp
                  </a>
                </div>
              </div>

              {/* Right Side: Animated Preview Card */}
              <div className="bg-slate-900 rounded-3xl p-6 text-white space-y-4 shadow-2xl border border-slate-800 relative overflow-hidden group">
                <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-indigo-600/30 rounded-full blur-3xl pointer-events-none group-hover:scale-150 transition-transform duration-500"></div>

                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <span className="text-[10px] font-black uppercase text-indigo-400 tracking-wider flex items-center gap-1.5">
                    <Terminal size={12} /> Live Software Preview
                  </span>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
                </div>

                <div className="space-y-3 bg-slate-800/80 p-4 rounded-2xl border border-slate-700/60 backdrop-blur-sm shadow-inner">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400 font-semibold">Total Revenue (Audit)</span>
                    <span className="text-emerald-400 font-black font-mono">₹33,498</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400 font-semibold">Active EMI Balances</span>
                    <span className="text-amber-400 font-black font-mono">₹28,498</span>
                  </div>
                  <div className="flex justify-between items-center text-xs border-t border-slate-700/80 pt-2">
                    <span className="text-slate-400 font-semibold">Net Profit Margin</span>
                    <span className="text-indigo-300 font-black font-mono">₹33,498</span>
                  </div>
                </div>

                <div className="bg-emerald-950/40 border border-emerald-500/30 p-4 rounded-2xl flex items-center gap-3.5 backdrop-blur-sm">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500 text-slate-950 flex items-center justify-center font-black shadow-lg shadow-emerald-500/20">
                    <CheckCircle size={20} />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-emerald-300">100% Trusted & Verified</h5>
                    <p className="text-[10px] text-slate-400">Directly developed & supported by Shaikh.IT Solutions.</p>
                  </div>
                </div>

              </div>

            </div>

          </div>

          {/* ULTRA ANIMATED HOW TO DOWNLOAD & TUTORIALS SECTION */}
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-2xl space-y-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none"></div>

            <div className="border-b border-slate-100 pb-5 flex items-center justify-between flex-wrap gap-4 relative z-10">
              <div>
                <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase text-indigo-600 tracking-widest bg-indigo-50 px-3.5 py-1.5 rounded-full border border-indigo-100 shadow-2xs">
                  <Sparkles size={12} /> Step-by-Step Guide
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
                  How to Download, Install & Use SITS Billing
                </h3>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-600 bg-slate-100/80 backdrop-blur-sm px-4 py-2.5 rounded-2xl border border-slate-200/60 shadow-2xs">
                <HelpCircle size={16} className="text-indigo-600 animate-spin" /> Need Expert Help? Direct Support Available
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
                  Click on the "Get Setup on WhatsApp" button above to receive the secure software installer package directly from our team.
                </p>
              </div>

              {/* Step 2 */}
              <div className="bg-gradient-to-b from-slate-50 to-white border border-slate-200/80 rounded-2xl p-6 space-y-3 hover:border-indigo-500 hover:shadow-xl transition-all duration-300 group">
                <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-black text-sm shadow-md shadow-indigo-600/30 group-hover:scale-110 transition-transform">
                  02
                </div>
                <h4 className="font-extrabold text-base text-slate-900">Install on Windows PC</h4>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  Run the installer on your Windows computer. Our team can also do free remote installation via AnyDesk/TeamViewer.
                </p>
              </div>

              {/* Step 3 */}
              <div className="bg-gradient-to-b from-slate-50 to-white border border-slate-200/80 rounded-2xl p-6 space-y-3 hover:border-indigo-500 hover:shadow-xl transition-all duration-300 group">
                <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-black text-sm shadow-md shadow-indigo-600/30 group-hover:scale-110 transition-transform">
                  03
                </div>
                <h4 className="font-extrabold text-base text-slate-900">Watch Video Tutorial</h4>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  Learn how to generate GST invoices, manage stock inventory, and track customer EMI khata in under 5 minutes.
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
                  Our technical experts will personally train your staff on how to use SITS Billing Software efficiently.
                </p>
              </div>

              <a
                href="https://wa.me/917984679052?text=Hello%20Shaikh.IT%20Solutions,%20I%20want%20a%20free%20live%20demo%20and%20video%20tutorial%20for%20SITS%20Billing."
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

      <SiteFooter />
    </div>
  );
}