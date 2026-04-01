"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import Cursor from "@/components/site/Cursor";
import PropertyGrid from "@/components/site/PropertyGrid";
import PropertyFilters, { FilterState } from "@/components/site/PropertyFilters";
import Pagination from "@/components/site/Pagination";
import { properties as staticProperties } from "@/lib/data";
import { getProperties, type FirestoreProperty } from "@/lib/firestore";

const ITEMS_PER_PAGE = 6;

type DisplayProperty = {
  id: string | number;
  title: string;
  location: string;
  city: string;
  price: string;
  priceNum: number;
  type: string;
  status: string;
  beds: number;
  baths: number;
  area: string;
  tag: string;
  featured: boolean;
  image: string;
  gallery: string[];
  description: string;
  amenities: string[];
};

export default function PropertiesPage() {
  const [firestoreProperties, setFirestoreProperties] = useState<FirestoreProperty[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [filters, setFilters] = useState<FilterState>({
    location: "All Locations",
    propertyType: "All Types",
    priceRange: [0, 100],
    bedrooms: "Any",
    sortBy: "newest",
  });
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch properties from Firestore
  useEffect(() => {
    let isMounted = true;
    
    async function fetchProperties() {
      try {
        setLoading(true);
        setError(null);
        
        const data = await getProperties();
        
        if (isMounted) {
          setFirestoreProperties(data);
        }
      } catch (err) {
        console.error("Error fetching properties:", err);
        if (isMounted) {
          setError("Failed to load properties. Showing cached data.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }
    
    fetchProperties();
    
    return () => {
      isMounted = false;
    };
  }, []);

  // Convert Firestore properties to display format, merge with static properties
  const allProperties: DisplayProperty[] = useMemo(() => {
    // Convert Firestore properties to display format
    const firestoreDisplay: DisplayProperty[] = firestoreProperties.map((p) => ({
      id: p.id,
      title: p.title,
      location: p.location,
      city: p.location.split(",").pop()?.trim() || p.location,
      price: `₹${p.price} Cr`,
      priceNum: p.price,
      type: "Property",
      status: p.status,
      beds: 3,
      baths: 3,
      area: "3,000 sq.ft",
      tag: p.status,
      featured: false,
      image: p.image,
      gallery: [p.image],
      description: `A beautiful property located in ${p.location}.`,
      amenities: [],
    }));
    
    // If we have Firestore properties, use them; otherwise fall back to static
    if (firestoreDisplay.length > 0) {
      return firestoreDisplay;
    }
    
    // Fall back to static properties
    return staticProperties.map((p) => ({
      ...p,
      id: p.id,
    }));
  }, [firestoreProperties]);

  // Get unique locations
  const locations = useMemo(() => {
    const uniqueCities = Array.from(new Set(allProperties.map((p) => p.city)));
    return uniqueCities.sort();
  }, [allProperties]);

  // Filter and sort properties
  const filteredProperties = useMemo(() => {
    let result = [...allProperties];

    // Filter by location
    if (filters.location !== "All Locations") {
      result = result.filter((p) => p.city === filters.location);
    }

    // Filter by property type
    if (filters.propertyType !== "All Types") {
      result = result.filter((p) =>
        p.type.toLowerCase().includes(filters.propertyType.toLowerCase())
      );
    }

    // Filter by bedrooms
    if (filters.bedrooms !== "Any") {
      const bedCount = parseInt(filters.bedrooms);
      if (filters.bedrooms === "5+") {
        result = result.filter((p) => p.beds >= 5);
      } else {
        result = result.filter((p) => p.beds === bedCount);
      }
    }

    // Filter by price range
    result = result.filter(
      (p) =>
        p.priceNum >= filters.priceRange[0] &&
        p.priceNum <= filters.priceRange[1]
    );

    // Sort
    switch (filters.sortBy) {
      case "price-low":
        result.sort((a, b) => a.priceNum - b.priceNum);
        break;
      case "price-high":
        result.sort((a, b) => b.priceNum - a.priceNum);
        break;
      case "featured":
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
      case "newest":
      default:
        // Sort by string ID (Firestore IDs are timestamps)
        result.sort((a, b) => String(b.id).localeCompare(String(a.id)));
        break;
    }

    return result;
  }, [filters, allProperties]);

  // Pagination
  const totalPages = Math.ceil(filteredProperties.length / ITEMS_PER_PAGE);
  const paginatedProperties = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProperties.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProperties, currentPage]);

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page when filters change
  };

  return (
    <>
      <Cursor />
      <Navbar />

      {/* Hero Section */}
      <section className="relative w-full h-[85vh] min-h-[700px] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 -z-10" style={{ transform: "scale(1.1)" }}>
          <Image
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=85"
            alt="Luxury Properties"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80" />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <ol className="flex items-center justify-center gap-3 font-body text-sm text-cream/60">
              <li>
                <Link href="/" className="hover:text-gold transition-colors">
                  Home
                </Link>
              </li>
              <li className="text-gold">/</li>
              <li className="text-cream">Properties</li>
            </ol>
          </nav>

          {/* Title */}
          <h1 className="font-heading text-6xl md:text-8xl lg:text-9xl text-cream mb-6 leading-tight">
            Our Exclusive <em className="text-gold">Properties</em>
          </h1>

          {/* Subtitle */}
          <p className="font-body text-lg md:text-xl text-cream/80 max-w-2xl mx-auto">
            Discover premium homes across India&apos;s most prestigious addresses
          </p>

          {/* Stats */}
          <div className="flex items-center justify-center gap-12 mt-12">
            <div className="text-center">
              <div className="font-heading text-3xl md:text-4xl text-gold">{allProperties.length}+</div>
              <div className="font-body text-xs tracking-widest uppercase text-cream/60 mt-1">
                Properties
              </div>
            </div>
            <div className="w-px h-12 bg-gold/30" />
            <div className="text-center">
              <div className="font-heading text-3xl md:text-4xl text-gold">{locations.length}</div>
              <div className="font-body text-xs tracking-widest uppercase text-cream/60 mt-1">
                Cities
              </div>
            </div>
            <div className="w-px h-12 bg-gold/30" />
            <div className="text-center">
              <div className="font-heading text-3xl md:text-4xl text-gold">₹3,200Cr</div>
              <div className="font-body text-xs tracking-widest uppercase text-cream/60 mt-1">
                Portfolio
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="bg-ink min-h-screen">
        <div className="w-full">
          {/* Filters */}
          <div className="px-6 md:px-12 lg:px-16 2xl:px-24 pt-12 pb-6">
            <PropertyFilters
              filters={filters}
              onFilterChange={handleFilterChange}
              locations={locations}
            />
          </div>

          {/* Results Count */}
          <div className="flex items-center justify-between px-6 md:px-12 lg:px-16 2xl:px-24 mb-4">
            <div className="font-body text-sm text-cream/60">
              Showing{" "}
              <span className="text-gold">
                {paginatedProperties.length > 0
                  ? `${(currentPage - 1) * ITEMS_PER_PAGE + 1}-${Math.min(
                      currentPage * ITEMS_PER_PAGE,
                      filteredProperties.length
                    )}`
                  : "0"}
              </span>{" "}
              of <span className="text-cream">{filteredProperties.length}</span> properties
            </div>
          </div>

          {/* Property Grid */}
          <PropertyGrid properties={paginatedProperties} columns={4} />

          {/* Pagination */}
          <div className="px-6 md:px-12 lg:px-16 2xl:px-24 py-8">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
