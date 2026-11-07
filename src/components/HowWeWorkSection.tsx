import React from 'react';
import { Search, Cpu, Wrench, CheckCircle2, MessageCircle } from 'lucide-react';

export const HowWeWorkSection: React.FC = () => {
  const whatsappUrl = "https://wa.me/923442904339?text=Hello%20Tahir%20Autos%2C%20I%20would%20like%20to%20schedule%20a%20vehicle%20inspection%20and%20service.";

  const steps = [
    {
      step: '01',
      title: 'Vehicle Inspection',
      description: "We begin with a complete inspection to understand your vehicle's condition.",
      icon: Search,
      accent: 'orange',
    },
    {
      step: '02',
      title: 'Accurate Diagnosis',
      description: 'Modern diagnostic equipment helps us identify the exact issue.',
      icon: Cpu,
      accent: 'blue',
    },
    {
      step: '03',
      title: 'Professional Repair',
      description: 'Our specialists perform repairs using proven techniques.',
      icon: Wrench,
      accent: 'orange',
    },
    {
      step: '04',
      title: 'Quality Testing',
      description: 'Every vehicle is thoroughly tested before delivery.',
      icon: CheckCircle2,
      accent: 'blue',
    },
  ];

  return (
    <section id="how-we-work" className="py-20 sm:py-24 bg-white border-t border-slate-200 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-50 border border-orange-200 text-xs font-mono font-bold uppercase tracking-wider text-orange-700 mb-3">
            <span>Our Proven 4-Step Process</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight text-balance">
            How We Work
          </h2>
          <p className="mt-4 text-slate-600 text-sm sm:text-base leading-relaxed">
            A methodical, transparent, and rigorous standard from initial vehicle check-in to final road test.
          </p>
        </div>

        {/* 4 Process Cards (Clean without step indicators or arrows) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            const isOrange = item.accent === 'orange';

            return (
              <div
                key={idx}
                className="group relative bg-slate-50 hover:bg-white border border-slate-200/90 hover:border-orange-500/60 rounded-3xl p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 hover:shadow-xl shadow-2xs"
              >
                {/* Step Number Badge & Icon */}
                <div className="flex items-center justify-between mb-6">
                  <span className={`text-3xl sm:text-4xl font-black font-mono tracking-tight transition-colors ${
                    isOrange 
                      ? 'text-orange-500 group-hover:text-orange-600' 
                      : 'text-sky-600 group-hover:text-sky-700'
                  }`}>
                    {item.step}
                  </span>

                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border transition-all duration-300 transform group-hover:scale-110 ${
                    isOrange 
                      ? 'bg-orange-100/80 border-orange-200 text-orange-600 group-hover:bg-orange-500 group-hover:text-white' 
                      : 'bg-sky-100/80 border-sky-200 text-sky-600 group-hover:bg-sky-600 group-hover:text-white'
                  }`}>
                    <Icon className="w-6 h-6" />
                  </div>
                </div>

                {/* Content */}
                <div>
                  <h3 className="text-xl font-bold text-slate-950 tracking-tight mb-2.5 group-hover:text-orange-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* WhatsApp Consultation Action Bar */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-slate-50 border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div>
            <h4 className="text-xl font-bold text-slate-950">
              Have Questions About Your Car's Symptoms?
            </h4>
            <p className="mt-1 text-sm text-slate-600">
              Message our technical team directly on WhatsApp for prompt guidance and scheduling.
            </p>
          </div>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-extrabold text-sm tracking-wide shadow-md transition-all transform hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap shrink-0 flex items-center gap-2"
          >
            <MessageCircle className="w-4 h-4 fill-white stroke-none" />
            <span>Chat on WhatsApp (+92 344 2904339)</span>
          </a>
        </div>

      </div>
    </section>
  );
};
