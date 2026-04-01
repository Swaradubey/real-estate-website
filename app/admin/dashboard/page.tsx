"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { PROPERTIES, TEAM } from "@/lib/data";
import { getBlogPosts, getInquiries } from "@/lib/data";
import type { FirestoreBlogPost, FirestoreInquiry } from "@/lib/firestore";

export default function Dashboard() {
  const [blogs, setBlogs] = useState<FirestoreBlogPost[]>([]);
  const [inquiries, setInquiries] = useState<FirestoreInquiry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [blogData, inquiryData] = await Promise.all([
          getBlogPosts(),
          getInquiries(),
        ]);
        setBlogs(blogData);
        setInquiries(inquiryData);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const availableProperties = PROPERTIES.filter((p) => p.status === "Available").length;
  const publishedBlogs = blogs.filter((b) => b.published).length;
  const newInquiries = inquiries.filter((i) => i.status === "New");
  const recentPosts = blogs.slice(0, 3);

  const STATS = [
    {
      label: "Total Properties",
      val: PROPERTIES.length,
      sub: `${availableProperties} available`,
      icon: "🏛",
    },
    {
      label: "Blog Posts",
      val: publishedBlogs,
      sub: `${blogs.length} total`,
      icon: "✍",
    },
    {
      label: "Total Inquiries",
      val: inquiries.length,
      sub: `${newInquiries.length} new`,
      icon: "💬",
    },
    {
      label: "Team Members",
      val: TEAM.length,
      sub: "Active staff",
      icon: "👥",
    },
    {
      label: "Portfolio Value",
      val: "₹3,200 Cr",
      sub: "Across 12 cities",
      icon: "💰",
    },
    {
      label: "Families Served",
      val: "1,500+",
      sub: "Since 2003",
      icon: "🏠",
    },
  ];

  if (loading) {
    return (
      <div className="p-4 sm:p-6 md:p-8">
        <div className="text-muted font-body text-sm sm:text-base">Loading dashboard...</div>
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
            Dashboard
          </h1>
          <p className="font-body text-xs sm:text-sm text-muted mt-1">
            {new Date().toLocaleDateString("en-IN", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
        <div className="font-body text-[10px] sm:text-xs text-muted tracking-widest uppercase bg-gold/10 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-gold">
          Admin
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-5">
        {STATS.map((s) => (
          <div key={s.label} className="a-card p-4 sm:p-5 md:p-6">
            <div className="flex items-start justify-between mb-3 sm:mb-4">
              <span className="text-xl sm:text-2xl">{s.icon}</span>
              <div className="w-6 sm:w-8 h-0.5 bg-gold/40" />
            </div>
            <div className="font-display text-2xl sm:text-3xl text-ink mb-1">{s.val}</div>
            <div className="font-body text-xs sm:text-sm font-medium text-ink mb-1">
              {s.label}
            </div>
            <div className="font-body text-xs text-muted">{s.sub}</div>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
        {/* New Inquiries */}
        <div className="a-card p-4 sm:p-5 md:p-6">
          <div className="flex items-center justify-between mb-4 sm:mb-5">
            <h2
              className="font-display text-lg sm:text-xl text-ink"
              style={{ fontWeight: 400 }}
            >
              New Inquiries
            </h2>
            <Link
              href="/admin/inquiries"
              className="font-body text-[10px] sm:text-xs text-gold tracking-widest uppercase hover:underline"
            >
              View All
            </Link>
          </div>
          {newInquiries.length === 0 ? (
            <p className="font-body text-xs sm:text-sm text-muted py-4 sm:py-6 text-center">
              No new inquiries
            </p>
          ) : (
            <div className="space-y-3 sm:space-y-4">
              {newInquiries.slice(0, 5).map((inq) => (
                <div
                  key={inq.id}
                  className="flex items-start gap-3 sm:gap-4 pb-3 sm:pb-4 border-b border-gray-50 last:border-0"
                >
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gold/15 flex items-center justify-center flex-shrink-0">
                    <span className="font-display text-gold text-sm">{inq.name[0]}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-body text-xs sm:text-sm font-medium text-ink truncate">
                      {inq.name}
                    </div>
                    <div className="font-body text-xs text-muted truncate">
                      {inq.property}
                    </div>
                    <div className="font-body text-xs text-muted/60 mt-0.5">
                      {inq.date}
                    </div>
                  </div>
                  <span className="font-body text-[8px] sm:text-[9px] bg-amber-50 text-amber-700 border border-amber-200 px-2 py-0.5 tracking-widest uppercase flex-shrink-0">
                    New
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Blog Posts */}
        <div className="a-card p-4 sm:p-5 md:p-6">
          <div className="flex items-center justify-between mb-4 sm:mb-5">
            <h2
              className="font-display text-lg sm:text-xl text-ink"
              style={{ fontWeight: 400 }}
            >
              Recent Posts
            </h2>
            <Link
              href="/admin/blog"
              className="font-body text-[10px] sm:text-xs text-gold tracking-widest uppercase hover:underline"
            >
              View All
            </Link>
          </div>
          <div className="space-y-3 sm:space-y-4">
            {recentPosts.length === 0 ? (
              <p className="font-body text-xs sm:text-sm text-muted py-4 sm:py-6 text-center">
                No blog posts yet
              </p>
            ) : (
              recentPosts.map((post) => (
                <div
                  key={post.id}
                  className="flex gap-3 sm:gap-4 pb-3 sm:pb-4 border-b border-gray-50 last:border-0"
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
                    <span
                      className={`inline-block font-body text-[8px] sm:text-[9px] mt-1.5 px-2 py-0.5 tracking-widest uppercase ${
                        post.published
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-gray-50 text-gray-600"
                      }`}
                    >
                      {post.published ? "Published" : "Draft"}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
