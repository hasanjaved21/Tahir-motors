import React from 'react';
import { MessageCircle } from 'lucide-react';

export const WhatsAppButton: React.FC = () => {
  const whatsappUrl = "https://wa.me/923442904339?text=Hello%20Tahir%20Autos%2C%20I%20would%20like%20to%20inquire%20about%20vehicle%20inspection%20and%20service.";

  return (
    <aside aria-label="WhatsApp Contact" className="fixed bottom-6 right-6 z-40 flex items-center group">
      {/* Label Tooltip shown on hover / desktop */}
      <span className="hidden sm:inline-block mr-3 px-3.5 py-1.5 rounded-full bg-slate-900/90 text-white text-xs font-semibold shadow-lg border border-slate-700 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
        Chat on WhatsApp (+92 344 2904339)
      </span>

      {/* Pulsing Ripple Effect */}
      <div className="relative">
        <span className="absolute -inset-1 rounded-full bg-emerald-500/40 animate-ping pointer-events-none" />
        
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="relative w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white flex items-center justify-center shadow-2xl transition-all duration-300 transform group-hover:scale-110 active:scale-95"
          aria-label="Contact Tahir Autos on WhatsApp at +92 344 2904339"
        >
          <MessageCircle className="w-7 h-7 fill-white stroke-none" />
        </a>
      </div>
    </aside>
  );
};
