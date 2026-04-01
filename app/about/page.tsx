import React from "react";
import PageHero from "@/components/site/PageHero";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      
      {/* Hero Section */}
      <PageHero 
        title="Atibha Realty" 
        subtitle="Crafting Extraordinary Living Spaces Since 2003"
        backgroundImage="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1600&q=80"
      />

      {/* Brand Story */}
      <section className="py-24 bg-ink">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="animate-slideInL">
              <span className="text-gold tracking-[0.3em] uppercase text-xs font-body mb-4 block">Our Heritage</span>
              <h2 className="font-heading text-4xl md:text-5xl text-cream mb-8 leading-tight">
                A Legacy of Trust & <br /><i className="text-gold">Architectural Excellence</i>
              </h2>
              <div className="space-y-6 font-body text-cream/70 leading-relaxed">
                <p>
                  Founded in Mumbai in 2003 by Rajiv Khanna, Atibha Realty has grown from a boutique advisory into India's most trusted luxury property group. Our journey began with a simple vision: to redefine luxury living through transparency, expertise, and a commitment to quality.
                </p>
                <p>
                  Today, we manage a portfolio of over ₹3,200 crore across 12 major cities, but our core values remain unchanged. We believe a home is not merely an asset—it is an expression of identity and a sanctuary for generations.
                </p>
              </div>
            </div>
            <div className="relative h-[500px] animate-slideInR">
              <Image 
                src="https://images.unsplash.com/photo-1600210491892-03d34cf018d3?w=800&q=80" 
                alt="Luxury Interior" 
                fill 
                className="object-cover rounded-sm grayscale hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute -bottom-8 -left-8 bg-gold p-8 hidden md:block">
                <p className="font-accent text-4xl text-black">20+</p>
                <p className="text-black text-xs uppercase tracking-widest font-body">Years of Expertise</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-24 bg-ink-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl text-cream mb-4">Our Core Philosophy</h2>
            <div className="w-16 h-[1px] bg-gold mx-auto" />
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                title: "Our Mission",
                desc: "To curate the most exclusive property portfolio in India, providing our clients with unmatched investment opportunities and bespoke living experiences.",
                icon: "M13 10V3L4 14h7v7l9-11h-7z"
              },
              {
                title: "Our Vision",
                desc: "To be the global benchmark for luxury real estate in India, recognized for our architectural innovation, integrity, and client-centric approach.",
                icon: "M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              },
              {
                title: "Our Values",
                desc: "Integrity, Transparency, and Excellence. We operate with the highest ethical standards, ensuring every transaction is handled with absolute clarity.",
                icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              }
            ].map((item, idx) => (
              <div key={idx} className="p-8 border border-white/5 bg-black/20 hover:border-gold/30 transition-all duration-300 group">
                <div className="w-12 h-12 bg-gold/10 flex items-center justify-center mb-6 group-hover:bg-gold transition-colors duration-300">
                  <svg className="w-6 h-6 text-gold group-hover:text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d={item.icon} />
                  </svg>
                </div>
                <h3 className="font-heading text-2xl text-cream mb-4">{item.title}</h3>
                <p className="font-body text-cream/50 leading-relaxed text-sm">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats/Achievements */}
      <section className="py-20 bg-gold">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { n: "₹3,200 Cr", l: "Assets Managed" },
              { n: "1,500+", l: "Happy Families" },
              { n: "12", l: "Prime Cities" },
              { n: "250+", l: "Luxury Projects" },
            ].map((stat, idx) => (
              <div key={idx} className="text-center text-black">
                <p className="font-accent text-3xl md:text-4xl mb-1">{stat.n}</p>
                <p className="font-body text-[10px] uppercase tracking-widest opacity-70">{stat.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-ink">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
              <div className="max-w-2xl">
                <h2 className="font-heading text-4xl text-cream mb-4 italic">The Atibha Experience</h2>
                <p className="font-body text-cream/60">We've refined our process over two decades to ensure your journey from discovery to acquisition is seamless and sophisticated.</p>
              </div>
              <div className="hidden md:block">
                <div className="w-32 h-[1px] bg-gold/30" />
              </div>
           </div>

           <div className="grid md:grid-cols-4 gap-8">
              {[
                { step: "01", title: "Curation", desc: "We handpick properties that meet our rigorous standards for design, location, and investment potential." },
                { step: "02", title: "Consultation", desc: "Private sessions with our expert advisors to understand your lifestyle needs and financial goals." },
                { step: "03", title: "Acquisition", desc: "Seamless legal and financial coordination, managed by our in-house experts for absolute peace of mind." },
                { step: "04", title: "Aftercare", desc: "Bespoke property management and design services to ensure your new home remains a masterpiece." },
              ].map((item, idx) => (
                <div key={idx} className="relative pt-12">
                  <span className="absolute top-0 left-0 font-accent text-6xl text-gold/10">{item.step}</span>
                  <h4 className="font-heading text-xl text-gold mb-3 relative z-10">{item.title}</h4>
                  <p className="font-body text-cream/50 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0">
          <Image 
            src="https://images.unsplash.com/photo-1512915922686-57c11f9ad6b3?w=1600&q=80" 
            alt="Luxury Mansion" 
            fill 
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-heading text-4xl md:text-6xl text-cream mb-8 leading-tight">Your Portfolio Deserves <br /><i className="text-gold">Distinction.</i></h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/properties" className="px-10 py-4 bg-gold text-black font-semibold hover:bg-gold-lt transition-all">
              Explore Properties
            </Link>
            <Link href="/contact" className="px-10 py-4 border border-white/20 text-white font-semibold hover:bg-white/10 transition-all backdrop-blur-sm">
              Contact Advisor
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
