import React from 'react';

export const MapLocationSection: React.FC = () => {
  const mapEmbedUrl = "https://maps.google.com/maps?q=V337%2B89+PECHS+Karachi+Pakistan&t=&z=16&ie=UTF8&iwloc=&output=embed";

  return (
    <section 
      id="location" 
      className="py-16 sm:py-24 bg-gradient-to-br from-orange-500 via-orange-600 to-[#b43403] text-white relative overflow-hidden border-t border-orange-600/30 shadow-inner"
    >
      {/* Background ambient lighting accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-400/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/20 border border-white/20 text-xs font-mono font-bold uppercase tracking-widest text-amber-200 backdrop-blur-xs mb-3 shadow-xs">
            <span>Workshop Location</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight drop-shadow-md">
            Visit Tahir Autos
          </h2>
          <p className="mt-3 text-orange-100 text-sm sm:text-base font-medium max-w-xl mx-auto leading-relaxed">
            Conveniently located at Block 6, PECHS, Karachi. Modern workshop facilities with dedicated customer parking and computerized diagnostic bays.
          </p>
        </div>

        {/* Clean Interactive Google Map Frame */}
        <div className="w-full rounded-3xl overflow-hidden border-2 border-white/25 shadow-2xl bg-black/25 backdrop-blur-xs h-[420px] sm:h-[480px]">
          <iframe
            title="Tahir Autos Location"
            src={mapEmbedUrl}
            className="w-full h-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

      </div>
    </section>
  );
};
