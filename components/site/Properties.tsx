"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { properties } from "@/lib/data";

const FILTERS = ["All", "Available", "Coming Soon", "Sold"];

export default function Properties() {
  const [filter, setFilter] = useState("All");
  const filtered = filter === "All" ? properties : properties.filter(p => p.status === filter);

  const statusCls = (s: string) =>
    s === "Available" ? "bg-emerald-100 text-emerald-800"
      : s === "Coming Soon" ? "bg-amber-100 text-amber-800"
        : "bg-red-100 text-red-800";

  return (
    <section id="properties" className="bg-white py-12 sm:py-16 md:py-20">
      <div className="w-full max-w-[1600px] mx-auto">

        {/* Header */}
        <div className="w-full px-4 sm:px-6 lg:px-8 mb-8 sm:mb-12 flex flex-col items-center text-center">
          <div className="flex flex-col items-center gap-6">
            <div className="flex flex-col items-center">
              <div className="label-tag mb-2 sm:mb-3 text-xs sm:text-sm">Our projects</div>
              <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl text-ink leading-tight">
                See the magic <em className="text-gold">by yourself.</em>
              </h2>
            </div>
            <div className="flex items-center gap-4 flex-wrap reveal-r">
              {FILTERS.map(f => (
                <button key={f} onClick={() => setFilter(f)}
                  className={`font-body text-xs sm:text-sm px-6 py-3 border tracking-widest uppercase transition-all flex items-center justify-center ${filter === f ? "border-gold bg-gold text-ink" : "border-sand text-muted hover:border-gold hover:text-ink"
                    }`}>
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 px-4 sm:px-6 lg:px-8 mb-8">
          {filtered.map((p, i) => (
            <div key={p.id}
              className="group relative overflow-hidden cursor-pointer h-[420px] sm:h-[480px] rounded-xl">

              {/* Image */}
              <div className="relative overflow-hidden h-full w-full bg-ink-soft">
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 25vw"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent" />

                {/* Status badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span className={`font-body text-[10px] font-semibold px-3 py-1 rounded tracking-widest uppercase ${statusCls(p.status)}`}>
                    {p.status}
                  </span>
                </div>
                {p.featured && (
                  <div className="absolute top-4 right-4 z-10">
                    <span className="font-body text-[10px] font-semibold px-3 py-1 rounded tracking-widest uppercase bg-gold text-ink">
                      ★ Featured
                    </span>
                  </div>
                )}

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gold/10 opacity-0 group-hover:opacity-100 transition-opacity duration-400 z-10" />

                {/* Content at bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 z-20">
                  <div className="flex flex-col items-start text-left gap-2 w-full">
                    <div className="flex flex-col items-start w-full">
                      <div className="font-body text-[10px] text-white font-semibold tracking-widest uppercase mb-2 bg-black/60 px-2 py-1 rounded-sm">
                        {p.location}
                      </div>
                      <h3 className="font-heading text-white font-bold mb-1 text-lg leading-tight w-full text-left drop-shadow-md">
                        {p.title}
                      </h3>
                      <div className="flex flex-col items-start w-full gap-2 mt-1">
                        <span className="font-heading text-gold font-bold text-lg drop-shadow-md bg-black/80 px-3 py-1 rounded-md border border-gold/40">
                          {p.price}
                        </span>
                        <div className="flex gap-2 opacity-90 transition-all duration-300">
                          <span className="font-body text-xs text-white bg-black/60 px-3 py-1 rounded-md font-semibold">🛏 {p.beds}</span>
                          <span className="font-body text-xs text-white bg-black/60 px-3 py-1 rounded-md font-semibold">🚿 {p.baths}</span>
                        </div>
                      </div>
                    </div>

                    {p.amenities && p.amenities.length > 0 && (
                      <div className="w-full overflow-x-auto scrollbar-hide mt-2">
                        <div className="flex flex-nowrap gap-2 w-max">
                          {p.amenities.map(a => (
                            <span key={a} className="shrink-0 whitespace-nowrap font-body text-[11px] bg-black/80 text-white font-medium px-3 py-1 rounded-full border border-gold/30">
                              {a}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 sm:py-20">
            <p className="font-heading text-xl sm:text-2xl text-muted italic px-4">No {filter.toLowerCase()} properties right now.</p>
          </div>
        )}

        <div className="w-full flex justify-center items-center py-10 px-[25px] reveal">
          <Link
            href="#contact"
            className="btn-outline inline-flex items-center justify-center text-center text-xs sm:text-sm py-4 px-8 min-w-[280px]"
          >
            Request Full Portfolio
          </Link>
        </div>
      </div>
    </section>
  );
}

