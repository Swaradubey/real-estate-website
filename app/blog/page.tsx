"use client";

import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import Cursor from "@/components/site/Cursor";
import BlogHero from "@/components/site/BlogHero";
import BlogGrid from "@/components/site/BlogGrid";
import BlogPagination from "@/components/site/BlogPagination";
import { useEffect, useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { getBlogPosts, getBlogPreviewText, type FirestoreBlogPost } from "@/lib/firestore";
import { SEED_BLOGS } from "@/lib/data";
import Link from "next/link";

const POSTS_PER_PAGE = 6;

type BlogPost = {
  id: string;
  title: string;
  slug: string;
  author: string;
  date: string;
  image: string;
  content: string;
  excerpt?: string;
};

export default function BlogPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch blog posts from Firestore with fallback to seed data
  useEffect(() => {
    let isMounted = true;
    
    async function fetchPosts() {
      // Safety timeout: ensure loading always ends even if something goes wrong
      const safetyTimeout = setTimeout(() => {
        if (isMounted) {
          console.warn("[Blog Page] Safety timeout triggered - forcing loading to false");
          setLoading(false);
          setError("Request timed out. Showing cached content.");
        }
      }, 15000);
      
      try {
        setLoading(true);
        setError(null);
        
        console.log("[Blog Page] Starting to fetch posts from Firestore...");
        const firestorePosts = await getBlogPosts();
        
        if (!isMounted) {
          console.log("[Blog Page] Component unmounted, aborting state update");
          return;
        }
        
        // Format Firestore posts
        const formattedFirestorePosts: BlogPost[] = (firestorePosts || []).map((p) => ({
          id: p.id,
          title: p.title,
          slug: p.slug,
          author: p.author,
          date: p.date,
          image: p.image || p.coverImage || "",
          content: p.content,
          excerpt: p.excerpt,
        }));
        
        console.log(`[Blog Page] Formatted ${formattedFirestorePosts.length} Firestore posts:`, 
          formattedFirestorePosts.map(p => ({ id: p.id, title: p.title, date: p.date })));
        
        // Format seed blogs as fallback/complement
        const formattedSeedPosts: BlogPost[] = SEED_BLOGS.map((p) => ({
          id: String(p.id),
          title: p.title,
          slug: p.slug,
          author: p.author,
          date: p.date,
          image: p.image || p.coverImage || "",
          content: p.content,
          excerpt: p.excerpt,
        }));
        
        // Merge posts: Firestore posts take priority, seed posts fill in any gaps
        // Create a map of existing slugs to avoid duplicates
        const existingSlugs = new Set(formattedFirestorePosts.map(p => p.slug));
        const uniqueSeedPosts = formattedSeedPosts.filter(p => !existingSlugs.has(p.slug));
        
        // Combine: Firestore posts first, then unique seed posts
        const allPosts = [...formattedFirestorePosts, ...uniqueSeedPosts];
        
        // Sort by date descending (newest first)
        const sortedPosts = allPosts.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        
        console.log(`[Blog Page] Total posts after merge: ${sortedPosts.length} (${formattedFirestorePosts.length} from Firestore, ${uniqueSeedPosts.length} from seed)`);
        sortedPosts.forEach((p, i) => {
          console.log(`[Blog Page] Post ${i + 1}: "${p.title}" | date: ${p.date}`);
        });
        
        setPosts(sortedPosts);
        
        // Show warning if no Firestore posts found but seed posts exist
        if (formattedFirestorePosts.length === 0 && uniqueSeedPosts.length > 0) {
          console.warn("[Blog Page] No Firestore posts found, showing seed blogs only");
        }
      } catch (err) {
        console.error("[Blog Page] Error fetching blog posts:", err);
        
        if (!isMounted) return;
        
        // Set error for display but still show fallback content
        setError("Failed to load latest posts. Showing cached content.");
        
        // On error, use seed blogs as fallback instead of showing error
        const fallbackPosts: BlogPost[] = SEED_BLOGS.map((p) => ({
          id: String(p.id),
          title: p.title,
          slug: p.slug,
          author: p.author,
          date: p.date,
          image: p.image || p.coverImage || "",
          content: p.content,
          excerpt: p.excerpt,
        }));
        setPosts(fallbackPosts);
      } finally {
        clearTimeout(safetyTimeout);
        if (isMounted) {
          setLoading(false);
          console.log("[Blog Page] Loading complete");
        }
      }
    }
    
    fetchPosts();
    
    return () => {
      isMounted = false;
      console.log("[Blog Page] Component unmounted");
    };
  }, []);

  const handlePublishClick = () => {
    if (status === "authenticated" && session) {
      router.push("/admin/write-blog");
    } else {
      router.push("/login?callbackUrl=/admin/write-blog");
    }
  };

  // Pagination logic
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  const paginatedPosts = posts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Loading state
  if (loading) {
    return (
      <>
        <Cursor />
        <Navbar />
        <section className="w-full py-24 bg-[#f5f1ea] min-h-screen">
          <div className="w-full px-8 md:px-16 lg:px-24 2xl:px-32">
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold mx-auto mb-4"></div>
                <p className="text-muted font-body">Loading blog posts...</p>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Cursor />
      <Navbar />
      <section className="w-full pt-32 pb-24 bg-[#f5f1ea] min-h-screen">
        <div className="w-full px-8 md:px-16 lg:px-24 2xl:px-32">
          {/* Error Warning Banner - shows when there's an error but fallback content is available */}
          {error && posts.length > 0 && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8">
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <p className="text-amber-800 font-body text-sm">{error}</p>
              </div>
            </div>
          )}
          
          {/* Error state - only show when there are no posts at all */}
          {error && posts.length === 0 && (
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="text-center">
                <p className="text-red-600 font-body mb-4">{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="btn-gold"
                >
                  Try Again
                </button>
              </div>
            </div>
          )}

          {/* Main content - only show when there are posts */}
          {posts.length > 0 && (
            <>
              {/* Hero Section */}
              <BlogHero title="Latest Blogs" postCount={posts.length} />

              {/* Publish Blog CTA */}
              <section className="bg-panel border border-sand p-8 md:p-10 mb-12">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div>
                    <div className="label-tag mb-4">Write a Blog</div>
                    <h2 className="font-heading text-3xl md:text-4xl text-ink leading-tight">
                      Share your insights
                    </h2>
                    <p className="font-body text-sm text-muted mt-3 max-w-xl">
                      Want to publish a blog post? Login to access the blog editor and share your real estate expertise with our audience.
                    </p>
                  </div>
                  <button
                    onClick={handlePublishClick}
                    className="btn-gold shrink-0"
                  >
                    {status === "loading" ? "Loading..." : "Post a Blog"}
                  </button>
                </div>
              </section>

              {/* Blog Grid */}
              <BlogGrid
                posts={paginatedPosts}
                getExcerpt={getBlogPreviewText}
              />

              {/* Pagination */}
              <BlogPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </>
          )}

          {/* No posts state */}
          {!error && posts.length === 0 && (
            <div className="bg-panel border border-sand p-12 text-center">
              <h3 className="font-heading text-2xl text-ink mb-4">No Blog Posts Yet</h3>
              <p className="font-body text-muted mb-6">
                Be the first to share your real estate insights with our audience.
              </p>
              <button
                onClick={handlePublishClick}
                className="btn-gold"
              >
                Write Your First Blog
              </button>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
}
