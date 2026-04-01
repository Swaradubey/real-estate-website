import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative w-full min-h-screen flex flex-col bg-ink overflow-x-hidden"
    >
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1800&q=85"
          alt="Atibha Realty Hero"
          fill
          className="object-cover opacity-[0.4]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/90 via-ink/35 to-ink/95" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.5)_100%)]" />

        {/* Architectural grid lines */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "linear-gradient(#C4973F 1px, transparent 1px), linear-gradient(90deg, #C4973F 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      {/* Ghost year watermark */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 font-accent text-[18vw] leading-none text-white/[0.03] select-none pointer-events-none pr-4 sm:pr-8 hidden sm:block">
        2003
      </div>

      {/* Main content */}
      <div className="relative flex-1 flex flex-col justify-center pt-4 pb-12 sm:pb-16 md:pb-20 w-full max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="w-full mt-2 sm:mt-2 md:mt-4 mb-8 sm:mb-12 px-4 sm:px-0 flex flex-col items-center">
          <h1 className="font-heading animate-fadeUp w-full flex flex-col items-center text-center gap-1.5 sm:gap-2 drop-shadow-xl">
            <span className="block text-[42px] sm:text-[52px] md:text-[72px] lg:text-[82px] text-white/95 leading-[1.1] tracking-[-0.01em]">
              Properties
            </span>
            <span className="block text-[42px] sm:text-[52px] md:text-[72px] lg:text-[82px] text-gold leading-[1.1] tracking-[-0.01em] drop-shadow-[0_4px_20px_rgba(196,151,63,0.3)]">
              That Define
            </span>
            <span className="block text-[42px] sm:text-[52px] md:text-[72px] lg:text-[82px] text-white/95 leading-[1.1] tracking-[-0.01em] whitespace-nowrap">
              Your Legacy.
            </span>
          </h1>

          {/* Subheading */}
          <p
            className="mt-14 sm:mt-4 text-center text-[13px] sm:text-[14px] md:text-[16px] text-[#F4F4F0]/85 tracking-[0.06em] leading-relaxed max-w-[280px] sm:max-w-[420px] md:max-w-[500px] mx-auto font-light animate-fadeUp opacity-0"
            style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}
          >
            Curated residences, landmark, and timeless spaces for discerning buyers.
          </p>
        </div>

        {/* Buttons */}
        <div className="w-full px-4 sm:px-[25px] mt-0 sm:mt-1 flex justify-center pb-6">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full sm:w-auto">
            <Link
              href="#properties"
              className="w-full sm:w-[220px] max-w-[260px] h-[42px] sm:h-[46px] flex items-center justify-center bg-[#C4973F] text-black text-[11px] sm:text-xs font-bold tracking-[0.16em] uppercase transition-all duration-500 hover:bg-[#D4AF37] hover:shadow-[0_0_25px_-5px_rgba(196,151,63,0.5)] hover:-translate-y-0.5"
            >
              Explore Properties
            </Link>

            <Link
              href="#about"
              className="w-full sm:w-[220px] max-w-[260px] h-[42px] sm:h-[46px] flex items-center justify-center bg-transparent backdrop-blur-md text-[#C4973F] text-[11px] sm:text-xs font-bold tracking-[0.16em] uppercase border border-[#C4973F]/40 transition-all duration-500 hover:border-[#C4973F]/90 hover:bg-[#C4973F]/10 hover:-translate-y-0.5 hover:shadow-[0_0_25px_-5px_rgba(196,151,63,0.2)]"
            >
              Our Story
            </Link>
          </div>
        </div>
      </div>

      {/* Stats bar */}

      <div className="relative border-t border-white/10 bg-ink/80 backdrop-blur-sm w-full py-3">
        <div className="grid grid-cols-3 w-full px-2 gap-2 items-start text-center">
          <div className="flex flex-col items-center justify-start text-center">
            <h2 className="font-heading text-sm sm:text-lg md:text-xl lg:text-2xl text-gold italic whitespace-nowrap">
              1,500+
            </h2>
            <p className="text-[9px] sm:text-[10px] tracking-[0.08em] text-cream/60 whitespace-nowrap">
              HAPPY FAMILIES
            </p>
          </div>

          <div className="flex flex-col items-center justify-start text-center">
            <h2 className="font-heading text-sm sm:text-lg md:text-xl lg:text-2xl text-gold italic whitespace-nowrap">
              12
            </h2>
            <p className="text-[9px] sm:text-[10px] tracking-[0.08em] text-cream/60 whitespace-nowrap">
              CITIES
            </p>
          </div>

          <div className="flex flex-col items-center justify-start text-center">
            <h2 className="font-heading text-sm sm:text-lg md:text-xl lg:text-2xl text-gold italic whitespace-nowrap">
              ₹3.2K Cr
            </h2>
            <p className="text-[9px] sm:text-[10px] tracking-[0.08em] text-cream/60 whitespace-nowrap">
              PORTFOLIO
            </p>
          </div>
        </div>
      </div>
      {/* Scroll indicator */}
      <div className="absolute bottom-16 sm:bottom-20 md:bottom-24 right-2 sm:right-4 md:right-8 hidden md:flex flex-col items-center gap-2">
        <span className="text-[8px] tracking-[0.3em] uppercase text-cream/30 -rotate-90">
          Scroll
        </span>
        <div className="w-px h-10 bg-gradient-to-b from-transparent to-gold/60" />
      </div>
    </section >
  );
}