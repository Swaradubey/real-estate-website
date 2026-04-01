import Image from "next/image";
import Link from "next/link";

export default function About() {
  return (
    <section id="about" className="py-12 sm:py-16 md:py-20 bg-cream overflow-hidden scroll-mt-20">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">

          {/* Left: Images collage */}
          <div className="relative reveal-l order-2 lg:order-1">
            {/* Main image */}
            <div className="relative h-[200px] sm:h-[280px] md:h-[350px] lg:h-[400px] xl:h-[480px] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=900&q=85"
                alt="Atibha Realty — luxury living"
                fill className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/30 to-transparent" />
            </div>
            {/* Floating small image */}
            <div className="absolute -bottom-2 -right-2 sm:-bottom-4 sm:-right-4 w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 border-2 sm:border-3 md:border-4 border-cream overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=400&q=85"
                alt="Interior detail"
                fill className="object-cover"
              />
            </div>
            {/* Year badge */}
            <div className="absolute top-2 -left-2 sm:top-4 sm:-left-3 md:top-6 md:-left-4 bg-gold px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 shadow-lg">
              <div className="font-accent text-base sm:text-lg md:text-xl lg:text-2xl text-ink leading-none">2003</div>
              <div className="font-body text-[5px] sm:text-[6px] md:text-[7px] tracking-[0.25em] uppercase text-ink/70 mt-0.5">Founded</div>
            </div>
          </div>

          {/* Right: Text */}
          <div className="reveal-r order-1 lg:order-2 flex flex-col items-center text-center w-full">
            <div className="label-tag text-gold text-xs sm:text-sm md:text-base mb-2 sm:mb-3 md:mb-4 text-center mx-auto w-fit">About our company</div>

            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl text-gold leading-tight mb-2 text-center w-full">
              We help you buy, sell & invest
            </h2>
            <span className="gold-line block mt-0 mb-4" />
            <p className="font-body text-xs sm:text-sm md:text-base text-muted leading-relaxed sm:leading-7 mb-4 sm:mb-6 md:mb-8 max-w-2xl mx-auto text-center px-4 sm:px-0">
              Founded in Mumbai in 2003 by Rajiv Khanna, Atibha Realty has grown from a boutique advisory into India's most trusted luxury property group — with over ₹3,200 crore of assets under management across 12 cities.
            </p>
            <p className="font-body text-xs sm:text-sm md:text-base text-muted leading-relaxed sm:leading-7 mb-4 sm:mb-6 md:mb-8 max-w-2xl mx-auto text-center px-4 sm:px-0">
              We believe a home is not merely an asset — it is an expression of who you are. Our team of licensed agents, legal experts and design advisors works as one unit, ensuring every acquisition is made with absolute confidence.
            </p>

            {/* Mini stats */}
            <div className="grid grid-cols-3 items-start w-full border-t border-sand pt-4 mt-2">
              {[
                { n: "1,500+", l: "Happy Families" },
                { n: "12", l: "Cities" },
                { n: "₹3.2K Cr", l: "Portfolio" },
              ].map(s => (
                <div key={s.n} className="flex flex-col items-center justify-center text-center min-w-[70px] sm:min-w-[80px] md:min-w-[90px]">
                  <div className="font-heading text-base sm:text-lg md:text-xl italic text-gold whitespace-nowrap">
                    {s.n}
                  </div>
                  <div className="font-body text-[7px] sm:text-[8px] md:text-xs tracking-[0.12em] sm:tracking-widest uppercase text-muted whitespace-nowrap mt-0.5">
                    {s.l}
                  </div>
                </div>
              ))}
            </div>

            <div className="w-full mt-8">
              <Link href="#contact" className="btn-gold text-sm w-full sm:w-auto inline-flex items-center justify-center px-8 py-3">
                Get in Touch →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section >
  );
}
