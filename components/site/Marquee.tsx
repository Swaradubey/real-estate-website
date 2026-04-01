export default function Marquee() {
  const items = [
    "★ Luxury Residences",
    "★ Heritage Properties",
    "★ Pan-India Portfolio",
    "★ Est. 2003 Mumbai",
    "★ Curated Living",
    "★ NRI Advisory",
    "★ Investment Grade",
    "★ Award Winning",
  ];

  return (
   <div className="bg-gold py-2 sm:py-4 overflow-hidden">
      <div className="inline-flex w-max animate-marquee items-center">
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
           className="inline-block shrink-0 font-accent text-xs sm:text-sm md:text-base tracking-[0.15em] text-ink mx-4"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
