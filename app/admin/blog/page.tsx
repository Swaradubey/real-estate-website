"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getBlogPosts } from "@/lib/firestore";
import { SEED_BLOGS } from "@/lib/data";
import type { FirestoreBlogPost } from "@/lib/firestore";

type BlogPost = {
  id: string;
  title: string;
  slug: string;
  author: string;
  date: string;
  image: string;
  published: boolean;
};

export default function AdminBlogPage() {
  const router = useRouter();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    
    async function fetchPosts() {
      try {
        setLoading(true);
        setError(null);
        
        console.log("[Admin Blog Page] Fetching posts from Firestore...");
        const firestorePosts = await getBlogPosts();
        
        if (!isMounted) return;
        
        // Format Firestore posts
        const formattedFirestorePosts: BlogPost[] = (firestorePosts || []).map((p) => ({
          id: p.id,
          title: p.title,
          slug: p.slug,
          author: p.author,
          date: p.date,
          image: p.image || p.coverImage || "",
          published: p.published ?? false,
        }));
        
        // Format seed posts as fallback/complement
        const formattedSeedPosts: BlogPost[] = SEED_BLOGS.map((p) => ({
          id: String(p.id),
          title: p.title,
          slug: p.slug,
          author: p.author,
          date: p.date,
          image: p.image || p.coverImage || "",
          published: true, // Seed blogs are always published
        }));
        
        // Merge posts: Firestore posts take priority, seed posts fill in gaps
        const existingSlugs = new Set(formattedFirestorePosts.map(p => p.slug));
        const uniqueSeedPosts = formattedSeedPosts.filter(p => !existingSlugs.has(p.slug));
        
        // Combine and sort by date descending (newest first)
        const allPosts = [...formattedFirestorePosts, ...uniqueSeedPosts].sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        
        console.log(`[Admin Blog Page] Total posts: ${allPosts.length}`);
        setPosts(allPosts);
      } catch (err) {
        console.error("[Admin Blog Page] Error fetching posts:", err);
        if (!isMounted) return;
        
        setError("Failed to load blog posts. Showing cached content.");
        
        // Fallback to seed blogs
        const fallbackPosts: BlogPost[] = SEED_BLOGS.map((p) => ({
          id: String(p.id),
          title: p.title,
          slug: p.slug,
          author: p.author,
          date: p.date,
          image: p.image || p.coverImage || "",
          published: true,
        }));
        setPosts(fallbackPosts);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }
    
    fetchPosts();
    
    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="p-4 sm:p-6 md:p-8">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold mx-auto mb-4"></div>
          <p className="text-muted font-body">Loading blog posts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6 md:space-y-8" style={{ fontFamily: "var(--font-body)" }}>
      {/* Header */}
      <div className="flex items-center justify-between pb-4 sm:pb-6 border-b border-gray-100">
        <div>
          <h1
            className="font-display text-2xl sm:text-3xl text-ink"
            style={{ fontWeight: 400 }}
          >
            Blog Posts
          </h1>
          <p className="font-body text-xs sm:text-sm text-muted mt-1">
            Manage and publish your articles
          </p>
        </div>
        <Link
          href="/admin/write-blog"
          className="font-body text-xs font-semibold tracking-widest uppercase text-black px-5 py-2.5 rounded-md transition-all duration-300 ease-out hover:-translate-y-0.5 shadow-lg hover:shadow-xl"
          style={{
            background: 'linear-gradient(135deg, #c8a45b, #b8963d)',
          }}
        >
          Create New Post
        </Link>
      </div>

      {/* Error Warning */}
      {error && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <p className="text-amber-800 font-body text-sm">{error}</p>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
        <div className="a-card p-4 sm:p-5 md:p-6">
          <div className="font-display text-2xl sm:text-3xl text-ink mb-1">
            {posts.length}
          </div>
          <div className="font-body text-xs sm:text-sm font-medium text-ink mb-1">
            Total Posts
          </div>
          <div className="font-body text-xs text-muted">
            {posts.filter(p => p.published).length} published
          </div>
        </div>
        <div className="a-card p-4 sm:p-5 md:p-6">
          <div className="font-display text-2xl sm:text-3xl text-ink mb-1">
            {posts.filter(p => !p.published).length}
          </div>
          <div className="font-body text-xs sm:text-sm font-medium text-ink mb-1">
            Drafts
          </div>
          <div className="font-body text-xs text-muted">
            Awaiting review
          </div>
        </div>
        <div className="a-card p-4 sm:p-5 md:p-6">
          <div className="font-display text-2xl sm:text-3xl text-ink mb-1">
            {posts.filter(p => p.published).length}
          </div>
          <div className="font-body text-xs sm:text-sm font-medium text-ink mb-1">
            Published
          </div>
          <div className="font-body text-xs text-muted">
            Live on site
          </div>
        </div>
        <div className="a-card p-4 sm:p-5 md:p-6">
          <div className="font-display text-2xl sm:text-3xl text-ink mb-1">
            ✍
          </div>
          <div className="font-body text-xs sm:text-sm font-medium text-ink mb-1">
            Write
          </div>
          <div className="font-body text-xs text-muted">
            Share insights
          </div>
        </div>
      </div>

      {/* Blog Posts List */}
      <div className="a-card p-4 sm:p-5 md:p-6">
        <div className="flex items-center justify-between mb-4 sm:mb-5">
          <h2
            className="font-display text-lg sm:text-xl text-ink"
            style={{ fontWeight: 400 }}
          >
            All Posts
          </h2>
          <div className="font-body text-xs text-muted">
            Sorted by date (newest first)
          </div>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="font-heading text-2xl text-ink mb-4">No Blog Posts Yet</h3>
            <p className="font-body text-muted mb-6 max-w-md mx-auto">
              Be the first to share your real estate insights with our audience.
            </p>
            <Link
              href="/admin/write-blog"
              className="inline-block font-body text-xs font-semibold tracking-widest uppercase text-black px-7 py-3 rounded-md transition-all duration-300 ease-out hover:-translate-y-0.5 shadow-lg hover:shadow-xl"
              style={{
                background: 'linear-gradient(135deg, #c8a45b, #b8963d)',
              }}
            >
              Write Your First Blog
            </Link>
          </div>
        ) : (
          <div className="space-y-3 sm:space-y-4">
            {posts.map((post) => (
              <div
                key={post.id}
                className="flex gap-3 sm:gap-4 pb-3 sm:pb-4 border-b border-gray-50 last:border-0 items-center"
              >
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-12 h-12 sm:w-14 sm:h-14 object-cover rounded flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="font-body text-xs sm:text-sm font-medium text-ink line-clamp-1">
                    {post.title}
                  </div>
                  <div className="font-body text-xs text-muted mt-0.5">
                    {post.author} · {post.date}
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span
                      className={`inline-block font-body text-[8px] sm:text-[9px] px-2 py-0.5 tracking-widest uppercase ${
                        post.published
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : "bg-gray-50 text-gray-600 border border-gray-200"
                      }`}
                    >
                      {post.published ? "Published" : "Draft"}
                    </span>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="font-body text-[8px] sm:text-[9px] text-gold tracking-widest uppercase hover:underline"
                    >
                      View →
                    </Link>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Link
                    href={`/admin/write-blog`}
                    className="font-body text-xs text-muted hover:text-gold transition-colors px-3 py-1.5 rounded-md hover:bg-gold/5"
                  >
                    Edit
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
