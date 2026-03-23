import ClientBlogPost from "./ClientBlogPost";

// For static export, we need to provide all possible paths
// This generates all blog post pages at build time
export async function generateStaticParams() {
  try {
    // Import dynamically to avoid circular dependencies
    const { getBlogPosts } = await import("@/lib/firestore");
    const { SEED_BLOGS } = await import("@/lib/data");
    
    // Fetch from Firestore
    const firestorePosts = await getBlogPosts();
    
    // Combine with seed blogs
    const allSlugs = new Set([
      ...firestorePosts.map(p => p.slug),
      ...SEED_BLOGS.map(p => p.slug)
    ]);
    
    console.log("[generateStaticParams] Generated params for slugs:", Array.from(allSlugs));
    
    return Array.from(allSlugs).map((slug) => ({
      slug,
    }));
  } catch (error) {
    console.error("[generateStaticParams] Error generating params:", error);
    // Return empty array as fallback - will use client-side rendering
    return [];
  }
}

export default function Page({ params }: { params: { slug: string } }) {
  if (!params || !params.slug) {
    return <div>Post not found</div>;
  }

  console.log("[BlogPostPage] Rendering page with slug:", params.slug);
  return <ClientBlogPost slug={params.slug} />;
}
