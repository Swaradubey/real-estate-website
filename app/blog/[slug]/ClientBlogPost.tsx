"use client";

import Link from "next/link";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import Cursor from "@/components/site/Cursor";
import BlogCard from "@/components/site/BlogCard";
import { useEffect, useMemo, useState } from "react";
import { getBlogPostBySlug, getBlogPosts, getBlogPreviewText, type FirestoreBlogPost } from "@/lib/firestore";
import { SEED_BLOGS } from "@/lib/data";

export default function ClientBlogPost({ slug }: { slug: string }) {
  const [post, setPost] = useState<FirestoreBlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<FirestoreBlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    
    async function fetchPost() {
      // Safety timeout: ensure loading always ends
      const safetyTimeout = setTimeout(() => {
        if (isMounted) {
          console.warn("Safety timeout triggered in ClientBlogPost - forcing loading to false");
          setLoading(false);
        }
      }, 15000);
      
      try {
        setLoading(true);
        setError(null);
        
        console.log("[ClientBlogPost] === FETCHING POST ===");
        console.log("[ClientBlogPost] Received slug:", slug);
        console.log("[ClientBlogPost] Slug type:", typeof slug);
        console.log("[ClientBlogPost] Slug length:", slug?.length);
        
        // DEBUG: Log all available slugs from both sources
        try {
          const { getBlogPosts } = await import("@/lib/firestore");
          const { SEED_BLOGS } = await import("@/lib/data");
          
          const firestorePosts = await getBlogPosts();
          console.log("[ClientBlogPost] Available Firestore slugs:", firestorePosts.map(p => p.slug));
          console.log("[ClientBlogPost] Available SEED slugs:", SEED_BLOGS.map(p => p.slug));
          console.log("[ClientBlogPost] ALL available slugs:", [
            ...firestorePosts.map(p => p.slug),
            ...SEED_BLOGS.map(p => p.slug)
          ]);
        } catch (debugError) {
          console.error("[ClientBlogPost] Debug logging failed:", debugError);
        }
        
        // First try to fetch from Firestore
        let fetchedPost = await getBlogPostBySlug(slug);
        let allPosts: FirestoreBlogPost[] = [];
        
        if (fetchedPost) {
          // Found in Firestore
          console.log("[ClientBlogPost] ✓ Post found in Firestore:", fetchedPost.title);
          if (isMounted) {
            setPost(fetchedPost);
          }
          allPosts = await getBlogPosts();
        } else {
          // Not found in Firestore - try fallback data
          console.log("[ClientBlogPost] ✗ Post NOT found in Firestore, checking fallback data...");
          const fallbackPost = SEED_BLOGS.find((p) => p.slug === slug);
          
          if (fallbackPost) {
            console.log("[ClientBlogPost] ✓ Post found in fallback data:", fallbackPost.title);
            // Convert BlogPost to FirestoreBlogPost format
            const convertedPost: FirestoreBlogPost = {
              id: String(fallbackPost.id),
              title: fallbackPost.title,
              slug: fallbackPost.slug,
              content: fallbackPost.content,
              author: fallbackPost.author,
              date: fallbackPost.date,
              image: fallbackPost.image || fallbackPost.coverImage || "",
              seoTitle: fallbackPost.seoTitle,
              metaDescription: fallbackPost.metaDescription,
              keywords: fallbackPost.keywords,
              excerpt: fallbackPost.excerpt,
              category: fallbackPost.category,
              published: fallbackPost.published ?? true,
              readTime: fallbackPost.readTime,
              coverImage: fallbackPost.coverImage,
            };
            if (isMounted) {
              setPost(convertedPost);
            }
          } else {
            console.log("[ClientBlogPost] ✗✗✗ Post NOT FOUND anywhere!");
            console.log("[ClientBlogPost] Searched for slug:", slug);
            console.log("[ClientBlogPost] This slug does not exist in Firestore or seed data.");
            if (isMounted) {
              setPost(null);
            }
          }
          
          // Get related posts from fallback data
          allPosts = SEED_BLOGS
            .filter((p) => p.slug !== slug)
            .map((p) => ({
              id: String(p.id),
              title: p.title,
              slug: p.slug,
              content: p.content,
              author: p.author,
              date: p.date,
              image: p.image || p.coverImage || "",
              seoTitle: p.seoTitle,
              metaDescription: p.metaDescription,
              keywords: p.keywords,
              excerpt: p.excerpt,
              category: p.category,
              published: p.published ?? true,
              readTime: p.readTime,
              coverImage: p.coverImage,
            }));
        }
        
        if (isMounted) {
          setRelatedPosts(allPosts.filter((p) => p.slug !== slug).slice(0, 3));
        }
      } catch (err) {
        console.error("[ClientBlogPost] ❌ Error fetching post:", err);
        
        // Try fallback data on error
        const fallbackPost = SEED_BLOGS.find((p) => p.slug === slug);
        if (fallbackPost && isMounted) {
          console.log("[ClientBlogPost] Using fallback data due to error");
          const convertedPost: FirestoreBlogPost = {
            id: String(fallbackPost.id),
            title: fallbackPost.title,
            slug: fallbackPost.slug,
            content: fallbackPost.content,
            author: fallbackPost.author,
            date: fallbackPost.date,
            image: fallbackPost.image || fallbackPost.coverImage || "",
            seoTitle: fallbackPost.seoTitle,
            metaDescription: fallbackPost.metaDescription,
            keywords: fallbackPost.keywords,
            excerpt: fallbackPost.excerpt,
            category: fallbackPost.category,
            published: fallbackPost.published ?? true,
            readTime: fallbackPost.readTime,
            coverImage: fallbackPost.coverImage,
          };
          setPost(convertedPost);
          
          const fallbackRelated = SEED_BLOGS
            .filter((p) => p.slug !== slug)
            .map((p) => ({
              id: String(p.id),
              title: p.title,
              slug: p.slug,
              content: p.content,
              author: p.author,
              date: p.date,
              image: p.image || p.coverImage || "",
              seoTitle: p.seoTitle,
              metaDescription: p.metaDescription,
              keywords: p.keywords,
              excerpt: p.excerpt,
              category: p.category,
              published: p.published ?? true,
              readTime: p.readTime,
              coverImage: p.coverImage,
            }));
          setRelatedPosts(fallbackRelated.slice(0, 3));
        } else if (isMounted) {
          setError("Failed to load the blog post.");
        }
      } finally {
        clearTimeout(safetyTimeout);
        if (isMounted) {
          setLoading(false);
          console.log("[ClientBlogPost] === FETCH COMPLETE ===");
        }
      }
    }
    
    fetchPost();
    
    return () => {
      isMounted = false;
    };
  }, [slug]);

  const formattedDate = useMemo(() => {
    if (!post) return "";
    return new Date(post.date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }, [post]);

  if (loading) {
    return (
      <>
        <Cursor />
        <Navbar />
        <div className="pt-32 pb-20 bg-cream min-h-screen">
          <div className="max-w-3xl mx-auto px-6 md:px-10">
            <div className="bg-panel border border-sand p-10 font-body text-sm text-muted text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gold mx-auto mb-4"></div>
              Loading post...
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Cursor />
        <Navbar />
        <div className="pt-32 pb-20 bg-cream min-h-screen">
          <div className="max-w-3xl mx-auto px-6 md:px-10">
            <div className="mb-10">
              <Link href="/blog" className="btn-outline">
                Back to Blog
              </Link>
            </div>
            <div className="bg-panel border border-sand p-10 text-center">
              <div className="font-heading text-xl text-ink mb-2">Error</div>
              <p className="font-body text-sm text-muted mb-4">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="btn-gold"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (!post) {
    // DEBUG: Show available slugs when post not found
    return (
      <>
        <Cursor />
        <Navbar />
        <div className="pt-32 pb-20 bg-cream min-h-screen">
          <div className="max-w-3xl mx-auto px-6 md:px-10">
            <div className="mb-10">
              <Link href="/blog" className="btn-outline">
                Back to Blog
              </Link>
            </div>
            <div className="bg-panel border border-sand p-10">
              <div className="font-heading text-xl text-ink mb-4">Post not found</div>
              <p className="font-body text-sm text-muted mb-6">
                This post may have been removed or the link is incorrect.
              </p>
              
              {/* DEBUG INFO */}
              <div className="bg-red-50 border border-red-200 rounded p-6 mb-6">
                <div className="font-heading text-lg text-red-800 mb-3">DEBUG INFORMATION:</div>
                <div className="font-body text-xs text-red-700 space-y-2">
                  <p><strong>Requested slug:</strong> "{slug}"</p>
                  <p><strong>This slug does not exist in our database.</strong></p>
                  <p className="mt-4"><strong>Available test slugs (click to test):</strong></p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <Link href="/blog/mumbai-luxury-market-2025" className="px-3 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600">
                      mumbai-luxury-market-2025
                    </Link>
                    <Link href="/blog/delhi-lutyens-heritage-bungalow" className="px-3 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600">
                      delhi-lutyens-heritage-bungalow
                    </Link>
                    <Link href="/blog/nri-guide-luxury-property-india-2025" className="px-3 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600">
                      nri-guide-luxury-property-india-2025
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const looksLikeHtml = /<\/[a-z][\s\S]*>/i.test(post.content);
  const featuredImage = post.image || post.coverImage || "";

  return (
    <>
      <Cursor />
      <Navbar />
      <div className="pt-32 pb-20 bg-cream min-h-screen">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          <div className="mb-10">
            <Link href="/blog" className="btn-outline">
              Back to Blog
            </Link>
          </div>

          <header className="mb-12 max-w-6xl">
            <div className="font-body text-xs text-muted mb-4">
              {formattedDate} · {post.author}
            </div>
            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl text-ink leading-tight">
              {post.title}
            </h1>
          </header>

          <article
            className="bg-panel border border-sand p-8 md:p-12 lg:p-16"
            itemScope
            itemType="https://schema.org/BlogPosting"
          >
            <meta itemProp="headline" content={post.title} />
            <meta itemProp="datePublished" content={new Date(post.date).toISOString()} />
            <meta itemProp="author" content={post.author} />
            {featuredImage ? (
              <div className="mb-8 border border-sand overflow-hidden">
                <img
                  src={featuredImage}
                  alt={`Featured image for ${post.title}`}
                  className="w-full h-auto max-h-[28rem] object-cover"
                  loading="eager"
                />
              </div>
            ) : null}
            {looksLikeHtml ? (
              <div
                className={[
                  "prose-atibha",
                  // Headings
                  "[&_h1]:font-heading [&_h1]:text-4xl [&_h1]:md:text-5xl [&_h1]:font-bold [&_h1]:text-ink [&_h1]:leading-tight [&_h1]:mt-0 [&_h1]:mb-6",
                  "[&_h2]:font-heading [&_h2]:text-3xl [&_h2]:md:text-4xl [&_h2]:font-semibold [&_h2]:text-ink [&_h2]:leading-tight [&_h2]:mt-10 [&_h2]:mb-4",
                  "[&_h3]:font-heading [&_h3]:text-2xl [&_h3]:font-semibold [&_h3]:text-ink [&_h3]:leading-snug [&_h3]:mt-8 [&_h3]:mb-3",
                  // Paragraphs
                  "[&_p]:font-body [&_p]:text-lg [&_p]:md:text-xl [&_p]:text-ink [&_p]:leading-relaxed [&_p]:my-4",
                  // Inline styles
                  "[&_strong]:font-semibold",
                  "[&_em]:italic",
                  // Lists
                  "[&_ul]:list-disc [&_ul]:pl-6 [&_ul]:my-4",
                  "[&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:my-4",
                  "[&_li]:my-1",
                  // Horizontal rules from the editor
                  "[&_hr]:border-t [&_hr]:border-sand [&_hr]:my-8",
                  // Rich text images
                  "[&_img]:max-w-full [&_img]:w-full [&_img]:h-auto [&_img]:rounded-lg [&_img]:my-6",
                  // Alignment helpers for Quill's alignment classes
                  "[&_p.ql-align-center]:text-center",
                  "[&_p.ql-align-right]:text-right",
                  "[&_p.ql-align-center>img]:mx-auto",
                  "[&_p.ql-align-right>img]:ml-auto [&_p.ql-align-right>img]:mr-0",
                ].join(" ")}
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            ) : (
              <div className="font-body text-lg md:text-xl text-ink leading-relaxed whitespace-pre-wrap space-y-4">
                {post.content}
              </div>
            )}
            {/* Author Badge */}
            <div className="mt-10 pt-8 border-t border-sand flex items-center gap-3">
              <span className="font-body text-xs text-muted tracking-widest uppercase">Written by</span>
              <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#e8f5e9] text-[#2e7d32] font-body text-sm font-medium tracking-wide border border-[#c8e6c9]">
                {post.author}
              </span>
            </div>
          </article>
        </div>

        {/* Related Posts Section */}
        {relatedPosts.length > 0 && (
          <div className="max-w-7xl mx-auto px-6 md:px-10 mt-20">
            <div className="mb-10">
              <div className="label-tag mb-5">Continue Reading</div>
              <h2 className="font-heading text-4xl md:text-5xl text-ink leading-tight">
                Related <em className="text-gold">Articles</em>
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost) => (
                <BlogCard
                  key={relatedPost.id}
                  image={relatedPost.image || relatedPost.coverImage || ""}
                  title={relatedPost.title}
                  author={relatedPost.author}
                  date={relatedPost.date}
                  excerpt={relatedPost.excerpt || getBlogPreviewText(relatedPost.content, 120)}
                  slug={relatedPost.slug}
                />
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
