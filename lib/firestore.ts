import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  where,
  Timestamp,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "./firebase";
import type { BlogPost, Inquiry } from "./data";

// ─── Collection References ─────────────────────────────────────────────────────

const BLOGS_COLLECTION = "blogs";
const INQUIRIES_COLLECTION = "inquiries";
const ADMINS_COLLECTION = "admins";

// ─── Timeout Helper ────────────────────────────────────────────────────────────

/**
 * Wraps a promise with a timeout to prevent infinite loading states
 */
function withTimeout<T>(promise: Promise<T>, timeoutMs: number, errorMessage: string): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) => 
      setTimeout(() => reject(new Error(errorMessage)), timeoutMs)
    ),
  ]);
}

// ─── Blog Posts ────────────────────────────────────────────────────────────────

export interface FirestoreBlogPost extends Omit<BlogPost, "id"> {
  id: string;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Get all PUBLISHED blog posts from Firestore, sorted by date descending
 * Includes timeout protection and multiple fallback strategies
 * Filters out unpublished drafts for public display
 * @returns Array of published blog posts (empty if Firebase fails)
 */
export async function getBlogPosts(): Promise<FirestoreBlogPost[]> {
  // Safety check: if db is not initialized, return empty array immediately
  if (!db) {
    console.warn("[Blog Fetch] Firestore not initialized. Please check your NEXT_PUBLIC_FIREBASE_* environment variables in .env.local");
    return [];
  }

  const blogsRef = collection(db, BLOGS_COLLECTION);
  
  console.log("[Blog Fetch] Starting to fetch blog posts from Firestore...");
  
  // Try simple query first (no composite index required) - with 8 second timeout
  try {
    const snapshot = await withTimeout(
      getDocs(blogsRef),
      8000,
      "Firebase query timed out after 8 seconds"
    );
    
    console.log(`[Blog Fetch] Raw Firestore docs count: ${snapshot.docs.length}`);
    
    const posts = snapshot.docs
      .map((doc) => {
        const data = doc.data();
        console.log(`[Blog Fetch] Processing doc ${doc.id}:`, { 
          title: data.title, 
          published: data.published,
          date: data.date,
          hasCreatedAt: !!data.createdAt
        });
        return {
          id: doc.id,
          title: data.title || "",
          slug: data.slug || "",
          content: data.content || "",
          author: data.author || "",
          date: data.date || "",
          image: data.image || "",
          seoTitle: data.seoTitle || "",
          metaDescription: data.metaDescription || "",
          keywords: data.keywords || [],
          excerpt: data.excerpt || "",
          category: data.category,
          published: data.published ?? true, // Treat missing published as true
          readTime: data.readTime,
          coverImage: data.coverImage,
          createdAt: timestampToString(data.createdAt),
          updatedAt: timestampToString(data.updatedAt),
        } as FirestoreBlogPost;
      })
      // Filter to only published posts (treat missing/null/undefined as true for backwards compatibility)
      .filter((post) => {
        const isPublished = post.published !== false; // Only hide if explicitly set to false
        if (!isPublished) {
          console.log(`[Blog Fetch] Filtering out unpublished post: ${post.title}`);
        }
        return isPublished;
      })
      // Sort by date descending (newest first) - use createdAt as fallback for date
      .sort((a, b) => {
        const dateA = a.date || a.createdAt || "";
        const dateB = b.date || b.createdAt || "";
        return new Date(dateB).getTime() - new Date(dateA).getTime();
      });
    
    console.log(`[Blog Fetch] Successfully fetched and processed ${posts.length} published posts from Firestore`);
    posts.forEach((post, i) => {
      console.log(`[Blog Fetch] Post ${i + 1}: "${post.title}" | date: ${post.date} | published: ${post.published}`);
    });
    return posts;
  } catch (error) {
    console.error("[Blog Fetch] Firebase query failed:", error);
    // Return empty array instead of throwing - let caller handle with fallback data
    return [];
  }
}

/**
 * Get ALL blog posts from Firestore (including unpublished drafts)
 * Use this for admin pages only
 * @returns Array of all blog posts (empty if Firebase fails)
 */
export async function getAllBlogPostsIncludingDrafts(): Promise<FirestoreBlogPost[]> {
  if (!db) {
    console.warn("[Blog Fetch] Firestore not initialized. Please check your NEXT_PUBLIC_FIREBASE_* environment variables in .env.local");
    return [];
  }

  const blogsRef = collection(db, BLOGS_COLLECTION);
  
  try {
    const q = query(blogsRef, orderBy("date", "desc"));
    const snapshot = await withTimeout(
      getDocs(q),
      8000,
      "Firebase query timed out after 8 seconds"
    );

    return snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        title: data.title || "",
        slug: data.slug || "",
        content: data.content || "",
        author: data.author || "",
        date: data.date || "",
        image: data.image || "",
        seoTitle: data.seoTitle || "",
        metaDescription: data.metaDescription || "",
        keywords: data.keywords || [],
        excerpt: data.excerpt || "",
        category: data.category,
        published: data.published ?? true,
        readTime: data.readTime,
        coverImage: data.coverImage,
        createdAt: timestampToString(data.createdAt),
        updatedAt: timestampToString(data.updatedAt),
      } as FirestoreBlogPost;
    });
  } catch (error) {
    console.error("[Blog Fetch] Failed to fetch all posts:", error);
    return [];
  }
}

/**
 * Get a single blog post by slug
 * Includes timeout protection
 */
export async function getBlogPostBySlug(slug: string): Promise<FirestoreBlogPost | null> {
  // Safety check: if db is not initialized, return null immediately
  if (!db) {
    console.warn("Firestore not initialized. Please check your NEXT_PUBLIC_FIREBASE_* environment variables in .env.local");
    return null;
  }

  try {
    const blogsRef = collection(db, BLOGS_COLLECTION);
    const q = query(blogsRef, where("slug", "==", slug));
    const snapshot = await withTimeout(
      getDocs(q),
      8000,
      "Firebase query timed out after 8 seconds"
    );

    if (snapshot.empty) {
      return null;
    }

    const doc = snapshot.docs[0];
    const data = doc.data();

    return {
      id: doc.id,
      title: data.title || "",
      slug: data.slug || "",
      content: data.content || "",
      author: data.author || "",
      date: data.date || "",
      image: data.image || "",
      seoTitle: data.seoTitle || "",
      metaDescription: data.metaDescription || "",
      keywords: data.keywords || [],
      excerpt: data.excerpt || "",
      category: data.category,
      published: data.published ?? true,
      readTime: data.readTime,
      coverImage: data.coverImage,
      createdAt: timestampToString(data.createdAt),
      updatedAt: timestampToString(data.updatedAt),
    } as FirestoreBlogPost;
  } catch (error) {
    console.error("Error fetching blog post by slug:", error);
    return null;
  }
}

/**
 * Get a single blog post by ID
 */
export async function getBlogPostById(id: string): Promise<FirestoreBlogPost | null> {
  if (!db) {
    console.warn("Firestore not initialized. Please check your NEXT_PUBLIC_FIREBASE_* environment variables in .env.local");
    return null;
  }

  try {
    const docRef = doc(db, BLOGS_COLLECTION, id);
    const snapshot = await getDoc(docRef);

    if (!snapshot.exists()) {
      return null;
    }

    const data = snapshot.data();
    return {
      id: snapshot.id,
      title: data.title || "",
      slug: data.slug || "",
      content: data.content || "",
      author: data.author || "",
      date: data.date || "",
      image: data.image || "",
      seoTitle: data.seoTitle || "",
      metaDescription: data.metaDescription || "",
      keywords: data.keywords || [],
      excerpt: data.excerpt || "",
      category: data.category,
      published: data.published ?? true,
      readTime: data.readTime,
      coverImage: data.coverImage,
      createdAt: timestampToString(data.createdAt),
      updatedAt: timestampToString(data.updatedAt),
    } as FirestoreBlogPost;
  } catch (error) {
    console.error("Error fetching blog post by ID:", error);
    return null;
  }
}

/**
 * Create a new blog post
 */
export async function createBlogPost(input: {
  title: string;
  content: string;
  author: string;
  image?: string;
  seoTitle?: string;
  metaDescription?: string;
  keywords?: string[];
}): Promise<FirestoreBlogPost> {
  if (!db) {
    const error = new Error("Firestore not initialized. Please check your NEXT_PUBLIC_FIREBASE_* environment variables in .env.local");
    console.error("[Blog Create] ERROR:", error.message);
    throw error;
  }

  const now = new Date();
  const date = now.toISOString().slice(0, 10);

  // Generate slug from title
  const baseSlug = slugify(input.title) || `post-${now.getTime()}`;
  let slug = baseSlug;
  
  // Check for existing slugs and append number if needed
  const existingPosts = await getBlogPosts();
  let i = 2;
  while (existingPosts.some((p) => p.slug === slug)) {
    slug = `${baseSlug}-${i++}`;
  }

  // Generate excerpt from content
  const excerpt = getBlogPreviewText(input.content, 170);

  const blogData = {
    title: input.title.trim(),
    slug,
    content: input.content.trim(),
    author: input.author.trim(),
    date,
    image: input.image?.trim() || "",
    seoTitle: input.seoTitle?.trim() || input.title.trim(),
    metaDescription: input.metaDescription?.trim() || "",
    keywords: Array.isArray(input.keywords) ? input.keywords : [],
    excerpt,
    published: true,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };

  console.log("[Blog Create] Attempting to create blog post with data:", { title: input.title, slug, collection: BLOGS_COLLECTION });
  
  try {
    const docRef = await addDoc(collection(db, BLOGS_COLLECTION), blogData);
    console.log("[Blog Create] SUCCESS: Blog post created with ID:", docRef.id, "in collection:", BLOGS_COLLECTION);

    return {
      id: docRef.id,
      ...blogData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    } as FirestoreBlogPost;
  } catch (error: any) {
    console.error("[Blog Create] FIRESTORE ERROR: Failed to write to collection 'blogs'");
    console.error("[Blog Create] Error Code:", error?.code || "unknown");
    console.error("[Blog Create] Error Message:", error?.message || "No message available");
    
    if (error?.code === "permission-denied") {
      console.error("[Blog Create] TIP: Ensure your Firestore security rules allow writes for authenticated users.");
    }
    
    throw error;
  }
}

/**
 * Update an existing blog post
 */
export async function updateBlogPost(
  id: string,
  input: Partial<{
    title: string;
    content: string;
    author: string;
    image: string;
    seoTitle: string;
    metaDescription: string;
    keywords: string[];
    published: boolean;
  }>
): Promise<void> {
  if (!db) {
    throw new Error("Firestore not initialized. Please check your NEXT_PUBLIC_FIREBASE_* environment variables in .env.local");
  }

  const docRef = doc(db, BLOGS_COLLECTION, id);

  const updateData: Record<string, unknown> = {
    ...input,
    updatedAt: serverTimestamp(),
  };

  // Regenerate excerpt if content changed
  if (input.content) {
    updateData.excerpt = getBlogPreviewText(input.content, 170);
  }

  await updateDoc(docRef, updateData);
  console.log("[Blog Update] SUCCESS: Blog post updated with ID:", id);
}

/**
 * Delete a blog post
 */
export async function deleteBlogPost(id: string): Promise<void> {
  if (!db) {
    throw new Error("Firestore not initialized. Please check your NEXT_PUBLIC_FIREBASE_* environment variables in .env.local");
  }

  const docRef = doc(db, BLOGS_COLLECTION, id);
  await deleteDoc(docRef);
  console.log("[Blog Delete] SUCCESS: Blog post deleted with ID:", id);
}

// ─── Inquiries ─────────────────────────────────────────────────────────────────

export interface FirestoreInquiry extends Omit<Inquiry, "id"> {
  id: string;
  createdAt?: string;
}

/**
 * Get all inquiries from Firestore
 */
export async function getInquiries(): Promise<FirestoreInquiry[]> {
  if (!db) {
    console.warn("[Inquiries] Firestore not initialized. Please check your NEXT_PUBLIC_FIREBASE_* environment variables in .env.local");
    return [];
  }

  try {
    const inquiriesRef = collection(db, INQUIRIES_COLLECTION);
    const q = query(inquiriesRef, orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        name: data.name || "",
        email: data.email || "",
        phone: data.phone || "",
        property: data.property || "",
        message: data.message || "",
        date: data.date || "",
        status: data.status || "New",
        createdAt: timestampToString(data.createdAt),
      } as FirestoreInquiry;
    });
  } catch (error) {
    console.error("Error fetching inquiries:", error);
    return [];
  }
}

/**
 * Create a new inquiry from contact form
 */
export async function createInquiry(input: {
  name: string;
  email: string;
  phone: string;
  property: string;
  message: string;
}): Promise<FirestoreInquiry> {
  if (!db) {
    const error = new Error("Firestore not initialized. Please check your NEXT_PUBLIC_FIREBASE_* environment variables in .env.local");
    console.error("[Inquiry Create] ERROR:", error.message);
    throw error;
  }

  const now = new Date();
  const date = now.toISOString().slice(0, 10);

  const inquiryData = {
    name: input.name.trim(),
    email: input.email.trim(),
    phone: input.phone.trim(),
    property: input.property.trim(),
    message: input.message.trim(),
    date,
    status: "New" as const,
    createdAt: serverTimestamp(),
  };

  console.log("[Inquiry Create] Attempting to create inquiry with data:", { name: input.name, email: input.email, collection: INQUIRIES_COLLECTION });
  
  try {
    const docRef = await addDoc(collection(db, INQUIRIES_COLLECTION), inquiryData);
    console.log("[Inquiry Create] SUCCESS: Inquiry created with ID:", docRef.id, "in collection:", INQUIRIES_COLLECTION);

    return {
      id: docRef.id,
      ...inquiryData,
      createdAt: new Date().toISOString(),
    } as FirestoreInquiry;
  } catch (error) {
    console.error("[Inquiry Create] ERROR: Failed to write to Firestore collection '", INQUIRIES_COLLECTION, "':");
    console.error("[Inquiry Create] Error details:", error);
    if (error instanceof Error) {
      console.error("[Inquiry Create] Error message:", error.message);
    }
    throw error;
  }
}

/**
 * Update inquiry status
 */
export async function updateInquiryStatus(
  id: string,
  status: "New" | "Replied" | "Closed"
): Promise<void> {
  if (!db) {
    throw new Error("Firestore not initialized. Please check your NEXT_PUBLIC_FIREBASE_* environment variables in .env.local");
  }

  const docRef = doc(db, INQUIRIES_COLLECTION, id);
  await updateDoc(docRef, { status });
  console.log("[Inquiry Update] SUCCESS: Inquiry status updated for ID:", id, "to:", status);
}

/**
 * Delete an inquiry
 */
export async function deleteInquiry(id: string): Promise<void> {
  if (!db) {
    throw new Error("Firestore not initialized. Please check your NEXT_PUBLIC_FIREBASE_* environment variables in .env.local");
  }

  const docRef = doc(db, INQUIRIES_COLLECTION, id);
  await deleteDoc(docRef);
  console.log("[Inquiry Delete] SUCCESS: Inquiry deleted with ID:", id);
}

// ─── Helper Functions ──────────────────────────────────────────────────────────

/**
 * Convert Firestore Timestamp to ISO string for serialization
 * Handles Firestore Timestamp objects and converts them to serializable strings
 */
function timestampToString(timestamp: unknown): string | null {
  if (!timestamp) return null;
  
  // Handle Firestore Timestamp
  if (timestamp instanceof Timestamp) {
    return timestamp.toDate().toISOString();
  }
  
  // Handle objects with toDate method (Firestore Timestamp-like)
  if (typeof timestamp === "object" && timestamp !== null && "toDate" in timestamp) {
    const ts = timestamp as { toDate: () => Date };
    if (typeof ts.toDate === "function") {
      return ts.toDate().toISOString();
    }
  }
  
  // Already a string
  if (typeof timestamp === "string") {
    return timestamp;
  }
  
  return null;
}

/**
 * Convert a string to a URL-friendly slug
 */
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

/**
 * Generate a preview text from HTML content
 */
export function getBlogPreviewText(content: string, maxLen = 160): string {
  const plain = content
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (plain.length <= maxLen) return plain;
  return `${plain.slice(0, Math.max(0, maxLen - 1)).trim()}…`;
}

// ─── Properties ────────────────────────────────────────────────────────────────

const PROPERTIES_COLLECTION = "properties";

export interface FirestoreProperty {
  id: string;
  title: string;
  location: string;
  price: number;
  status: string;
  image: string;
  createdAt?: string;
}

/**
 * Add a new property to Firestore
 */
export async function addProperty(input: {
  title: string;
  location: string;
  price: number;
  status: string;
  image: string;
}): Promise<FirestoreProperty> {
  if (!db) {
    const error = new Error("Firestore not initialized. Please check your NEXT_PUBLIC_FIREBASE_* environment variables in .env.local");
    console.error("[Property Create] ERROR:", error.message);
    throw error;
  }

  const propertyData = {
    title: input.title.trim(),
    location: input.location.trim(),
    price: input.price,
    status: input.status.trim(),
    image: input.image.trim(),
    createdAt: serverTimestamp(),
  };

  console.log("[Property Create] Attempting to create property with data:", { title: input.title, location: input.location, collection: PROPERTIES_COLLECTION });
  
  try {
    const docRef = await addDoc(collection(db, PROPERTIES_COLLECTION), propertyData);
    console.log("[Property Create] SUCCESS: Property created with ID:", docRef.id, "in collection:", PROPERTIES_COLLECTION);

    return {
      id: docRef.id,
      ...propertyData,
      createdAt: new Date().toISOString(),
    } as FirestoreProperty;
  } catch (error) {
    console.error("[Property Create] ERROR: Failed to write to Firestore collection '", PROPERTIES_COLLECTION, "':");
    console.error("[Property Create] Error details:", error);
    if (error instanceof Error) {
      console.error("[Property Create] Error message:", error.message);
    }
    throw error;
  }
}

/**
 * Get all properties from Firestore
 */
export async function getProperties(): Promise<FirestoreProperty[]> {
  if (!db) {
    console.warn("[Properties] Firestore not initialized. Please check your NEXT_PUBLIC_FIREBASE_* environment variables in .env.local");
    return [];
  }

  try {
    const propertiesRef = collection(db, PROPERTIES_COLLECTION);
    const q = query(propertiesRef, orderBy("createdAt", "desc"));
    const snapshot = await withTimeout(
      getDocs(q),
      8000,
      "Properties query timed out after 8 seconds"
    );

    const properties = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        title: data.title || "",
        location: data.location || "",
        price: data.price || 0,
        status: data.status || "Available",
        image: data.image || "",
        createdAt: timestampToString(data.createdAt),
      } as FirestoreProperty;
    });

    console.log(`[Properties] Successfully fetched ${properties.length} properties from Firestore`);
    return properties;
  } catch (error) {
    console.error("[Properties] Error fetching properties:", error);
    return [];
  }
}

/**
 * Get a single property by ID
 */
export async function getPropertyById(id: string): Promise<FirestoreProperty | null> {
  if (!db) {
    console.warn("Firestore not initialized. Please check your NEXT_PUBLIC_FIREBASE_* environment variables in .env.local");
    return null;
  }

  try {
    const docRef = doc(db, PROPERTIES_COLLECTION, id);
    const snapshot = await getDoc(docRef);

    if (!snapshot.exists()) {
      return null;
    }

    const data = snapshot.data();
    return {
      id: snapshot.id,
      title: data.title || "",
      location: data.location || "",
      price: data.price || 0,
      status: data.status || "Available",
      image: data.image || "",
      createdAt: timestampToString(data.createdAt),
    } as FirestoreProperty;
  } catch (error) {
    console.error("Error fetching property by ID:", error);
    return null;
  }
}

/**
 * Delete a property
 */
export async function deleteProperty(id: string): Promise<void> {
  if (!db) {
    throw new Error("Firestore not initialized. Please check your NEXT_PUBLIC_FIREBASE_* environment variables in .env.local");
  }
  const docRef = doc(db, PROPERTIES_COLLECTION, id);
  await deleteDoc(docRef);
  console.log("[Property Delete] SUCCESS: Property deleted with ID:", id);
}