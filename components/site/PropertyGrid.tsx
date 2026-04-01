"use client";

import PropertyCard from "./PropertyCard";

// Define a more flexible property type for the grid
interface GridProperty {
  id: string | number;
  title: string;
  location: string;
  city?: string;
  price: string;
  priceNum?: number;
  type?: string;
  status?: string;
  beds?: number;
  baths?: number;
  area?: string;
  tag?: string;
  featured?: boolean;
  image: string;
  gallery?: string[];
  description?: string;
  amenities?: string[];
}

interface PropertyGridProps {
  properties: GridProperty[];
  columns?: 2 | 3 | 4;
}

export default function PropertyGrid({ properties, columns = 3 }: PropertyGridProps) {
  const getGridClasses = () => {
    switch (columns) {
      case 2:
        return "grid-cols-1 md:grid-cols-2";
      case 4:
        return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";
      case 3:
      default:
        return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
    }
  };

  if (properties.length === 0) {
    return (
      <div className="text-center py-24">
        <div className="font-heading text-4xl text-cream/30 italic mb-4">No properties found</div>
        <p className="font-body text-muted">Try adjusting your filters to see more results.</p>
      </div>
    );
  }

  return (
    <div className={`grid ${getGridClasses()} gap-1`}>
      {properties.map((property, index) => (
        <PropertyCard key={property.id} property={property as any} featured={index === 0} />
      ))}
    </div>
  );
}
