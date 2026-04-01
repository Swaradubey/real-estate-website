const steps = [
  { num: "01", title: "Initial Consultation",  desc: "A private briefing to understand your lifestyle, preferences, budget and timeline. No pressure — just listening." },
  { num: "02", title: "Curated Shortlist",     desc: "We hand-pick 3-5 properties that meet your exact criteria — including off-market opportunities not listed anywhere else." },
  { num: "03", title: "Due Diligence",         desc: "Accompanied visits with our experts, followed by exhaustive legal and structural due diligence on your preferred property." },
  { num: "04", title: "Seamless Closure",      desc: "From negotiation to documentation, registration and handover — we handle every step so you can focus on what matters." },
];

export default function Process() {
  return (
    <section id="process" className="w-full py-12 sm:py-16 md:py-20 bg-ink">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="w-full flex flex-col items-start text-left mb-8 sm:mb-12 reveal">
          <div className="label-tag text-gold/70 mb-3 md:mb-4 text-xs sm:text-sm">How We Work</div>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl text-cream leading-tight">
            A seamless journey<br />
            <em className="text-gold">from search to keys.</em>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full reveal">
        {steps.map((s, i) => (
          <div key={s.num} className="relative p-3 sm:p-4 md:p-5 border border-white/10 hover:border-gold/40 transition-colors group w-full h-full">
            <div className="font-accent text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#D4A437] font-semibold opacity-100 relative z-10 group-hover:text-gold/30 transition-colors mb-2 sm:mb-3 md:mb-4 leading-none">{s.num}</div>
            <h3 className="font-heading text-base sm:text-lg md:text-xl font-semibold text-cream mb-1.5 sm:mb-2 md:mb-3 tracking-tight">{s.title}</h3>
            <p className="font-body text-xs sm:text-sm md:text-base text-cream/60 leading-relaxed sm:leading-8">{s.desc}</p>
            <div className="mt-2 sm:mt-3 md:mt-4 w-4 sm:w-6 h-px bg-gold/30 group-hover:w-10 sm:group-hover:w-14 transition-all duration-500" />
          </div>
        ))}
      </div>
      </div>
    </section>
  );
}
