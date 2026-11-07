import React from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutUsSection } from './components/AboutUsSection';
import { WhyChooseUsSection } from './components/WhyChooseUsSection';
import { HowWeWorkSection } from './components/HowWeWorkSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { MapLocationSection } from './components/MapLocationSection';
import { Footer } from './components/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';
import { PhoneCall, MessageCircle } from 'lucide-react';

export default function App() {
  const whatsappUrl = "https://wa.me/923442904339?text=Hello%20Tahir%20Autos%2C%20I%20would%20like%20to%20schedule%20an%20inspection%20for%20my%20vehicle.";

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans selection:bg-orange-500 selection:text-white">
      {/* 1. Top Bar Navigation with Smooth Sliding Mobile Menu & Direct WhatsApp Contact */}
      <Navbar />

      {/* 2. Main Content */}
      <main className="flex-1">
        {/* Hero Section with Vibrant Orange Car PNG & reduced blackness opacity */}
        <HeroSection />

        {/* About Us Section (with Toyota Corolla image on right) */}
        <AboutUsSection />

        {/* Why Choose Us Section (4 Exact Cards with Interactive Hover Effects) */}
        <WhyChooseUsSection />

        {/* Clients Testimonial (Dark Blue Gradient, Auto-Swipe & Finger-Swipe) */}
        <TestimonialsSection />

        {/* How We Work Section (Added after Testimonials: 01 Inspection, 02 Diagnosis, 03 Repair, 04 Quality Testing) */}
        <HowWeWorkSection />

        {/* Google Map Location (Clean Map for V337+89 PECHS, Karachi) */}
        <MapLocationSection />

        {/* Pre-Footer Action Banner with Direct WhatsApp Connection */}
        <section className="py-16 sm:py-20 bg-gradient-to-r from-orange-50 via-white to-sky-50 border-t border-slate-200 relative overflow-hidden">
          <div className="max-w-5xl mx-auto px-4 text-center relative z-10 space-y-5">
            <span className="text-xs font-mono uppercase tracking-widest text-orange-600 font-bold">
              Automotive Expertise · Diagnostics · Care
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight">
              Ready to Experience The Tahir Autos Difference?
            </h2>
            <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              Contact our workshop in Block 6, PECHS, Karachi. Receive transparent mechanical advice, modern diagnostics, and dedicated customer care.
            </p>
            <div className="pt-2 flex flex-wrap justify-center gap-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-slate-950 font-extrabold text-sm tracking-wide shadow-lg shadow-orange-500/25 transition-all transform hover:-translate-y-0.5 flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4 fill-slate-950 stroke-none" />
                <span>Message on WhatsApp</span>
              </a>
              <a
                href="tel:+923442904339"
                className="px-7 py-3.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-900 font-bold text-sm transition-all flex items-center gap-2 shadow-xs hover:border-slate-400"
              >
                <PhoneCall className="w-4 h-4 text-orange-500" />
                <span>Call +92 344 2904339</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* 3. Footer */}
      <Footer />

      {/* 4. Floating WhatsApp Button on bottom-right */}
      <WhatsAppButton />
    </div>
  );
}
