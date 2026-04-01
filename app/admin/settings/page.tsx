"use client";

import { useState } from "react";

export default function AdminSettingsPage() {
  const [loading, setLoading] = useState(false);

  const handleSave = () => {
    setLoading(true);
    // Placeholder for save functionality
    setTimeout(() => setLoading(false), 1000);
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6 md:space-y-8" style={{ fontFamily: "var(--font-body)" }}>
      {/* Header */}
      <div className="flex items-center justify-between pb-4 sm:pb-6 border-b border-gray-100">
        <div>
          <h1
            className="font-display text-2xl sm:text-3xl text-ink"
            style={{ fontWeight: 400 }}
          >
            Settings
          </h1>
          <p className="font-body text-xs sm:text-sm text-muted mt-1">
            Configure your admin panel preferences
          </p>
        </div>
      </div>

      {/* Settings Sections */}
      <div className="grid gap-6">
        {/* Account Settings */}
        <div className="a-card p-4 sm:p-5 md:p-6">
          <h2
            className="font-display text-lg sm:text-xl text-ink mb-4"
            style={{ fontWeight: 400 }}
          >
            Account Settings
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block font-body text-sm text-ink mb-2">
                Admin Email
              </label>
              <input
                type="email"
                defaultValue="admin@atibharealty.com"
                disabled
                className="w-full font-body text-sm border border-gray-200 rounded-md px-3 py-2 bg-gray-50 text-muted cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block font-body text-sm text-ink mb-2">
                Change Password
              </label>
              <input
                type="password"
                placeholder="Enter new password"
                className="w-full font-body text-sm border border-gray-200 rounded-md px-3 py-2 hover:border-gold/50 focus:border-gold focus:outline-none transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="a-card p-4 sm:p-5 md:p-6">
          <h2
            className="font-display text-lg sm:text-xl text-ink mb-4"
            style={{ fontWeight: 400 }}
          >
            Notifications
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-body text-sm text-ink">Email Notifications</div>
                <div className="font-body text-xs text-muted">Receive emails for new inquiries</div>
              </div>
              <button
                className="relative w-12 h-6 bg-gold rounded-full transition-colors"
              >
                <span className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full transition-transform" />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-body text-sm text-ink">Blog Post Alerts</div>
                <div className="font-body text-xs text-muted">Get notified when blog posts are published</div>
              </div>
              <button
                className="relative w-12 h-6 bg-gray-200 rounded-full transition-colors"
              >
                <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* System Information */}
        <div className="a-card p-4 sm:p-5 md:p-6">
          <h2
            className="font-display text-lg sm:text-xl text-ink mb-4"
            style={{ fontWeight: 400 }}
          >
            System Information
          </h2>
          <div className="space-y-3">
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="font-body text-sm text-muted">Version</span>
              <span className="font-body text-sm text-ink">1.0.0</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="font-body text-sm text-muted">Last Updated</span>
              <span className="font-body text-sm text-ink">2025-01-15</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="font-body text-sm text-muted">Database</span>
              <span className="font-body text-sm text-emerald-600">Connected</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="font-body text-sm text-muted">Environment</span>
              <span className="font-body text-sm text-ink">Production</span>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end gap-3">
          <button
            className="font-body text-xs px-5 py-2.5 rounded-md border border-gray-200 text-muted hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={loading}
            className="font-body text-xs font-semibold tracking-widest uppercase text-black px-5 py-2.5 rounded-md transition-all duration-300 ease-out hover:-translate-y-0.5 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-y-0 disabled:shadow-none"
            style={{
              background: 'linear-gradient(135deg, #c8a45b, #b8963d)',
            }}
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>

      {/* Info Box */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <svg className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <div>
            <h4 className="font-body text-sm font-semibold text-amber-900 mb-1">
              Settings Panel
            </h4>
            <p className="font-body text-xs text-amber-800">
              Advanced settings configuration is coming soon. Basic settings are available above.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
