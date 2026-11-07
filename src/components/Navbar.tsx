import React, { useState, useEffect } from 'react';
import { X, PhoneCall, MessageCircle, ArrowRight, MapPin } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const whatsappUrl = "https://wa.me/923442904339?text=Hello%20Tahir%20Autos%2C%20I%20would%20like%20to%20inquire%20about%20vehicle%20service.";

  const navLinks = [
    { label: 'Home', href: '#' },
    { label: 'About Us', href: '#about' },
    { label: 'Why Choose Us', href: '#why-choose-us' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'How We Work', href: '#how-we-work' },
    { label: 'Location', href: '#location' },
  ];

  // Prevent background scrolling when full-page mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-6">
        
        {/* Brand Zone */}
        <a href="#" className="flex items-center gap-3 whitespace-nowrap shrink-0 group">
          <div className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center p-0">
            <img
              src="/assets/aistudio/Tahir_Autos_Gear_Logo_15edc8b7.png"
              alt="Tahir Autos"
              className="w-full h-full object-contain filter drop-shadow-sm group-hover:scale-105 transition-transform"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-950 flex items-center gap-1.5 leading-tight">
              <span>TAHIR</span>
              <span className="bg-gradient-to-r from-orange-500 to-sky-600 bg-clip-text text-transparent">AUTOS</span>
            </span>
            <span className="text-[9.5px] sm:text-[10px] uppercase font-mono font-bold tracking-widest text-slate-500 mt-0.5">
              Expertise · Diagnostics · Solutions
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold text-slate-700">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:text-orange-600 transition-colors whitespace-nowrap shrink-0"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Primary CTA + Phone */}
        <div className="hidden sm:flex items-center gap-4 shrink-0">
          <a 
            href="tel:+923442904339" 
            className="flex items-center gap-2 text-xs font-mono font-bold text-slate-700 hover:text-orange-600 transition-colors"
          >
            <PhoneCall className="w-3.5 h-3.5 text-orange-500" />
            <span>+92 344 2904339</span>
          </a>
          
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-slate-950 font-bold text-xs tracking-wide shadow-md shadow-orange-500/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap shrink-0 flex items-center gap-1.5"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-slate-950 stroke-none" />
            <span>Contact Us</span>
          </a>
        </div>

        {/* Mobile View: 3 Horizontal Lines */}
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="lg:hidden flex flex-col justify-center items-center w-11 h-11 gap-1.5 p-2 rounded-2xl text-slate-800 hover:text-slate-950 hover:bg-slate-100 focus:outline-none transition-colors border border-slate-200"
          aria-label="Open navigation menu"
        >
          <span className="w-6 h-0.5 bg-slate-800 rounded-full transition-all"></span>
          <span className="w-6 h-0.5 bg-slate-800 rounded-full transition-all"></span>
          <span className="w-6 h-0.5 bg-slate-800 rounded-full transition-all"></span>
        </button>
      </div>

      {/* Full-Page Mobile Hamburger Menu (Opens and Covers Full Page from Right) */}
      <div 
        className={`fixed inset-0 w-full h-full bg-white z-50 flex flex-col justify-between p-6 sm:p-8 overflow-y-auto lg:hidden transition-transform duration-300 ease-out ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div>
          {/* Top Bar inside Full-Page Menu */}
          <div className="flex items-center justify-between pb-6 border-b border-slate-200">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 flex items-center justify-center">
                <img
                  src="/assets/aistudio/Tahir_Autos_Gear_Logo_15edc8b7.png"
                  alt="Tahir Autos"
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <span className="font-black text-slate-950 text-xl block leading-tight">TAHIR AUTOS</span>
                <span className="text-[11px] text-slate-500 font-mono">Block 6, PECHS, Karachi</span>
              </div>
            </div>

            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-3 rounded-2xl bg-slate-100 text-slate-600 hover:text-slate-950 hover:bg-slate-200 transition-colors"
              aria-label="Close navigation"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Full-Width Navigation Links */}
          <nav className="mt-8 flex flex-col divide-y divide-slate-100">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-4 text-xl sm:text-2xl font-black text-slate-900 hover:text-orange-600 flex items-center justify-between transition-colors group"
              >
                <span>{link.label}</span>
                <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-orange-500 transform group-hover:translate-x-1 transition-all" />
              </a>
            ))}
          </nav>
        </div>

        {/* Full-Page Menu Footer Actions */}
        <div className="pt-8 border-t border-slate-200 space-y-4">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileMenuOpen(false)}
            className="w-full py-4 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-extrabold text-base tracking-wide shadow-lg shadow-emerald-500/20 text-center flex items-center justify-center gap-2.5 transition-colors"
          >
            <MessageCircle className="w-5 h-5 fill-white stroke-none" />
            <span>Chat on WhatsApp (+92 344 2904339)</span>
          </a>

          <a 
            href="tel:+923442904339" 
            className="w-full py-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold text-sm text-center flex items-center justify-center gap-2 transition-colors"
          >
            <PhoneCall className="w-4 h-4 text-orange-500" />
            <span>Call: +92 344 2904339</span>
          </a>

          <div className="flex items-center justify-center gap-2 text-xs text-slate-400 font-mono pt-2">
            <MapPin className="w-3.5 h-3.5 text-orange-500 shrink-0" />
            <span>Block 6, PECHS, e market, Karachi, Pakistan</span>
          </div>
        </div>
      </div>
    </header>
  );
};
