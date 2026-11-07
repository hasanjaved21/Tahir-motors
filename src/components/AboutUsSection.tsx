import React from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck, Wrench, MessageCircle } from 'lucide-react';

export const AboutUsSection: React.FC = () => {
  const whatsappUrl = "https://wa.me/923442904339?text=Hello%20Tahir%20Autos%2C%20I%20would%20like%20to%20learn%20more%20about%20your%20automotive%20services.";

  return (
    <section id="about" className="py-20 sm:py-24 bg-white border-t border-slate-200 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* Left Column: Exact Required Information */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-50 border border-orange-200 text-xs font-mono font-bold uppercase tracking-wider text-orange-700">
              <Wrench className="w-3.5 h-3.5 text-orange-600" />
              <span>About Us</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight leading-tight">
              Reliable Automotive Solutions Through Advanced Diagnostics
            </h2>

            <div className="space-y-4 text-slate-600 text-base sm:text-lg leading-relaxed">
              <p>
                <strong className="text-slate-900 font-bold">TAHIR AUTOS</strong> is committed to delivering reliable automotive solutions through advanced diagnostics, and professional expertise. With years of hands-on experience, we improve performance, and maintain long-term reliability.
              </p>
              
              <p>
                Our passion for precision and continuous learning allows us to provide services while building lasting relationships with our customers.
              </p>
            </div>

            {/* Value Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-2.5 text-sm font-semibold text-slate-800">
                <CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0" />
                <span>Advanced Diagnostics</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm font-semibold text-slate-800">
                <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" />
                <span>Professional Expertise</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm font-semibold text-slate-800">
                <CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0" />
                <span>Long-Term Reliability</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm font-semibold text-slate-800">
                <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" />
                <span>Lasting Customer Relationships</span>
              </div>
            </div>

            <div className="pt-4 flex items-center gap-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-slate-950 font-extrabold text-sm tracking-wide shadow-md transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4 fill-slate-950 stroke-none" />
                <span>Contact Our Workshop</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right Column: Attached Picture (Toyota Corolla Hatchback) */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden border border-slate-200/90 bg-slate-50 shadow-xl group">
              <div className="aspect-[4/3] w-full overflow-hidden bg-slate-100 flex items-center justify-center">
                <img
                  src="/assets/aistudio/2021-Toyota-Corolla-Hatchback-SE-Nightshade-3-scaled__1__e8fd83e9.png"
                  alt="Tahir Autos Vehicle Servicing"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Bottom Subtle Overlay Badge */}
              <div className="p-4 sm:p-5 bg-white border-t border-slate-200 flex items-center justify-between">
                <div>
                  <span className="text-sm font-bold text-slate-900 block">
                    Precision Mechanical Care
                  </span>
                  <span className="text-xs text-slate-500 font-mono">
                    Tahir Autos · PECHS Karachi
                  </span>
                </div>

                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Quality Guaranteed</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
