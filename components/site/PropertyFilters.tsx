"use client";

import { useState } from "react";

export interface FilterState {
  location: string;
  propertyType: string;
  priceRange: [number, number];
  bedrooms: string;
  sortBy: string;
}

interface PropertyFiltersProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  locations: string[];
}

const propertyTypes = ["All Types", "Villa", "Apartment", "Penthouse", "Bungalow"];
const bedroomOptions = ["Any", "1", "2", "3", "4", "5+"];
const sortOptions = [
  { value: "newest", label: "Newest" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "featured", label: "Featured" },
];

export default function PropertyFilters({ filters, onFilterChange, locations }: PropertyFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleChange = (key: keyof FilterState, value: string | [number, number]) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const handlePriceChange = (index: number, value: number) => {
    const newRange: [number, number] = [...filters.priceRange] as [number, number];
    newRange[index] = value;
    if (index === 0 && value > newRange[1]) {
      newRange[1] = value;
    }
    if (index === 1 && value < newRange[0]) {
      newRange[0] = value;
    }
    handleChange("priceRange", newRange);
  };

  const clearFilters = () => {
    onFilterChange({
      location: "All Locations",
      propertyType: "All Types",
      priceRange: [0, 100],
      bedrooms: "Any",
      sortBy: "newest",
    });
  };

  const hasActiveFilters = 
    filters.location !== "All Locations" ||
    filters.propertyType !== "All Types" ||
    filters.bedrooms !== "Any" ||
    filters.priceRange[0] > 0 ||
    filters.priceRange[1] < 100;

  return (
    <div className="bg-ink-soft border border-gold/20 rounded-sm">
      {/* Mobile Toggle */}
      <div className="lg:hidden p-4 border-b border-gold/20">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-between text-cream"
        >
          <span className="font-body text-sm tracking-widest uppercase">Filters & Sort</span>
          <svg
            className={`w-5 h-5 transition-transform ${isExpanded ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {/* Filters Content */}
      <div className={`${isExpanded ? "block" : "hidden"} lg:block p-6`}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {/* Location */}
          <div>
            <label className="block font-body text-[10px] tracking-[0.2em] uppercase text-gold mb-2">
              Location
            </label>
            <select
              value={filters.location}
              onChange={(e) => handleChange("location", e.target.value)}
              className="w-full bg-ink border border-gold/30 text-cream font-body text-sm py-3 px-4 focus:border-gold focus:outline-none transition-colors"
            >
              <option value="All Locations">All Locations</option>
              {locations.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>

          {/* Property Type */}
          <div>
            <label className="block font-body text-[10px] tracking-[0.2em] uppercase text-gold mb-2">
              Property Type
            </label>
            <select
              value={filters.propertyType}
              onChange={(e) => handleChange("propertyType", e.target.value)}
              className="w-full bg-ink border border-gold/30 text-cream font-body text-sm py-3 px-4 focus:border-gold focus:outline-none transition-colors"
            >
              {propertyTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Bedrooms */}
          <div>
            <label className="block font-body text-[10px] tracking-[0.2em] uppercase text-gold mb-2">
              Bedrooms
            </label>
            <select
              value={filters.bedrooms}
              onChange={(e) => handleChange("bedrooms", e.target.value)}
              className="w-full bg-ink border border-gold/30 text-cream font-body text-sm py-3 px-4 focus:border-gold focus:outline-none transition-colors"
            >
              {bedroomOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt === "Any" ? "Any" : `${opt} BHK`}
                </option>
              ))}
            </select>
          </div>

          {/* Sort By */}
          <div>
            <label className="block font-body text-[10px] tracking-[0.2em] uppercase text-gold mb-2">
              Sort By
            </label>
            <select
              value={filters.sortBy}
              onChange={(e) => handleChange("sortBy", e.target.value)}
              className="w-full bg-ink border border-gold/30 text-cream font-body text-sm py-3 px-4 focus:border-gold focus:outline-none transition-colors"
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Price Range */}
          <div>
            <label className="block font-body text-[10px] tracking-[0.2em] uppercase text-gold mb-2">
              Price Range (Cr)
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="0"
                max="100"
                value={filters.priceRange[0]}
                onChange={(e) => handlePriceChange(0, parseInt(e.target.value) || 0)}
                className="w-20 bg-ink border border-gold/30 text-cream font-body text-sm py-2 px-3 focus:border-gold focus:outline-none"
                placeholder="Min"
              />
              <span className="text-cream/50">-</span>
              <input
                type="number"
                min="0"
                max="100"
                value={filters.priceRange[1]}
                onChange={(e) => handlePriceChange(1, parseInt(e.target.value) || 100)}
                className="w-20 bg-ink border border-gold/30 text-cream font-body text-sm py-2 px-3 focus:border-gold focus:outline-none"
                placeholder="Max"
              />
            </div>
          </div>
        </div>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <div className="mt-6 pt-4 border-t border-gold/20 flex justify-end">
            <button
              onClick={clearFilters}
              className="font-body text-xs tracking-widest uppercase text-gold hover:text-gold-lt transition-colors flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
