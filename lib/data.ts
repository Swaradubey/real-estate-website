// ─── Types ───────────────────────────────────────────────────────────────────

export type Property = {
  id: number;
  title: string;
  location: string;
  city: string;
  price: string;
  priceNum: number;
  type: "Penthouse" | "Villa" | "Heritage Bungalow" | "Apartment" | "Farmhouse";
  status: "Available" | "Coming Soon" | "Sold";
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

export type TeamMember = {
  id: number;
  name: string;
  role: string;
  experience: string;
  initials: string;
  bio: string;
  image: string;
};

export type BlogPost = {
  id: number;
  title: string;
  slug: string;
  content: string;
  author: string;
  date: string;
  /**
   * Featured image URL.
   * - For seeded posts this is a normal URL.
   * - For client-created posts this may be a temporary object URL.
   */
  image: string;
  seoTitle: string;
  metaDescription: string;
  keywords: string[];
  /**
   * Optional fields used by existing UI cards.
   * New blog feature requires: id/title/slug/author/date/image/content
   */
  excerpt?: string;
  category?: string;
  published?: boolean;
  readTime?: string;
  coverImage?: string;
};

export type Inquiry = {
  id: number;
  name: string;
  email: string;
  phone: string;
  property: string;
  message: string;
  date: string;
  status: "New" | "Replied" | "Closed";
};

// ─── Helper Functions ──────────────────────────────────────────────────────────

export function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export function getBlogPreviewText(content: string, maxLen = 160) {
  const plain = content
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (plain.length <= maxLen) return plain;
  return `${plain.slice(0, Math.max(0, maxLen - 1)).trim()}…`;
}

// ─── Firestore Data Functions ─────────────────────────────────────────────────
// Use these functions to interact with Firestore instead of local data

export {
  getBlogPosts,
  getBlogPostBySlug,
  getBlogPostById,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
  getInquiries,
  createInquiry,
  updateInquiryStatus,
  deleteInquiry,
  getAllBlogPostsIncludingDrafts,
  addProperty,
  getProperties,
  getPropertyById,
  deleteProperty,
  type FirestoreBlogPost,
  type FirestoreInquiry,
  type FirestoreProperty,
} from "./firestore";

// ─── Legacy Functions (for backwards compatibility) ────────────────────────────
// These functions are now deprecated and will return empty arrays
// Use the Firestore functions imported above instead

/** @deprecated Use getBlogPosts() from lib/firestore instead */
export function getAllBlogPosts() {
  console.warn("getAllBlogPosts() is deprecated. Use getBlogPosts() from lib/firestore instead.");
  return [];
}

/** @deprecated Use getBlogPostBySlug() from lib/firestore instead */
export function getBlogPostBySlugLegacy(_slug: string) {
  console.warn("getBlogPostBySlugLegacy() is deprecated. Use getBlogPostBySlug() from lib/firestore instead.");
  return undefined;
}

/** @deprecated Use createBlogPost() from lib/firestore instead */
export function createBlogPostLegacy(_input: {
  title: string;
  content: string;
  author: string;
  image?: string;
  seoTitle?: string;
  metaDescription?: string;
  keywords?: string[];
}) {
  console.warn("createBlogPostLegacy() is deprecated. Use createBlogPost() from lib/firestore instead.");
  return null;
}

// ─── Properties ──────────────────────────────────────────────────────────────

export const properties: Property[] = [
  {
    id: 1,
    title: "Oberoi Sky Gardens",
    location: "Worli Sea Face, Mumbai",
    city: "Mumbai",
    price: "₹18.5 Cr",
    priceNum: 18.5,
    type: "Penthouse",
    status: "Available",
    beds: 4,
    baths: 5,
    area: "5,200 sq.ft",
    tag: "Now Leasing",
    featured: true,
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=85",
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&q=85",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=85",
    ],
    description: "A masterpiece of contemporary architecture perched above the Arabian Sea. This full-floor penthouse offers unobstructed panoramic views, a private rooftop pool, and finishes sourced from the finest ateliers in Italy and Japan.",
    amenities: ["Private Pool", "Sea View", "Concierge", "Private Lift", "Smart Home", "Wine Cellar"],
  },
  {
    id: 2,
    title: "The Rattan Bungalow",
    location: "Lutyens Zone, New Delhi",
    city: "Delhi",
    price: "₹42 Cr",
    priceNum: 42,
    type: "Heritage Bungalow",
    status: "Available",
    beds: 6,
    baths: 7,
    area: "12,000 sq.ft",
    tag: "Heritage",
    featured: true,
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&q=85",
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1200&q=85",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=85",
    ],
    description: "One of Lutyens' Delhi's most storied bungalows. Built in 1936 and painstakingly restored, this heritage property sits on 1.2 acres of manicured gardens. Every corner tells a century of Delhi history.",
    amenities: ["Heritage Status", "1.2 Acre Garden", "Covered Parking 6", "Swimming Pool", "Staff Quarters", "Tennis Court"],
  },
  {
    id: 3,
    title: "Saffron Heights",
    location: "Banjara Hills, Hyderabad",
    city: "Hyderabad",
    price: "₹8.2 Cr",
    priceNum: 8.2,
    type: "Penthouse",
    status: "Coming Soon",
    beds: 3,
    baths: 4,
    area: "3,800 sq.ft",
    tag: "Coming Soon",
    featured: false,
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=85",
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=85",
    ],
    description: "Launching Q3 2025. An elegant sky residence in the heart of Banjara Hills with Hussain Sagar views, private sky gardens and bespoke Italian interiors.",
    amenities: ["Sky Garden", "Lake View", "Club Access", "Private Gym", "Concierge", "EV Charging"],
  },
  {
    id: 4,
    title: "The Maple Villa",
    location: "Koregaon Park, Pune",
    city: "Pune",
    price: "₹6.8 Cr",
    priceNum: 6.8,
    type: "Villa",
    status: "Available",
    beds: 5,
    baths: 5,
    area: "7,500 sq.ft",
    tag: "Exclusive",
    featured: true,
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1200&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1200&q=85",
      "https://images.unsplash.com/photo-1571939228382-b2f2b585ce15?w=1200&q=85",
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=1200&q=85",
    ],
    description: "A secluded garden villa nestled in Koregaon Park's leafy avenues. Designed by award-winning architect Neha Kapoor, this residence is a sanctuary of calm with a 40-ft lap pool and meditation garden.",
    amenities: ["Lap Pool", "Meditation Garden", "Home Theatre", "3-Car Garage", "Smart Security", "Solar Power"],
  },
  {
    id: 5,
    title: "The Crown Residences",
    location: "Alipore, Kolkata",
    city: "Kolkata",
    price: "₹12 Cr",
    priceNum: 12,
    type: "Apartment",
    status: "Sold",
    beds: 4,
    baths: 4,
    area: "4,200 sq.ft",
    tag: "Sold Out",
    featured: false,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=85",
    ],
    description: "Now fully sold. A landmark luxury development in old Calcutta's most prestigious address. All 8 residences were sold within 30 days of launch.",
    amenities: ["Concierge", "Rooftop Club", "Valet Parking", "Guest Suite", "Billiards Room", "Private Cinema"],
  },
  {
    id: 6,
    title: "Celadon Court",
    location: "Indiranagar, Bengaluru",
    city: "Bengaluru",
    price: "₹9.5 Cr",
    priceNum: 9.5,
    type: "Villa",
    status: "Available",
    beds: 4,
    baths: 4,
    area: "5,600 sq.ft",
    tag: "New Launch",
    featured: true,
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=85",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=85",
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&q=85",
    ],
    description: "A contemporary villa in the tech capital's most coveted neighbourhood. Designed for the modern professional — a private pool, dedicated work studio, and integrated smart-home ecosystem.",
    amenities: ["Private Pool", "Work Studio", "Smart Home", "Covered Parking", "Rooftop Deck", "EV Charging"],
  },
];

// ─── Team ─────────────────────────────────────────────────────────────────────

export const team: TeamMember[] = [
  {
    id: 1,
    name: "Rajiv Khanna",
    role: "Founder & Chairman",
    experience: "35 years",
    initials: "RK",
    bio: "Visionary founder who built Atibha from a single Mumbai office to a pan-India luxury empire over three decades.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
  },
  {
    id: 2,
    name: "Priya Mehrotra",
    role: "Chief Executive Officer",
    experience: "18 years",
    initials: "PM",
    bio: "Harvard-trained strategist driving Atibha's expansion into Tier-1 cities with a data-first approach to luxury real estate.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
  },
  {
    id: 3,
    name: "Arjun Singhania",
    role: "Head of Acquisitions",
    experience: "14 years",
    initials: "AS",
    bio: "Off-market specialist with an unparalleled network across Delhi, Mumbai and Hyderabad's elite property circles.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80",
  },
  {
    id: 4,
    name: "Neha Kapoor",
    role: "Design Director",
    experience: "12 years",
    initials: "NK",
    bio: "Award-winning interior architect who has transformed over 200 luxury residences across India and Southeast Asia.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80",
  },
];

// ─── Blog Posts (Seeded Data for Migration Reference) ────────────────────────

// These are the original seeded blog posts. They should be migrated to Firestore
// using the migration script. After migration, this data is kept for reference only.
export const SEED_BLOGS: BlogPost[] = [
  {
    id: 1,
    title: "Mumbai's Luxury Market: What ₹20 Cr Buys in 2025",
    slug: "mumbai-luxury-market-2025",
    excerpt: "From Worli sea-facing penthouses to Pali Hill bungalows — we decode what today's ultra-premium rupee gets you in India's financial capital.",
    content: `<h2>The New Mumbai Premium</h2><p>Mumbai's luxury real estate market has undergone a seismic shift post-2022. Where ₹20 crore once bought a 3-BHK in Bandra, that same budget now commands a full-floor penthouse in Worli with panoramic sea views and a private pool.</p><blockquote>"Buyers today don't just want square footage. They want a statement." — Rajiv Khanna, Founder</blockquote><h2>Top Micro-Markets</h2><p>Worli and Lower Parel have emerged as the dominant luxury corridors, with demand outpacing supply by nearly 40% in the ₹15–30 Cr segment. Bandra continues to command heritage premiums, especially for standalone bungalows near Hill Road.</p><p>Juhu and Versova are quietly becoming the new Bandra for buyers seeking sea adjacency without the Bandra price tag, with several ultra-luxury towers breaking ground in 2025.</p><h2>What to Expect</h2><p>Expert consensus points to continued appreciation through 2026, driven by NRI inflows and limited premium supply. Atibha Realty's advisory team recommends locking in acquisitions before the monsoon season when market activity typically slows.</p>`,
    category: "Market Insights",
    author: "Priya Mehrotra",
    date: "2025-01-15",
    published: true,
    readTime: "6 min read",
    coverImage: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=1200&q=85",
    image: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=1200&q=85",
    seoTitle: "Mumbai's Luxury Market: What ₹20 Cr Buys in 2025",
    metaDescription:
      "From Worli sea-facing penthouses to Pali Hill bungalows — we decode what today's ultra-premium rupee gets you in India's financial capital.",
    keywords: ["Mumbai", "luxury real estate", "market insights", "property"],
  },
  {
    id: 2,
    title: "The Art of the Heritage Bungalow: Delhi's Lutyens Legacy",
    slug: "delhi-lutyens-heritage-bungalow",
    excerpt: "Behind Delhi's most prestigious address lies a story of architecture, power, and legacy. We explore why Lutyens properties remain India's most coveted real estate.",
    content: `<h2>A City Within a City</h2><p>The 26 square kilometres known as Lutyens' Delhi represent the most tightly held real estate in the entire Indian subcontinent. Only around 5,000 bungalows exist in the zone, and fewer than 50 change hands in any given year.</p><blockquote>"Lutyens is not just an address. It is an institution." — Arjun Singhania, Head of Acquisitions</blockquote><h2>Architecture as Legacy</h2><p>Designed by Edwin Lutyens in the 1920s, the zone's buildings reflect a synthesis of Mughal grandeur and British colonial formalism — wide verandahs, red sandstone columns, and gardens designed to breathe even in Delhi's sweltering summers.</p><p>Many original bungalows remain in their colonial-era form, meticulously maintained by families who have held them since Independence. Modern renovations, when permitted, must respect strict heritage guidelines.</p><h2>The Investment Case</h2><p>Capital appreciation in Lutyens has outpaced the Sensex over any 10-year rolling period. With no new supply possible and demand driven by India's top industrialists, politicians and foreign embassies, scarcity is structurally guaranteed.</p>`,
    category: "Heritage",
    author: "Rajiv Khanna",
    date: "2025-01-08",
    published: true,
    readTime: "8 min read",
    coverImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=85",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=85",
    seoTitle: "The Art of the Heritage Bungalow: Delhi's Lutyens Legacy",
    metaDescription:
      "Behind Delhi's most prestigious address lies a story of architecture, power, and legacy. We explore why Lutyens properties remain India's most coveted real estate.",
    keywords: ["Delhi", "Lutyens", "heritage bungalow", "luxury real estate"],
  },
  {
    id: 3,
    title: "NRI Guide to Buying Luxury Property in India (2025 Edition)",
    slug: "nri-guide-luxury-property-india-2025",
    excerpt: "FEMA regulations, repatriation rules, tax implications, and trusted advisory — everything the overseas Indian needs before investing back home.",
    content: `<h2>The Regulatory Landscape</h2><p>Non-Resident Indians can purchase residential and commercial property in India without RBI approval, governed by the Foreign Exchange Management Act (FEMA). Agricultural land, plantation property and farmhouses remain restricted.</p><blockquote>"The paperwork is manageable. What NRIs truly need is trust." — Neha Kapoor, Design Director</blockquote><h2>Tax Considerations</h2><p>NRIs are subject to TDS at 20% on capital gains for properties held under two years and 12.5% for long-term gains. Tax treaties between India and countries like the USA, UK and UAE can significantly reduce this liability.</p><p>Rental income earned in India is taxable at standard slab rates, though maintenance costs and interest on home loans can be deducted. Many NRI investors structure ownership through HUF entities for tax efficiency.</p><h2>How Atibha Helps</h2><p>Our NRI Advisory Desk provides end-to-end support — from property identification and legal due diligence to documentation, registration, and post-purchase property management while you're overseas. We've facilitated over ₹800 crore in NRI acquisitions since 2018.</p>`,
    category: "Advisory",
    author: "Arjun Singhania",
    date: "2024-12-28",
    published: true,
    readTime: "10 min read",
    coverImage: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=85",
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=85",
    seoTitle: "NRI Guide to Buying Luxury Property in India (2025 Edition)",
    metaDescription:
      "FEMA regulations, repatriation rules, tax implications, and trusted advisory — everything the overseas Indian needs before investing back home.",
    keywords: ["NRI", "India", "property", "FEMA", "luxury real estate"],
  },
];

// Backwards-compatible alias (older imports may reference `blogPosts`)
// Note: These now point to seeded data for reference. Use getBlogPosts() from firestore.ts for live data.
export const blogs = SEED_BLOGS;
export const blogPosts = SEED_BLOGS;

// Backwards-compatible aliases (admin pages)
export const BLOGS = SEED_BLOGS;
export const PROPERTIES = properties;
export const TEAM = team;

// ─── Inquiries (Seeded Data for Reference) ─────────────────────────────────────

// These are sample inquiries for reference. Real inquiries are stored in Firestore.
export const SEED_INQUIRIES: Inquiry[] = [
  { id: 1, name: "Rajiv Malhotra", email: "rajiv.m@gmail.com", phone: "+91 98765 43210", property: "Oberoi Sky Gardens", message: "Interested in scheduling a site visit this weekend.", date: "2025-01-14", status: "New" },
  { id: 2, name: "Priya Venkataraman", email: "priya.v@yahoo.com", phone: "+91 87654 32109", property: "Saffron Heights", message: "Please send floor plans and detailed pricing for the pre-launch units.", date: "2025-01-13", status: "Replied" },
  { id: 3, name: "Meera Iyer", email: "meera.i@gmail.com", phone: "+91 65432 10987", property: "The Maple Villa", message: "Can we arrange a virtual tour for next Tuesday?", date: "2025-01-12", status: "New" },
  { id: 4, name: "Vikram Nair", email: "vikram.n@outlook.com", phone: "+91 54321 09876", property: "Celadon Court", message: "Looking for 4BHK in Bengaluru under ₹10 Cr. Is this negotiable?", date: "2025-01-10", status: "Closed" },
];

// Backwards-compatible alias - use getInquiries() from firestore.ts for live data
export const INQUIRIES = SEED_INQUIRIES;

// ─── Stats ────────────────────────────────────────────────────────────────────

export const stats = {
  properties: "480+",
  portfolio: "₹3,200 Cr",
  families: "1,500+",
  cities: "12",
  yearsActive: "22",
};
