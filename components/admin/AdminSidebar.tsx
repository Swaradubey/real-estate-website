"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { useState } from "react";

const NAV = [
  { href: "/admin/dashboard", icon: "⬡", label: "Dashboard" },
  { href: "/admin/properties", icon: "🏛", label: "Properties" },
  { href: "/admin/blog", icon: "✍", label: "Blog Posts" },
  { href: "/admin/inquiries", icon: "💬", label: "Inquiries" },
  { href: "/admin/team", icon: "👥", label: "Team" },
  { href: "/admin/settings", icon: "⚙", label: "Settings" },
];

const MOBILE_ONLY_NAV = [
  { action: "signout", icon: "→", label: "Sign Out" },
];

interface AdminSidebarProps {
  headerHeight: number;
  mobileOpen?: boolean;
  setMobileOpen?: (open: boolean) => void;
}

export default function AdminSidebar({ headerHeight, mobileOpen, setMobileOpen }: AdminSidebarProps) {
  const path = usePathname();
  const [internalMobileOpen, setInternalMobileOpen] = useState(false);
  
  // Use external state if provided, otherwise use internal state
  const isOpen = mobileOpen !== undefined ? mobileOpen : internalMobileOpen;
  const setOpen = setMobileOpen !== undefined ? setMobileOpen : setInternalMobileOpen;

  return (
    <>
      {/* Mobile overlay backdrop */}
      <div
        className={`sm:hidden fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setOpen(false)}
      />

      {/* Sidebar */}
      <aside
        className={`fixed left-0 w-64 sm:w-64 bg-black text-white flex flex-col z-50 transition-transform duration-300 sm:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full sm:translate-x-0"
        }`}
        style={{
          top: `${headerHeight}px`,
          height: `calc(100vh - ${headerHeight}px)`,
        }}
      >
      <nav className="flex flex-col gap-3 sm:gap-5 mt-4 sm:mt-6 px-4 sm:px-6 w-full overflow-x-hidden">
        {NAV.map((n) => {
          const active = path.startsWith(n.href);
          return (
            <Link
              key={n.href}
              href={n.href}
              className={`flex items-center gap-2 sm:gap-3.5 px-3 sm:px-4 py-3 rounded-md transition-all duration-200 min-w-0 ${
                active
                  ? "bg-gold/15 text-gold"
                  : "text-cream/40 hover:bg-cream/5 hover:text-cream/80"
              }`}
            >
              <span className="text-base w-5 text-center flex-shrink-0">{n.icon}</span>
              <span className="font-body text-[11px] tracking-[.2em] uppercase flex-1 min-w-0 truncate">
                {n.label}
              </span>
              {active && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />}
            </Link>
          );
        })}
        {/* Mobile-only Sign Out item */}
        {MOBILE_ONLY_NAV.map((item) => (
          <button
            key={item.action}
            onClick={() => {
              setOpen(false);
              signOut({ callbackUrl: "/login" });
            }}
            className="md:hidden flex items-center gap-2 sm:gap-3.5 px-3 sm:px-4 py-3 text-cream/30 hover:text-red-400 transition-colors min-w-0 rounded-md"
          >
            <span className="text-base w-5 text-center flex-shrink-0">{item.icon}</span>
            <span className="font-body text-[11px] tracking-[.2em] uppercase flex-1 min-w-0 truncate">
              {item.label}
            </span>
          </button>
        ))}
      </nav>
      <div className="px-3 sm:px-4 py-4 sm:py-6 border-t border-cream/8 space-y-2 w-full">
        <Link
          href="/"
          className="hidden md:flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 text-cream/30 hover:text-cream/60 transition-colors min-w-0"
          onClick={() => setOpen(false)}
        >
          <span className="flex-shrink-0">🌐</span>
          <span className="font-body text-[11px] tracking-[.2em] uppercase flex-1 min-w-0 truncate">
            View Site
          </span>
        </Link>
        {/* Desktop-only Sign Out in footer */}
        <button
          onClick={() => {
            setOpen(false);
            signOut({ callbackUrl: "/login" });
          }}
          className="hidden md:flex w-full items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 text-cream/30 hover:text-red-400 transition-colors min-w-0"
        >
          <span className="flex-shrink-0">→</span>
          <span className="font-body text-[11px] tracking-[.2em] uppercase flex-1 min-w-0 truncate">
            Sign Out
          </span>
        </button>
      </div>
    </aside>
    </>
  );
}
