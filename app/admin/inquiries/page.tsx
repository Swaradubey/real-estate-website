"use client";

import { useEffect, useState } from "react";
import { getInquiries, updateInquiryStatus, deleteInquiry } from "@/lib/firestore";
import type { FirestoreInquiry } from "@/lib/firestore";

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<FirestoreInquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "New" | "Replied" | "Closed">("all");

  useEffect(() => {
    let isMounted = true;
    
    async function fetchInquiries() {
      try {
        setLoading(true);
        setError(null);
        
        console.log("[Admin Inquiries Page] Fetching inquiries from Firestore...");
        const data = await getInquiries();
        
        if (!isMounted) return;
        
        console.log(`[Admin Inquiries Page] Total inquiries: ${data.length}`);
        setInquiries(data);
      } catch (err) {
        console.error("[Admin Inquiries Page] Error fetching inquiries:", err);
        if (!isMounted) return;
        
        setError("Failed to load inquiries.");
        setInquiries([]);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }
    
    fetchInquiries();
    
    return () => {
      isMounted = false;
    };
  }, []);

  const handleStatusChange = async (inquiryId: string, newStatus: "New" | "Replied" | "Closed") => {
    try {
      await updateInquiryStatus(inquiryId, newStatus);
      setInquiries(prev =>
        prev.map(inquiry =>
          inquiry.id === inquiryId ? { ...inquiry, status: newStatus } : inquiry
        )
      );
    } catch (err) {
      console.error("Error updating inquiry status:", err);
      alert("Failed to update status. Please try again.");
    }
  };

  const handleDelete = async (inquiryId: string) => {
    if (!confirm("Are you sure you want to delete this inquiry?")) return;
    
    try {
      await deleteInquiry(inquiryId);
      setInquiries(prev => prev.filter(inquiry => inquiry.id !== inquiryId));
    } catch (err) {
      console.error("Error deleting inquiry:", err);
      alert("Failed to delete inquiry. Please try again.");
    }
  };

  const filteredInquiries = filter === "all" 
    ? inquiries 
    : inquiries.filter(inquiry => inquiry.status === filter);

  const stats = {
    total: inquiries.length,
    new: inquiries.filter(i => i.status === "New").length,
    replied: inquiries.filter(i => i.status === "Replied").length,
    closed: inquiries.filter(i => i.status === "Closed").length,
  };

  if (loading) {
    return (
      <div className="p-4 sm:p-6 md:p-8">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold mx-auto mb-4"></div>
          <p className="text-muted font-body">Loading inquiries...</p>
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
            Inquiries
          </h1>
          <p className="font-body text-xs sm:text-sm text-muted mt-1">
            Manage and respond to customer inquiries
          </p>
        </div>
      </div>

      {/* Error Warning */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-red-800 font-body text-sm">{error}</p>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
        <div className="a-card p-4 sm:p-5 md:p-6">
          <div className="font-display text-2xl sm:text-3xl text-ink mb-1">
            {stats.total}
          </div>
          <div className="font-body text-xs sm:text-sm font-medium text-ink mb-1">
            Total Inquiries
          </div>
          <div className="font-body text-xs text-muted">
            All time
          </div>
        </div>
        <div className="a-card p-4 sm:p-5 md:p-6 bg-blue-50">
          <div className="font-display text-2xl sm:text-3xl text-blue-700 mb-1">
            {stats.new}
          </div>
          <div className="font-body text-xs sm:text-sm font-medium text-blue-700 mb-1">
            New
          </div>
          <div className="font-body text-xs text-blue-600">
            Requires attention
          </div>
        </div>
        <div className="a-card p-4 sm:p-5 md:p-6 bg-emerald-50">
          <div className="font-display text-2xl sm:text-3xl text-emerald-700 mb-1">
            {stats.replied}
          </div>
          <div className="font-body text-xs sm:text-sm font-medium text-emerald-700 mb-1">
            Replied
          </div>
          <div className="font-body text-xs text-emerald-600">
            Awaiting response
          </div>
        </div>
        <div className="a-card p-4 sm:p-5 md:p-6 bg-gray-50">
          <div className="font-display text-2xl sm:text-3xl text-gray-700 mb-1">
            {stats.closed}
          </div>
          <div className="font-body text-xs sm:text-sm font-medium text-gray-700 mb-1">
            Closed
          </div>
          <div className="font-body text-xs text-gray-600">
            Resolved
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2">
        {(["all", "New", "Replied", "Closed"] as const).map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`font-body text-xs px-4 py-2 rounded-md transition-all ${
              filter === status
                ? "bg-gold text-white"
                : "bg-white text-muted hover:bg-gray-50 border border-gray-200"
            }`}
          >
            {status === "all" ? "All" : status}
            {status !== "all" && (
              <span className="ml-1.5 opacity-70">
                ({status === "New" ? stats.new : status === "Replied" ? stats.replied : stats.closed})
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Inquiries List */}
      <div className="a-card p-4 sm:p-5 md:p-6">
        <div className="flex items-center justify-between mb-4 sm:mb-5">
          <h2
            className="font-display text-lg sm:text-xl text-ink"
            style={{ fontWeight: 400 }}
          >
            {filter === "all" ? "All Inquiries" : `${filter} Inquiries`}
          </h2>
          <div className="font-body text-xs text-muted">
            {filteredInquiries.length} {filteredInquiries.length === 1 ? "result" : "results"}
          </div>
        </div>

        {filteredInquiries.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">💬</div>
            <h3 className="font-heading text-2xl text-ink mb-4">
              No {filter === "all" ? "" : filter} Inquiries
            </h3>
            <p className="font-body text-muted mb-6 max-w-md mx-auto">
              {filter === "all" 
                ? "No inquiries yet. They will appear here when customers contact you."
                : `No inquiries with "${filter}" status.`}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredInquiries.map((inquiry) => (
              <div
                key={inquiry.id}
                className="border border-gray-100 rounded-lg p-4 sm:p-5 hover:border-gold/30 transition-colors bg-white"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-display text-base sm:text-lg text-ink font-medium">
                        {inquiry.name}
                      </h3>
                      <span
                        className={`inline-block font-body text-[8px] sm:text-[9px] px-2 py-0.5 tracking-widest uppercase ${
                          inquiry.status === "New"
                            ? "bg-blue-50 text-blue-700 border border-blue-200"
                            : inquiry.status === "Replied"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-gray-50 text-gray-600 border border-gray-200"
                        }`}
                      >
                        {inquiry.status}
                      </span>
                    </div>
                    <div className="font-body text-xs text-muted space-y-1">
                      <div>{inquiry.email}</div>
                      <div>{inquiry.phone}</div>
                      <div className="text-ink">Interested in: <span className="font-medium">{inquiry.property}</span></div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-body text-xs text-muted mb-2">
                      {inquiry.date}
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-md p-3 mb-4">
                  <p className="font-body text-sm text-ink">{inquiry.message}</p>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <label className="font-body text-xs text-muted">Status:</label>
                    <select
                      value={inquiry.status}
                      onChange={(e) =>
                        handleStatusChange(inquiry.id, e.target.value as "New" | "Replied" | "Closed")
                      }
                      className="font-body text-xs border border-gray-200 rounded-md px-2 py-1.5 bg-white hover:border-gold/50 focus:border-gold focus:outline-none transition-colors"
                    >
                      <option value="New">New</option>
                      <option value="Replied">Replied</option>
                      <option value="Closed">Closed</option>
                    </select>
                  </div>
                  
                  <button
                    onClick={() => handleDelete(inquiry.id)}
                    className="font-body text-xs text-red-600 hover:text-red-700 hover:bg-red-50 px-3 py-1.5 rounded-md transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
