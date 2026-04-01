import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 w-full">
      <div className="w-full max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div
          className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 sm:px-6 lg:px-8 py-10 md:py-16 text-center"
        >
          {/* Column 1: Brand */}
          <div>
            <div className="flex flex-col mb-2 sm:mb-3 md:mb-4">
              <span
                className="font-accent tracking-[0.12em] text-cream text-lg sm:text-xl lg:text-2xl"
              >
                ATIBHA
              </span>
              <span
                className="font-body tracking-[0.35em] uppercase text-gold mt-0.5 sm:mt-1 text-xs sm:text-sm"
              >
                Realty · Est. 2003
              </span>
            </div>
            <p
              className="font-body text-cream/60 mb-3 sm:mb-4 md:mb-6 text-xs sm:text-sm md:text-base leading-relaxed"
            >
              India's most trusted luxury real estate group, curating extraordinary
              homes across 12 cities since 2003.
            </p>
            <div className="social-links flex flex-wrap gap-1.5 sm:gap-2 md:gap-3">
              {["Instagram", "LinkedIn", "Twitter", "YouTube"].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="font-body tracking-widest uppercase text-cream/50 hover:text-gold transition-colors text-xs sm:text-sm"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <div
              className="font-body tracking-widest uppercase text-gold mb-2 sm:mb-3 md:mb-4 text-sm sm:text-base md:text-lg"
            >
              Quick Links
            </div>
            <ul className="space-y-1.5 sm:space-y-2 md:space-y-3">
              {[
                { name: "Home", href: "/" },
                { name: "About", href: "/about" },
                { name: "Properties", href: "/properties" },
                { name: "Blog", href: "/blog" },
                { name: "Contact", href: "/contact" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="font-body text-cream/60 hover:text-gold transition-colors text-xs sm:text-sm md:text-base"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <div
              className="font-body tracking-widest uppercase text-gold mb-2 sm:mb-3 md:mb-4 text-sm sm:text-base md:text-lg"
            >
              Contact
            </div>
            <div className="space-y-2 sm:space-y-3 md:space-y-4">
              <div>
                <div
                  className="font-body text-gold/70 uppercase tracking-widest mb-0.5 text-xs sm:text-sm"
                >
                  Mumbai HQ
                </div>
                <div
                  className="font-body text-cream/60 text-xs sm:text-sm leading-relaxed"
                >
                  Nariman Point,
                  <br />
                  Mumbai 400 021
                </div>
              </div>
              <div>
                <div
                  className="font-body text-cream/60 text-xs sm:text-sm leading-relaxed"
                >
                  Phone - +91 22 4000 0000
                </div>
              </div>
              <div>
                <div
                  className="font-body text-cream/60 text-xs sm:text-sm leading-relaxed"
                >
                  Email - hello@atibharealty.com
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div
          className="footer-bottom w-full border-t border-[#222] px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
        >
          <div
            className="font-body text-cream/40 text-xs sm:text-sm text-left"
          >
            © 2003 – 2025 Atibha Realty. All rights reserved.
          </div>
          <div className="flex flex-wrap justify-start sm:justify-end gap-4">
            {["Privacy Policy", "Terms of Use", "RERA Disclosure"].map((l) => (
              <a
                key={l}
                href="#"
                className="font-body text-cream/40 hover:text-gold transition-colors text-xs sm:text-sm"
              >
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
