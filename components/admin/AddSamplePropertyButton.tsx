"use client";

import { useState } from "react";
import { addProperty, type FirestoreProperty } from "@/lib/firestore";

interface AddSamplePropertyButtonProps {
  onSuccess?: (property: FirestoreProperty) => void;
}

export default function AddSamplePropertyButton({ onSuccess }: AddSamplePropertyButtonProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAddSample = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    // Sample property data
    const sampleProperties = [
      {
        title: "Oberoi Sky Gardens",
        location: "Worli Sea Face, Mumbai",
        price: 18.5,
        status: "Available",
        image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=85",
      },
      {
        title: "The Rattan Bungalow",
        location: "Lutyens Zone, New Delhi",
        price: 42,
        status: "Available",
        image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&q=85",
      },
      {
        title: "Saffron Heights",
        location: "Banjara Hills, Hyderabad",
        price: 8.2,
        status: "Coming Soon",
        image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=85",
      },
      {
        title: "The Maple Villa",
        location: "Koregaon Park, Pune",
        price: 6.8,
        status: "Available",
        image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1200&q=85",
      },
      {
        title: "Celadon Court",
        location: "Indiranagar, Bengaluru",
        price: 9.5,
        status: "Available",
        image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=85",
      },
    ];

    // Pick a random sample property
    const sample = sampleProperties[Math.floor(Math.random() * sampleProperties.length)];

    try {
      const property = await addProperty(sample);
      setSuccess(true);
      onSuccess?.(property);
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error("Error adding sample property:", err);
      setError(err instanceof Error ? err.message : "Failed to add sample property");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <button
        onClick={handleAddSample}
        disabled={loading}
        className="w-full font-body text-[10px] font-semibold tracking-[0.2em] uppercase text-stone-600 bg-white border border-stone-200 px-7 py-3.5 rounded-lg cursor-pointer transition-all duration-500 ease-out hover:border-gold/50 hover:text-gold hover:shadow-[0_8px_20px_rgb(0,0,0,0.04)] hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed group flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <svg className="animate-spin h-3.5 w-3.5 text-stone-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
            Adding...
          </>
        ) : (
          <>
            <svg className="w-3.5 h-3.5 text-stone-400 group-hover:text-gold transition-colors duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>
            Add Sample
          </>
        )}
      </button>
      
      {error && (
        <div className="bg-red-50/80 border border-red-100 px-4 py-3 rounded-md">
          <p className="font-body text-xs text-red-600">{error}</p>
        </div>
      )}
      
      {success && (
        <div className="bg-emerald-50/80 border border-emerald-100 px-4 py-3 rounded-md">
          <p className="font-body text-xs text-emerald-600">Sample property added!</p>
        </div>
      )}
    </div>
  );
}
