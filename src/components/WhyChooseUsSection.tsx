import React from 'react';
import { Cpu, Award, ShieldCheck, HeartHandshake, Zap, ArrowRight, MessageCircle } from 'lucide-react';

interface FeatureCard {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  accent: 'orange' | 'blue';
}

const cardsData: FeatureCard[] = [
  {
    title: 'Accurate Diagnostics',
    description: 'We use modern diagnostic techniques to identify vehicle problems quickly and accurately.',
    icon: Cpu,
    accent: 'orange',
  },
  {
    title: 'Experienced Professionals',
    description: 'Our expertise ensures quality workmanship on every vehicle.',
    icon: Award,
    accent: 'blue',
  },
  {
    title: 'Honest Service',
    description: 'Clear explanations, fair recommendations, and transparent communication.',
    icon: ShieldCheck,
    accent: 'orange',
  },
  {
    title: 'Customer Satisfaction',
    description: 'Your safety, reliability, and peace of mind are always our priority.',
    icon: HeartHandshake,
    accent: 'blue',
  },
];

export const WhyChooseUsSection: React.FC = () => {
  const whatsappUrl = "https://wa.me/923442904339?text=Hello%20Tahir%20Autos%2C%20I%20would%20like%20to%20consult%20with%20your%20technical%20team.";

  return (
    <section id="why-choose-us" className="py-20 sm:py-24 bg-slate-50/70 border-t border-slate-200 relative overflow-hidden">
      {/* Background Ambience Accent */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-orange-400/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-sky-400/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100/80 border border-orange-200/80 text-xs font-mono font-bold uppercase tracking-wider text-orange-800 mb-3">
            <Zap className="w-3.5 h-3.5 text-orange-600" />
            <span>Our Commitment To You</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight text-balance">
            Why Choose Us
          </h2>
          <p className="mt-4 text-slate-600 text-sm sm:text-base leading-relaxed">
            Discover what sets Tahir Autos apart — delivering precision automotive care with integrity, speed, and genuine dedication.
          </p>
        </div>

        {/* The 4 Exact Feature Cards with Hover Effects */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {cardsData.map((item, index) => {
            const Icon = item.icon;
            const isOrange = item.accent === 'orange';

            return (
              <a
                key={index}
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative bg-white border border-slate-200 rounded-3xl p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-orange-500/60 cursor-pointer overflow-hidden shadow-xs"
              >
                {/* Glowing Top Accent Bar Revealed on Hover */}
                <div 
                  className={`absolute top-0 left-0 right-0 h-1.5 transition-all duration-300 ${
                    isOrange 
                      ? 'bg-gradient-to-r from-orange-500 to-amber-400 opacity-0 group-hover:opacity-100' 
                      : 'bg-gradient-to-r from-sky-500 to-blue-600 opacity-0 group-hover:opacity-100'
                  }`}
                />

                <div>
                  {/* Icon */}
                  <div 
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 transform group-hover:scale-110 ${
                      isOrange 
                        ? 'bg-orange-50 text-orange-600 border border-orange-200/70 group-hover:bg-orange-500 group-hover:text-white group-hover:shadow-lg group-hover:shadow-orange-500/25' 
                        : 'bg-sky-50 text-sky-600 border border-sky-200/70 group-hover:bg-sky-600 group-hover:text-white group-hover:shadow-lg group-hover:shadow-sky-500/25'
                    }`}
                  >
                    <Icon className="w-7 h-7 transition-transform duration-300 group-hover:rotate-6" />
                  </div>

                  {/* Card Title */}
                  <h3 className="text-xl font-bold text-slate-950 tracking-tight group-hover:text-orange-600 transition-colors">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-3 text-sm text-slate-600 leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>

                {/* Subtle Bottom Accent */}
                <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-400 group-hover:text-orange-600 transition-colors">
                  <span className="font-mono text-[11px]">Tahir Autos</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </a>
            );
          })}
        </div>

        {/* Bottom CTA Card */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div>
            <h4 className="text-xl font-bold text-slate-950">
              Ready to Experience The Tahir Autos Difference?
            </h4>
            <p className="mt-1 text-sm text-slate-600">
              Contact our workshop in Block 6, PECHS, Karachi for quick, accurate service.
            </p>
          </div>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-slate-950 font-extrabold text-sm tracking-wide shadow-md transition-all transform hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap shrink-0 flex items-center gap-2"
          >
            <MessageCircle className="w-4 h-4 fill-slate-950 stroke-none" />
            <span>Contact Our Team</span>
          </a>
        </div>

      </div>
    </section>
  );
};
