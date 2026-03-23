"use client";

import Link from "next/link";
import { getBlogPreviewText } from "@/lib/firestore";
import { SEED_BLOGS, type BlogPost } from "@/lib/data";
import Image from "next/image";

// ─── STATIC BLOG DATA FOR HOMEPAGE ─────────────────────────────────────────────
// Homepage ALWAYS uses static blog data - no Firebase/API fetching
// This ensures the homepage blog section is always visible and fast

// Transform SEED_BLOGS to match the expected format for rendering
interface StaticBlogCard {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category?: string;
  author: string;
  date: string;
  published: boolean;
  readTime?: string;
  coverImage?: string;
  image: string;
  seoTitle: string;
  metaDescription: string;
  keywords: string[];
}

// Get the latest 3 published static blogs, sorted by date (newest first)
const recentBlogs: StaticBlogCard[] = SEED_BLOGS
  .filter((blog: BlogPost) => blog.published !== false)
  .sort((a: BlogPost, b: BlogPost) => new Date(b.date).getTime() - new Date(a.date).getTime())
  .slice(0, 3)
  .map((blog: BlogPost) => ({
    id: String(blog.id),
    title: blog.title,
    slug: blog.slug,
    excerpt: blog.excerpt || "",
    content: blog.content,
    category: blog.category,
    author: blog.author,
    date: blog.date,
    published: blog.published ?? true,
    readTime: blog.readTime,
    coverImage: blog.coverImage,
    image: blog.image,
    seoTitle: blog.seoTitle,
    metaDescription: blog.metaDescription,
    keywords: blog.keywords,
  }));

export default function BlogPreview() {
  // Homepage ALWAYS uses static blog data - no state, no fetching, no loading
  const posts = recentBlogs;
  
  return (
    <section id="blog" className="relative w-full py-10 sm:py-14 lg:py-20 bg-[#f5f1ea] overflow-hidden">
      <div className="relative w-full px-3 sm:px-4 md:px-6 lg:px-10 xl:px-12">
        <div className="w-full flex flex-col items-center text-center px-5 mb-6 sm:mb-8 md:mb-10 lg:mb-12 reveal">
          <div className="label-tag mb-2 sm:mb-3 text-xs sm:text-sm">Insights & News</div>
          <h2 className="font-heading text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-ink leading-tight">
            Market intelligence<br />
            <em className="text-gold">worth reading.</em>
          </h2>
          <div className="flex flex-col items-center gap-4 w-full mt-6 sm:mt-8">
            <Link href="/blog" className="btn-outline text-xs sm:text-sm w-full max-w-md text-center">
              All Articles
            </Link>
            <Link href="/admin/write-blog" className="btn-gold text-xs sm:text-sm w-full max-w-md text-center">
              Write Blog
            </Link>
          </div>
        </div>
        {/* Always show blog cards - we initialize with fallback data */}
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 w-full reveal">
            {posts.map((post) => (
              <div key={post.id} className="group w-full bg-white border border-neutral-200 flex flex-col h-full overflow-hidden">
                {post.coverImage || post.image ? (
                  <Link href={`/blog/${post.slug}`} className="block">
                    <div className="relative w-full h-[180px] sm:h-[200px] md:h-[220px] lg:h-[240px] overflow-hidden">
                      <Image
                        src={post.coverImage || post.image}
                        alt={post.title}
                        width={800}
                        height={500}
                        className="w-full h-[180px] sm:h-[200px] md:h-[220px] lg:h-[240px] object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      {post.category ? (
                        <div className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3">
                          <span className="font-body text-[8px] sm:text-[9px] tracking-widest uppercase bg-gold text-ink px-1.5 sm:px-2 py-0.5 sm:py-1">
                            {post.category}
                          </span>
                        </div>
                      ) : null}
                    </div>
                  </Link>
                ) : (
                  <div className="bg-panel border border-sand p-4 sm:p-6 mb-4">
                    <div className="font-body text-[9px] tracking-widest uppercase text-muted">
                      Latest Post
                    </div>
                  </div>
                )}
                <div className="p-3 sm:p-4 flex-1 flex flex-col">
                  <div className="font-body text-xs text-muted mb-2 sm:mb-3">
                    {new Date(post.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
                    {post.readTime ? ` · ${post.readTime}` : null}
                  </div>
                  <h3 className="font-heading text-sm sm:text-base md:text-lg text-ink leading-snug mb-2 sm:mb-3 group-hover:text-gold transition-colors">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>
                  <p className="font-body text-xs sm:text-sm text-muted leading-relaxed line-clamp-2 mb-2 sm:mb-3 flex-1">
                    {post.excerpt ?? getBlogPreviewText(post.content, 120)}
                  </p>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="font-body text-xs tracking-widest uppercase text-gold border-b border-gold/30 pb-0.5 hover:border-gold transition-colors inline-block"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-panel border border-sand p-4 sm:p-6 md:p-8 text-center">
            <p className="font-body text-sm text-muted">No blog posts yet. Check back soon!</p>
          </div>
        )}
      </div>
    </section>
  );
}
