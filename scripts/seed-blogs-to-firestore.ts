/**
 * Migration Script: Seed Blog Posts to Firestore
 * 
 * Run this script once to migrate the seeded blog posts from lib/data.ts to Firestore.
 * 
 * Usage: npx ts-node scripts/seed-blogs-to-firestore.ts
 * 
 * Prerequisites:
 * 1. Set up your .env.local with Firebase credentials
 * 2. Make sure Firestore is enabled in your Firebase project
 * 3. Install ts-node: npm install -D ts-node
 */

import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, collection, addDoc, query, where, getDocs, serverTimestamp } from "firebase/firestore";

// Firebase configuration from environment
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

// Seed blog posts data
const SEED_BLOGS = [
  {
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
    metaDescription: "From Worli sea-facing penthouses to Pali Hill bungalows — we decode what today's ultra-premium rupee gets you in India's financial capital.",
    keywords: ["Mumbai", "luxury real estate", "market insights", "property"],
  },
  {
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
    metaDescription: "Behind Delhi's most prestigious address lies a story of architecture, power, and legacy. We explore why Lutyens properties remain India's most coveted real estate.",
    keywords: ["Delhi", "Lutyens", "heritage bungalow", "luxury real estate"],
  },
  {
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
    metaDescription: "FEMA regulations, repatriation rules, tax implications, and trusted advisory — everything the overseas Indian needs before investing back home.",
    keywords: ["NRI", "India", "property", "FEMA", "luxury real estate"],
  },
];

async function seedBlogsToFirestore() {
  console.log("Starting blog posts migration to Firestore...");
  console.log("Project ID:", firebaseConfig.projectId);
  
  const blogsRef = collection(db, "blogs");
  let addedCount = 0;
  let skippedCount = 0;

  for (const blog of SEED_BLOGS) {
    try {
      // Check if post with this slug already exists
      const q = query(blogsRef, where("slug", "==", blog.slug));
      const existingDocs = await getDocs(q);

      if (!existingDocs.empty) {
        console.log(`Skipping "${blog.title}" - already exists with slug: ${blog.slug}`);
        skippedCount++;
        continue;
      }

      // Add the blog post
      await addDoc(blogsRef, {
        ...blog,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      
      console.log(`Added: "${blog.title}"`);
      addedCount++;
    } catch (error) {
      console.error(`Error adding "${blog.title}":`, error);
    }
  }

  console.log("\n--- Migration Summary ---");
  console.log(`Added: ${addedCount}`);
  console.log(`Skipped (already exists): ${skippedCount}`);
  console.log(`Total processed: ${SEED_BLOGS.length}`);
  console.log("-------------------------");
}

// Run the migration
seedBlogsToFirestore()
  .then(() => {
    console.log("\nMigration completed successfully!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("\nMigration failed:", error);
    process.exit(1);
  });
