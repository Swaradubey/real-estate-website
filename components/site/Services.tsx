"use client";
import { useState } from "react";

const services = [
  {
    num: "01",
    title: "Property Advisory",
    desc: "Our team of licensed agents, legal experts and financial advisors works as one unit — ensuring you make the most informed decision every time. Whether you're buying, selling or leasing.",
    tags: ["Residential", "Commercial", "NRI Desk", "Portfolio Review"],
  },
  {
    num: "02",
    title: "Interior & Architecture",
    desc: "From concept to completion, our award-winning design team transforms raw spaces into extraordinary homes. We work with the world's finest artisans to create residences that are truly one-of-a-kind.",
    tags: ["Interior Design", "Architecture", "Renovation", "Landscape"],
  },
  {
    num: "03",
    title: "Investment & Wealth",
    desc: "We operate as one unified team — bringing together property experts, legal advisors and wealth managers to identify high-yield real estate investments across India's premium markets.",
    tags: ["ROI Analysis", "Rental Management", "Portfolio Growth", "Tax Planning"],
  },
  {
    num: "04",
    title: "Legal & Documentation",
    desc: "End-to-end legal support for property transactions. From due diligence to registration, our empanelled lawyers ensure every deal is clean, compliant and protected.",
    tags: ["Due Diligence", "Title Verification", "Registration", "RERA"],
  },
  {
    num: "05",
    title: "Property Management",
    desc: "You're backed by a full team of experts who handle everything post-purchase — maintenance, tenant management, bill payments and periodic inspections — so you can sit back.",
    tags: ["Tenant Management", "Maintenance", "Accounting", "Annual Reports"],
  },
];

export default function Services() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="services" className="w-full bg-ink overflow-hidden">
      {/* Text content section - full width */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start w-full">

          {/* Left: heading */}
          <div className="lg:sticky lg:top-36 reveal-l flex flex-col items-center text-center">
            <div className="font-body text-xs sm:text-sm md:text-base tracking-[0.25em] uppercase text-gold mb-3 md:mb-4">Expertise</div>

            <h2 className=" w-full text-center font-heading text-3xl sm:text-4xl md:text-5xl text-cream leading-tight mb-4">
              Where top-tier quality meets trusted{" "}
              <em className="text-gold">professionals.</em>
            </h2>
            <p className="font-body text-sm sm:text-base text-cream/70 leading-relaxed max-w-md">
              Five decades of combined expertise across India's most demanding real estate markets — at your service.
            </p>
          </div>

          {/* Right: accordion */}
          <div className="space-y-0 reveal-r w-full">
            {services.map((s, i) => (
              <div key={s.num}
                className={`border-b transition-colors ${open === i ? "border-gold/40" : "border-white/10"}`}>
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center gap-2 sm:gap-3 md:gap-4 py-3 sm:py-4 md:py-5 text-left group"
                >
                  <span className="font-accent text-lg sm:text-xl md:text-2xl lg:text-3xl text-[#D4A437] font-semibold opacity-100 relative z-10 leading-none w-6 sm:w-8 md:w-10 shrink-0">
                    {s.num}
                  </span>
                  <h3 className="font-heading text-sm sm:text-base md:text-lg text-cream group-hover:text-gold transition-colors flex-1">
                    {s.title}
                  </h3>
                  <span className={`text-gold text-base sm:text-lg transition-transform duration-300 ${open === i ? "rotate-45" : "rotate-0"}`}>+</span>
                </button>
                <div className={`overflow-hidden transition-all duration-400 ${open === i ? "max-h-96 pb-3 sm:pb-4 md:pb-5" : "max-h-0"}`}>
                  <p className={`font-body text-xs sm:text-sm text-cream/60 leading-relaxed mb-2 sm:mb-3 md:mb-4 pl-6 sm:pl-8 md:pl-[56px] pr-2`}>{s.desc}</p>
                  <div className="flex flex-wrap gap-1 sm:gap-1.5 md:gap-2 pl-6 sm:pl-8 md:pl-[56px] pr-2">
                    {s.tags.map(t => (
                      <span key={t} className="font-body text-[7px] sm:text-[8px] md:text-xs tracking-widest uppercase text-gold border border-gold/30 px-1.5 sm:px-2 md:px-3 py-0.5 sm:py-1">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Full-width image section - breaks out of container */}
      <div className="relative w-screen left-1/2 right-1/2 -mx-[50vw] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=80"
          alt="Luxury Interior"
          className="w-full h-[200px] sm:h-[280px] md:h-[350px] lg:h-[450px] object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 w-full px-3 sm:px-4 md:px-6 lg:px-12 py-3 sm:py-4 md:py-6">
          <div className="font-body text-[8px] sm:text-xs text-gold tracking-widest uppercase mb-1">© 1990 — 2025</div>
          <div className="font-heading text-sm sm:text-base md:text-lg text-cream italic">Atibha Realty Group</div>
        </div>
      </div>
    </section>
  );
}
