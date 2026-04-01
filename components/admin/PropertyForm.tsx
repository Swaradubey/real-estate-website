"use client";

import { useState } from "react";
import { addProperty, type FirestoreProperty } from "@/lib/firestore";

interface PropertyFormProps {
  onSuccess?: (property: FirestoreProperty) => void;
}

export default function PropertyForm({ onSuccess }: PropertyFormProps) {
  const [form, setForm] = useState({
    title: "",
    location: "",
    price: 0,
    status: "Available",
    image: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const property = await addProperty({
        title: form.title,
        location: form.location,
        price: form.price,
        status: form.status,
        image: form.image,
      });
      
      setSuccess(true);
      setForm({ title: "", location: "", price: 0, status: "Available", image: "" });
      onSuccess?.(property);
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error("Error adding property:", err);
      setError(err instanceof Error ? err.message : "Failed to add property");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8 mt-2">
      {error && (
        <div className="bg-red-50/80 border border-red-100 px-5 py-4 rounded-xl shadow-[0_2px_10px_rgb(220,38,38,0.05)]">
          <p className="font-body text-sm text-red-600">{error}</p>
        </div>
      )}
      
      {success && (
        <div className="bg-emerald-50/80 border border-emerald-100 px-5 py-4 rounded-xl shadow-[0_2px_10px_rgb(5,150,105,0.05)]">
          <p className="font-body text-sm text-emerald-600">Property added successfully!</p>
        </div>
      )}

      <div className="space-y-2.5">
        <label className="font-body text-[10px] sm:text-[11px] tracking-[0.15em] uppercase text-stone-500/90 font-medium block">
          Property Title <span className="text-[#C4973F] ml-0.5">*</span>
        </label>
        <input
          required
          value={form.title}
          onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
          className="w-full bg-[#FAFAF8] border border-stone-200/80 px-4 py-3.5 sm:px-5 sm:py-4 font-body text-sm text-ink outline-none focus:border-[#C4973F]/60 focus:bg-white focus:ring-[3px] focus:ring-[#C4973F]/10 rounded-xl transition-all duration-300 placeholder:text-stone-400/70"
          placeholder="e.g., Oberoi Sky Gardens"
        />
      </div>

      <div className="space-y-2.5">
        <label className="font-body text-[10px] sm:text-[11px] tracking-[0.15em] uppercase text-stone-500/90 font-medium block">
          Location <span className="text-[#C4973F] ml-0.5">*</span>
        </label>
        <input
          required
          value={form.location}
          onChange={(e) => setForm((p) => ({ ...p, location: e.target.value }))}
          className="w-full bg-[#FAFAF8] border border-stone-200/80 px-4 py-3.5 sm:px-5 sm:py-4 font-body text-sm text-ink outline-none focus:border-[#C4973F]/60 focus:bg-white focus:ring-[3px] focus:ring-[#C4973F]/10 rounded-xl transition-all duration-300 placeholder:text-stone-400/70"
          placeholder="e.g., Worli Sea Face, Mumbai"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
        <div className="space-y-2.5">
          <label className="font-body text-[10px] sm:text-[11px] tracking-[0.15em] uppercase text-stone-500/90 font-medium block">
            Price (in Crores) <span className="text-[#C4973F] ml-0.5">*</span>
          </label>
          <input
            required
            type="number"
            step="0.1"
            min="0"
            value={form.price || ""}
            onChange={(e) => setForm((p) => ({ ...p, price: parseFloat(e.target.value) || 0 }))}
            className="w-full bg-[#FAFAF8] border border-stone-200/80 px-4 py-3.5 sm:px-5 sm:py-4 font-body text-sm text-ink outline-none focus:border-[#C4973F]/60 focus:bg-white focus:ring-[3px] focus:ring-[#C4973F]/10 rounded-xl transition-all duration-300 placeholder:text-stone-400/70"
            placeholder="e.g., 18.5"
          />
        </div>

        <div className="space-y-2.5">
          <label className="font-body text-[10px] sm:text-[11px] tracking-[0.15em] uppercase text-stone-500/90 font-medium block">
            Status <span className="text-[#C4973F] ml-0.5">*</span>
          </label>
          <div className="relative">
            <select
              value={form.status}
              onChange={(e) => setForm((p) => ({ ...p, status: e.target.value }))}
              className="w-full appearance-none bg-[#FAFAF8] border border-stone-200/80 px-4 py-3.5 sm:px-5 sm:py-4 font-body text-sm text-ink outline-none focus:border-[#C4973F]/60 focus:bg-white focus:ring-[3px] focus:ring-[#C4973F]/10 rounded-xl transition-all duration-300 cursor-pointer"
            >
              <option value="Available">Available</option>
              <option value="Coming Soon">Coming Soon</option>
              <option value="Sold">Sold</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-stone-400">
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-2.5">
        <label className="font-body text-[10px] sm:text-[11px] tracking-[0.15em] uppercase text-stone-500/90 font-medium block">
          Image URL <span className="text-[#C4973F] ml-0.5">*</span>
        </label>
        <input
          required
          type="url"
          value={form.image}
          onChange={(e) => setForm((p) => ({ ...p, image: e.target.value }))}
          className="w-full bg-[#FAFAF8] border border-stone-200/80 px-4 py-3.5 sm:px-5 sm:py-4 font-body text-sm text-ink outline-none focus:border-[#C4973F]/60 focus:bg-white focus:ring-[3px] focus:ring-[#C4973F]/10 rounded-xl transition-all duration-300 placeholder:text-stone-400/70"
          placeholder="https://example.com/image.jpg"
        />
        <p className="font-body text-[10px] sm:text-[11px] text-stone-400 mt-2.5 font-medium">
          Enter a direct high-quality image URL for best results
        </p>
      </div>

      <div className="pt-6 sm:pt-8">
        <button
          type="submit"
          disabled={loading}
          className="w-full font-body text-xs sm:text-sm font-medium tracking-[0.2em] uppercase text-white px-8 py-4 sm:py-4.5 rounded-xl cursor-pointer transition-all duration-500 ease-out hover:-translate-y-0.5 hover:shadow-[0_8px_24px_-6px_rgba(196,151,63,0.5)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 relative overflow-hidden group bg-[#C4973F]"
        >
          <div className="absolute inset-0 bg-black/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>
          <span className="relative flex items-center justify-center gap-2">
            {loading ? "Adding Property..." : "Add Property"}
          </span>
        </button>
      </div>
    </form>
  );
}
