const T = [
  {
    q: "Atibha found us a Lutyens bungalow not even on the market. The discretion and access they commanded was extraordinary.",
    n: "Suresh R.",
    t: "Industrialist, Delhi",
    s: 5,
  },
  {
    q: "As an NRI investing from Singapore, I was nervous. Atibha's advisory desk made the entire process seamless and reassuring.",
    n: "Anita M.",
    t: "NRI Investor, Singapore",
    s: 5,
  },
  {
    q: "The Oberoi Sky Gardens penthouse exceeded every expectation. Rajiv's team negotiated brilliantly through every step.",
    n: "Karan S.",
    t: "Entrepreneur, Mumbai",
    s: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="w-full py-12 sm:py-16 md:py-20 bg-cream-dark">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* HEADER */}
        <div className="flex flex-col items-center text-center mb-8 sm:mb-12">

          {/* Client Voices */}
          <div className="reveal flex flex-col items-start mb-4">

            <div className="text-lg md:text-xl tracking-wide font-semibold text-gold w-full text-center">
              Client Voices
            </div>

            {/* NEW LINE */}
            <div className="text-xs tracking-[0.3em] uppercase text-ink/50 mt-2">
              What Our Company Says About Us
            </div>

          </div>

          {/* MAIN HEADING */}
          <h2 className="font-display text-ink text-3xl sm:text-4xl md:text-5xl leading-tight">
            <div className="block text-white font-normal mb-2">
              What Our Clients{" "}
            </div>
            <em className="text-gold not-italic font-light">
              Say About Us
            </em>
          </h2>

        </div>

        {/* TESTIMONIAL CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 w-full">
          {T.map((t, i) => (
            <div
              key={i}
              className={`reveal reveal-delay-${i + 1} w-full h-full p-3 sm:p-4 md:p-5 border border-gold/12 bg-panel`}
            >
              <div className="w-4 sm:w-6 h-0.5 bg-gold mb-2 sm:mb-3 md:mb-4" />

              <div className="flex gap-0.5 sm:gap-1 mb-2 sm:mb-3 md:mb-4">
                {Array.from({ length: t.s }).map((_, j) => (
                  <span key={j} className="text-gold text-xs sm:text-sm">
                    ★
                  </span>
                ))}
              </div>

              <p className="font-display italic text-sm sm:text-base md:text-lg text-ink/80 leading-relaxed mb-3 sm:mb-4 md:mb-5 font-light">
                "{t.q}"
              </p>

              <div className="border-t border-gold/10 pt-2 sm:pt-3 md:pt-4">
                <div className="font-body font-medium text-sm text-ink">
                  {t.n}
                </div>
                <div className="font-body text-xs text-muted tracking-widest mt-0.5">
                  {t.t}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}