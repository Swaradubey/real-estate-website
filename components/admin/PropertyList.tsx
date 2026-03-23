"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { getProperties, deleteProperty, type FirestoreProperty } from "@/lib/firestore";

export default function PropertyList() {
  const [properties, setProperties] = useState<FirestoreProperty[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProperties = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await getProperties();
      setProperties(data);
    } catch (err) {
      console.error("Error fetching properties:", err);
      setError(err instanceof Error ? err.message : "Failed to load properties");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this property?")) return;
    
    try {
      await deleteProperty(id);
      setProperties((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error("Error deleting property:", err);
      alert("Failed to delete property");
    }
  };

  const formatPrice = (price: number) => {
    return `₹${price} Cr`;
  };

  const statusCls = (status: string) =>
    status === "Available"
      ? "bg-emerald-100 text-emerald-800"
      : status === "Coming Soon"
      ? "bg-amber-100 text-amber-800"
      : "bg-red-100 text-red-800";

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gold mx-auto mb-6"></div>
          <p className="text-stone-400 font-body text-[10px] tracking-[0.2em] uppercase">Loading Portfolio...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50/80 border border-red-100 rounded-lg p-8 text-center max-w-md mx-auto my-12">
        <p className="text-red-600 font-body text-sm mb-6">{error}</p>
        <button onClick={fetchProperties} className="font-body text-[10px] tracking-[0.2em] uppercase text-white bg-red-600 px-6 py-3 rounded-md hover:bg-red-700 transition-colors">
          Try Again
        </button>
      </div>
    );
  }

  if (properties.length === 0) {
    return (
      <div className="bg-[#FCFBF9] border border-stone-200/40 rounded-2xl p-10 sm:p-16 text-center flex flex-col items-center justify-center h-full min-h-[400px] shadow-[inset_0_2px_20px_rgb(0,0,0,0.01)] transition-all">
        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-full flex items-center justify-center shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-stone-100/80 mb-6 sm:mb-8 relative overflow-hidden group hover:scale-105 transition-transform duration-500">
          <div className="absolute inset-0 bg-gradient-to-br from-[#C4973F]/10 to-transparent"></div>
          <svg className="w-6 h-6 sm:w-8 sm:h-8 text-[#C4973F] relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
        </div>
        <h3 className="font-display text-2xl sm:text-3xl text-ink mb-4 tracking-wide font-light">No Portfolio Properties</h3>
        <p className="font-body text-sm sm:text-base text-stone-500/80 max-w-sm mx-auto leading-relaxed tracking-wide">
          Your property portfolio is currently empty. Add your first premium listing using the form to start building your collection.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8 lg:space-y-10">
      <div className="flex items-center justify-between pb-6 sm:pb-8 border-b border-stone-200/50">
        <div className="flex items-baseline gap-3 sm:gap-4">
          <h3 className="font-display text-2xl sm:text-3xl text-ink tracking-wide font-normal">Portfolio</h3>
          <span className="font-body text-[10px] sm:text-xs tracking-[0.2em] uppercase text-stone-400">
            {properties.length} {properties.length === 1 ? 'Listing' : 'Listings'}
          </span>
        </div>
        <button
          onClick={fetchProperties}
          className="font-body text-[10px] sm:text-xs tracking-[0.2em] uppercase text-[#C4973F] hover:text-[#C4973F]/80 transition-colors flex items-center gap-2 sm:gap-2.5 group hover:bg-[#C4973F]/5 px-3 py-2 sm:px-4 sm:py-2.5 rounded-lg"
        >
          <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:rotate-180 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
          <span className="hidden sm:inline font-medium">Refresh</span>
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
        {properties.map((property) => (
          <div
            key={property.id}
            className="bg-white border border-stone-200/50 rounded-2xl overflow-hidden shadow-[0_4px_24px_rgb(0,0,0,0.02)] hover:shadow-[0_12px_40px_rgb(0,0,0,0.06)] transition-all duration-500 group flex flex-col"
          >
            <div className="relative h-60 sm:h-64 overflow-hidden">
              <div className="absolute inset-0 bg-stone-900/10 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
              <Image
                src={property.image}
                alt={property.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <span
                className={`absolute top-4 left-4 z-20 font-body text-[9px] px-3.5 py-1.5 rounded-sm tracking-[0.2em] uppercase shadow-sm ${statusCls(property.status)} font-medium`}
              >
                {property.status}
              </span>
            </div>
            
            <div className="p-6 sm:p-8 flex flex-col flex-grow bg-white">
              <div className="mb-6 flex-grow">
                <h4 className="font-display text-xl sm:text-2xl text-ink mb-2 line-clamp-1">{property.title}</h4>
                <div className="flex items-center text-stone-500/80 mb-4 gap-2">
                  <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                  <p className="font-body text-xs sm:text-sm truncate tracking-wide">{property.location}</p>
                </div>
                <p className="font-display italic text-[#C4973F] text-2xl sm:text-3xl mt-6">
                  {formatPrice(property.price)}
                </p>
              </div>
              
              <div className="pt-6 border-t border-stone-100/80 mt-auto">
                <button
                  onClick={() => handleDelete(property.id)}
                  className="w-full font-body text-[10px] sm:text-xs font-medium tracking-[0.2em] uppercase text-stone-400 border border-stone-200/50 px-4 py-3.5 sm:py-4 rounded-xl hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors"
                >
                  Remove Listing
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
