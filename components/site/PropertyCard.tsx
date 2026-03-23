"use client";

import Image from "next/image";
import Link from "next/link";
import { Property } from "@/lib/data";

interface PropertyCardProps {
  property: Property;
  featured?: boolean;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  return (
    <Link href={`/properties/${property.id}`} className="group block w-full">
      <div className="relative w-full aspect-[4/5] sm:aspect-[4/3] md:aspect-auto md:h-full md:min-h-[400px] lg:min-h-[450px] overflow-hidden rounded-2xl shadow-lg transition-all duration-300 group-hover:shadow-[0_8px_30px_rgb(196,151,63,0.15)] bg-black">
        
        {/* Image with zoom effect on hover */}
        <Image
          src={property.image}
          alt={property.title}
          fill
          className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
        />

        {/* Global Dark Overlays */}
        <div className="absolute inset-0 bg-black/20 transition-colors duration-500 group-hover:bg-black/10" />
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

        {/* Top-left Tag */}
        {property.tag && (
          <div className="absolute top-4 left-4 z-20">
            <span className="backdrop-blur-md bg-black/50 text-white border border-[#C4973F]/30 px-3 py-1 text-xs font-semibold tracking-wide uppercase rounded-full">
              {property.tag}
            </span>
          </div>
        )}

        {/* Top-right Status */}
        {property.status && (
          <div className="absolute top-4 right-4 z-20">
            <span className={`px-3 py-1 text-xs font-bold tracking-wide uppercase rounded-full shadow-sm ${
              property.status.toLowerCase() === 'sold' 
                ? 'bg-red-500/90 text-white' 
                : property.status.toLowerCase() === 'available'
                ? 'bg-emerald-500/90 text-white'
                : 'bg-[#C4973F]/90 text-black'
            }`}>
              {property.status}
            </span>
          </div>
        )}

        {/* Bottom Content */}
        <div className="absolute bottom-0 inset-x-0 p-5 z-20 flex flex-col gap-3">
          
          {/* Location with backdrop blur */}
          <div className="self-start backdrop-blur-md bg-black/40 border border-white/10 rounded-full px-3 py-1 flex items-center">
            <span className="text-white/90 text-[10px] sm:text-xs font-medium tracking-wider uppercase">
              📍 {property.location}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-white font-bold text-xl sm:text-2xl leading-tight drop-shadow-md line-clamp-2">
            {property.title}
          </h3>

          {/* Price & Amenities Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-1">
            
            {/* Price */}
            <div className="text-[#C4973F] font-bold text-lg drop-shadow-md">
              {property.price}
            </div>

            {/* Amenities */}
            <div className="flex items-center gap-2 sm:gap-3 text-white/90 text-[12px] sm:text-[13px] font-medium">
              <div className="flex items-center gap-1.5 backdrop-blur-sm bg-black/30 px-2 sm:px-2.5 py-1 rounded-md">
                <span>🛏</span>
                <span>{property.beds}</span>
              </div>
              <div className="flex items-center gap-1.5 backdrop-blur-sm bg-black/30 px-2 sm:px-2.5 py-1 rounded-md">
                <span>🛁</span>
                <span>{property.baths}</span>
              </div>
              <div className="flex items-center gap-1.5 backdrop-blur-sm bg-black/30 px-2 sm:px-2.5 py-1 rounded-md">
                <span>📐</span>
                <span>{property.area}</span>
              </div>
            </div>

          </div>
          
          {/* Extra generic Amenities Row (if property.amenities exists) */}
          {property.amenities && property.amenities.length > 0 && (
            <div className="w-full overflow-x-auto scrollbar-hide mt-1">
              <div className="flex flex-nowrap gap-2 w-max pb-1">
                {property.amenities.map((item) => (
                  <span
                    key={item}
                    className="shrink-0 whitespace-nowrap rounded-full border border-white/20 bg-black/40 px-3 py-1 text-[11px] font-semibold text-white/90 backdrop-blur-sm"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </Link>
  );
}