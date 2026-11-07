import React from 'react';
import { ArrowRight, CheckCircle2, MessageCircle } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const whatsappUrl = "https://wa.me/923442904339?text=Hello%20Tahir%20Autos%2C%20I%20would%20like%20to%20inquire%20about%20vehicle%20inspection%20and%20service.";

  return (
    <section className="relative overflow-hidden py-16 sm:py-24 border-b border-slate-800 bg-slate-900">
      {/* Mobile Background: Image with Orange Audi & Ferris Wheel */}
      <div 
        className="block lg:hidden absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none scale-105"
        style={{ 
          backgroundImage: "url('/assets/aistudio/d3cc330369dd46e1bb1f612a25856249_3be85695.jpeg')" 
        }} 
      />

      {/* Desktop Background: Supercar on track */}
      <div 
        className="hidden lg:block absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none scale-105"
        style={{ 
          backgroundImage: "url('/assets/aistudio/images__3__a82373d8.jfif')" 
        }} 
      />

      {/* Opacity of Blackness Overlay (Subtle, balanced shading for text readability) */}
      <div className="absolute inset-0 bg-black/45 via-black/40 to-black/35 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/70 via-slate-950/50 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Exact Text with High Contrast Typography */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Eyebrow Text */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 backdrop-blur-md border border-slate-700/80 text-xs font-mono font-bold text-amber-300 shadow-lg">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
              <span>AUTOMOTIVE EXPERTISE • DIAGNOSTICS • TRAINING</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-[1.1] text-balance drop-shadow-xl">
              Precision in Every Diagnosis. <br />
              <span className="bg-gradient-to-r from-orange-400 via-amber-400 to-sky-400 bg-clip-text text-transparent drop-shadow-sm">
                Excellence in Every Drive.
              </span>
            </h1>

            {/* Sub-headline / Paragraph */}
            <p className="text-base sm:text-lg text-slate-100 max-w-xl leading-relaxed drop-shadow-md font-medium">
              Professional automotive diagnostics, expert technical solutions, and hands-on workshop training — driven by precision, performance, and a passion for automotive excellence.
            </p>

            {/* Action Buttons: Contact directly to WhatsApp */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a
                href="#why-choose-us"
                className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-slate-950 font-extrabold text-sm tracking-wide shadow-xl shadow-orange-500/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2"
              >
                <span>Explore Our Services</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-7 py-3.5 rounded-xl bg-transparent hover:bg-white/10 border-2 border-white text-white font-extrabold text-sm transition-all active:translate-y-0 flex items-center gap-2 shadow-sm"
              >
                <MessageCircle className="w-4 h-4 text-white" />
                <span>Contact Us</span>
              </a>
            </div>

            {/* Trust Line */}
            <div className="pt-4 border-t border-slate-400/40">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-100 tracking-wide drop-shadow-md">
                <CheckCircle2 className="w-4 h-4 text-orange-400 shrink-0" />
                <span>Precision • Performance • Professional Expertise</span>
              </div>
            </div>

          </div>

          {/* Right Column: Orange Car PNG (Visible on desktop, hidden on mobile view as requested) */}
          <div className="hidden lg:flex lg:col-span-5 relative items-center justify-center">
            {/* Subtle radial ground glow accent */}
            <div className="absolute w-[360px] h-[180px] bg-gradient-to-r from-orange-500/30 to-amber-500/20 rounded-full blur-3xl pointer-events-none -bottom-4" />

            <div className="relative group w-full max-w-[500px]">
              <img
                src="/assets/aistudio/Vibrant-Orange-Car-Showcasing-Modern-Design-PNG_581b39a1.png"
                alt="Tahir Autos Modern Performance Vehicle"
                className="w-full h-auto object-contain filter drop-shadow-[0_20px_30px_rgba(0,0,0,0.65)] group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
