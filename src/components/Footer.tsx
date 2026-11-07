import React from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  MessageCircle,
  Share2
} from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-800">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        
        {/* Brand Column with Logo & Social Links */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-xl overflow-hidden p-0.5 bg-slate-900 border border-slate-800 shadow-md flex items-center justify-center">
              <img
                src="/assets/aistudio/Tahir_Autos_Gear_Logo_15edc8b7.png"
                alt="Tahir Autos Logo"
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <span className="text-xl font-black text-white tracking-tight flex items-center gap-1">
                <span>TAHIR</span>
                <span className="bg-gradient-to-r from-orange-400 to-sky-400 bg-clip-text text-transparent">AUTOS</span>
              </span>
              <span className="text-[10px] text-slate-400 uppercase font-mono block">
                PECHS, Karachi · Est. 1999
              </span>
            </div>
          </div>

          <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
            Delivering reliable automotive solutions through advanced diagnostics, professional expertise, and long-term customer relationships.
          </p>

          {/* Social Media Icons */}
          <div className="pt-2">
            <span className="text-[11px] font-mono uppercase text-slate-400 block mb-2 font-semibold">
              Follow &amp; Connect With Us
            </span>
            <div className="flex items-center gap-2.5">
              {/* Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-blue-600 hover:border-blue-500 transition-colors flex items-center justify-center"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-pink-600 hover:border-pink-500 transition-colors flex items-center justify-center"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>

              {/* YouTube */}
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-red-600 hover:border-red-500 transition-colors flex items-center justify-center"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>

              {/* WhatsApp Direct */}
              <a
                href="https://wa.me/923442904339"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-emerald-600 hover:border-emerald-500 transition-colors flex items-center justify-center"
              >
                <MessageCircle className="w-4 h-4" />
              </a>

              {/* X / Twitter */}
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (Twitter)"
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 hover:border-slate-600 transition-colors flex items-center justify-center"
              >
                <Share2 className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Facility Address & Verified Contacts */}
        <div className="space-y-3">
          <h4 className="font-bold text-white text-xs uppercase font-mono tracking-wider">
            Contact &amp; Location
          </h4>
          <div className="space-y-2.5 text-xs">
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
              <span className="leading-relaxed">
                Block 6, PECHS, e market, Karachi, Pakistan
              </span>
            </div>
            <div className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-sky-400 shrink-0" />
              <a href="tel:+923442904339" className="hover:text-white transition-colors font-mono">
                +92 344 2904339
              </a>
            </div>
            <div className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-amber-400 shrink-0" />
              <a href="mailto:armanfaizkhan@gmail.com" className="hover:text-white transition-colors font-mono">
                armanfaizkhan@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* Quick Navigation Links */}
        <div className="space-y-3">
          <h4 className="font-bold text-white text-xs uppercase font-mono tracking-wider">
            Quick Navigation
          </h4>
          <ul className="space-y-2 text-xs">
            <li><a href="#" className="hover:text-orange-400 transition-colors">Home</a></li>
            <li><a href="#about" className="hover:text-orange-400 transition-colors">About Us</a></li>
            <li><a href="#why-choose-us" className="hover:text-sky-400 transition-colors">Why Choose Us</a></li>
            <li><a href="#how-we-work" className="hover:text-orange-400 transition-colors">How We Work</a></li>
            <li><a href="#location" className="hover:text-sky-400 transition-colors">Workshop Location</a></li>
          </ul>
        </div>

      </div>

      {/* Bottom Copyright */}
      <div className="border-t border-slate-800 py-6 text-slate-400 text-[11px]">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span>&copy; {new Date().getFullYear()} Tahir Autos. Block 6, PECHS, Karachi, Pakistan. All rights reserved.</span>
          <div className="flex items-center gap-4 text-slate-400">
            <a href="mailto:armanfaizkhan@gmail.com" className="hover:text-slate-300">Email: armanfaizkhan@gmail.com</a>
            <span>·</span>
            <a href="tel:+923442904339" className="hover:text-slate-300">+92 344 2904339</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
