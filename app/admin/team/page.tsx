"use client";

import { useEffect, useState } from "react";
import { TEAM } from "@/lib/data";
import type { TeamMember } from "@/lib/data";

export default function AdminTeamPage() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load team members from static data
    // In a real app, this would come from Firestore
    console.log("[Admin Team Page] Loading team members...");
    setTeamMembers(TEAM);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="p-4 sm:p-6 md:p-8">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold mx-auto mb-4"></div>
          <p className="text-muted font-body">Loading team members...</p>
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
            Team Members
          </h1>
          <p className="font-body text-xs sm:text-sm text-muted mt-1">
            Manage your organization's team members
          </p>
        </div>
        <button
          className="font-body text-xs font-semibold tracking-widest uppercase text-black px-5 py-2.5 rounded-md transition-all duration-300 ease-out hover:-translate-y-0.5 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            background: 'linear-gradient(135deg, #c8a45b, #b8963d)',
          }}
          disabled
          title="Team management coming soon"
        >
          Add Member
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
        <div className="a-card p-4 sm:p-5 md:p-6">
          <div className="font-display text-2xl sm:text-3xl text-ink mb-1">
            {teamMembers.length}
          </div>
          <div className="font-body text-xs sm:text-sm font-medium text-ink mb-1">
            Total Members
          </div>
          <div className="font-body text-xs text-muted">
            Active team
          </div>
        </div>
        <div className="a-card p-4 sm:p-5 md:p-6">
          <div className="font-display text-2xl sm:text-3xl text-ink mb-1">
            👥
          </div>
          <div className="font-body text-xs sm:text-sm font-medium text-ink mb-1">
            Leadership
          </div>
          <div className="font-body text-xs text-muted">
            C-Suite & Directors
          </div>
        </div>
        <div className="a-card p-4 sm:p-5 md:p-6">
          <div className="font-display text-2xl sm:text-3xl text-ink mb-1">
            🏆
          </div>
          <div className="font-body text-xs sm:text-sm font-medium text-ink mb-1">
            Experts
          </div>
          <div className="font-body text-xs text-muted">
            Specialists
          </div>
        </div>
        <div className="a-card p-4 sm:p-5 md:p-6">
          <div className="font-display text-2xl sm:text-3xl text-ink mb-1">
            📈
          </div>
          <div className="font-body text-xs sm:text-sm font-medium text-ink mb-1">
            Growth
          </div>
          <div className="font-body text-xs text-muted">
            Expanding team
          </div>
        </div>
      </div>

      {/* Team Grid */}
      <div className="a-card p-4 sm:p-5 md:p-6">
        <div className="flex items-center justify-between mb-4 sm:mb-5">
          <h2
            className="font-display text-lg sm:text-xl text-ink"
            style={{ fontWeight: 400 }}
          >
            All Team Members
          </h2>
          <div className="font-body text-xs text-muted">
            Showing {teamMembers.length} members
          </div>
        </div>

        {teamMembers.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">👥</div>
            <h3 className="font-heading text-2xl text-ink mb-4">No Team Members</h3>
            <p className="font-body text-muted mb-6 max-w-md mx-auto">
              Add your first team member to start building your organization.
            </p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="border border-gray-100 rounded-lg overflow-hidden hover:border-gold/30 hover:shadow-lg transition-all duration-300 bg-white group"
              >
                <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                    <div className="flex gap-2">
                      <button
                        className="bg-white/90 hover:bg-white text-ink px-3 py-1.5 rounded-md text-xs font-medium transition-colors"
                        disabled
                        title="Edit coming soon"
                      >
                        Edit
                      </button>
                      <button
                        className="bg-white/90 hover:bg-white text-red-600 px-3 py-1.5 rounded-md text-xs font-medium transition-colors"
                        disabled
                        title="Remove coming soon"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="font-display text-base text-ink mb-1">
                    {member.name}
                  </h3>
                  <div className="font-body text-xs text-gold font-medium mb-2">
                    {member.role}
                  </div>
                  <div className="font-body text-xs text-muted mb-3">
                    {member.experience} experience
                  </div>
                  <p className="font-body text-xs text-muted line-clamp-2">
                    {member.bio}
                  </p>
                  
                  <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
                    <div className="font-body text-[10px] text-muted">
                      ID: #{member.id.toString().padStart(3, '0')}
                    </div>
                    <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center text-gold font-bold text-xs">
                      {member.initials}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <h4 className="font-body text-sm font-semibold text-blue-900 mb-1">
              Team Management
            </h4>
            <p className="font-body text-xs text-blue-800">
              Team member management features (add, edit, remove) are coming soon. 
              For now, you can view your current team members displayed above.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
