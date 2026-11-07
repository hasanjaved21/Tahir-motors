import React, { useState, useEffect, useRef } from 'react';
import { PhoneCall, MessageCircle, ArrowRight } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const whatsappUrl = "https://wa.me/923442904339?text=Hello%20Tahir%20Autos%2C%20I%20would%20like%20to%20inquire%20about%20vehicle%20service.";

  const navLinks = [
    { label: 'Home', href: '#' },
    { label: 'About Us', href: '#about' },
    { label: 'Why Choose Us', href: '#why-choose-us' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'How We Work', href: '#how-we-work' },
    { label: 'Location', href: '#location' },
  ];

  // Close menu on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Close menu on click outside header
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <>
      {/* Background Dimmer with smooth fade animation */}
      <div 
        className={`fixed inset-0 bg-slate-950/40 z-40 lg:hidden transition-opacity duration-300 ease-in-out ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
      />

      <header 
        ref={headerRef} 
        className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm w-full"
      >
        {/* Top Header Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-2 sm:gap-6">
          
          {/* Brand Zone: Logo + Name + Tagline */}
          <a 
            href="#" 
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-2.5 sm:gap-3 whitespace-nowrap shrink-0 group focus:outline-none"
          >
            <div className="w-10 h-10 sm:w-13 sm:h-13 shrink-0 flex items-center justify-center p-0">
              <img
                src="/assets/aistudio/Tahir_Autos_Gear_Logo_15edc8b7.png"
                alt="Tahir Autos"
                className="w-full h-full object-contain filter drop-shadow-sm group-hover:scale-105 transition-transform"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-lg sm:text-2xl font-black tracking-tight text-slate-950 flex items-center gap-1 sm:gap-1.5 leading-tight">
                <span>TAHIR</span>
                <span className="bg-gradient-to-r from-orange-500 to-sky-600 bg-clip-text text-transparent">AUTOS</span>
              </span>
              <span className="text-[8.5px] sm:text-[10px] uppercase font-mono font-bold tracking-wider sm:tracking-widest text-slate-500 mt-0.5 leading-none">
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

          {/* Desktop Primary CTA + Phone */}
          <div className="hidden lg:flex items-center gap-4 shrink-0">
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

          {/* Mobile Animated Hamburger Button (Morphs into X on click) */}
          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            className="lg:hidden w-11 h-11 flex items-center justify-center rounded-2xl text-slate-800 hover:text-slate-950 hover:bg-slate-100 active:bg-slate-200 transition-colors focus:outline-none border border-slate-200 shrink-0"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
          >
            <div className="w-5 h-4 flex flex-col justify-between relative" aria-hidden="true">
              <span 
                className={`w-full h-0.5 bg-slate-900 rounded-full transition-all duration-300 origin-center ${
                  menuOpen ? 'rotate-45 translate-y-[7px]' : ''
                }`} 
              />
              <span 
                className={`w-full h-0.5 bg-slate-900 rounded-full transition-all duration-300 ${
                  menuOpen ? 'opacity-0 scale-x-0' : 'opacity-100'
                }`} 
              />
              <span 
                className={`w-full h-0.5 bg-slate-900 rounded-full transition-all duration-300 origin-center ${
                  menuOpen ? '-rotate-45 -translate-y-[7px]' : ''
                }`} 
              />
            </div>
          </button>
        </div>

        {/* Mobile Navigation Menu Panel with smooth opening and closing accordion animation */}
        <div 
          id="mobile-nav-panel"
          className={`grid lg:hidden transition-all duration-300 ease-in-out border-slate-200 shadow-2xl bg-white w-full ${
            menuOpen 
              ? 'grid-rows-[1fr] opacity-100 border-t' 
              : 'grid-rows-[0fr] opacity-0 border-t-0 pointer-events-none'
          }`}
        >
          <div className="overflow-hidden">
            <div className="max-w-md mx-auto px-4 sm:px-6 py-5 flex flex-col space-y-4 max-h-[calc(100vh-5rem)] overflow-y-auto">
              
              {/* Vertical Navigation Links */}
              <nav className="flex flex-col space-y-1">
                <span className="text-[10px] font-mono uppercase font-bold tracking-widest text-slate-400 px-3 pb-1">
                  Menu Links
                </span>
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center justify-between px-3.5 py-3 rounded-xl text-slate-900 hover:text-orange-600 hover:bg-orange-50 active:bg-orange-100 font-bold text-base transition-colors group"
                  >
                    <span className="flex items-center gap-2.5">
                      <span className="w-2 h-2 rounded-full bg-orange-500 group-hover:scale-125 transition-transform" />
                      <span>{link.label}</span>
                    </span>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-orange-500 transform group-hover:translate-x-1 transition-all" />
                  </a>
                ))}
              </nav>

              {/* Action Zone: WhatsApp only (Call and Location address removed per user request) */}
              <div className="pt-3 border-t border-slate-200">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMenuOpen(false)}
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-slate-950 font-extrabold text-sm tracking-wide shadow-md shadow-orange-500/20 text-center flex items-center justify-center gap-2 transition-all active:scale-[0.99]"
                >
                  <MessageCircle className="w-4 h-4 fill-slate-950 stroke-none" />
                  <span>Chat on WhatsApp (+92 344 2904339)</span>
                </a>
              </div>

            </div>
          </div>
        </div>
      </header>
    </>
  );
};
