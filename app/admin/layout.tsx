"use client";

import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isLoginRoute = pathname === "/admin/login";

  useEffect(() => {
    if (status === "unauthenticated" && !isLoginRoute) {
      router.replace("/login?callbackUrl=" + encodeURIComponent(pathname));
    }
  }, [status, isLoginRoute, pathname, router]);

  // Show loading or nothing while checking auth
  if (!isLoginRoute && status === "loading") {
    return (
      <div className="min-h-screen bg-[#F8F7F4] flex items-center justify-center">
        <div className="text-muted font-body">Loading...</div>
      </div>
    );
  }

  if (!isLoginRoute && status === "unauthenticated") {
    return null;
  }

  if (isLoginRoute) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen bg-[#F8F7F4]">
      <AdminSidebar headerHeight={70} mobileOpen={mobileMenuOpen} setMobileOpen={setMobileMenuOpen} />
      <main className="flex-1 w-full max-w-full min-w-0 overflow-x-hidden transition-all duration-300 lg:ml-64">
        <div className="fixed top-0 left-0 right-0 h-[70px] bg-black z-30 flex items-center justify-between px-4 sm:px-6 lg:left-64 lg:right-0">
          <div className="flex items-center gap-3">
            {/* Mobile hamburger menu button - only visible on mobile */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="sm:hidden text-white p-2 -ml-2 hover:bg-white/10 rounded-sm transition-colors"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <span className="font-display text-xl text-white tracking-wider">ATIBHA</span>
            <span className="font-body text-xs text-cream/60 ml-2 tracking-widest uppercase">Admin</span>
          </div>
          <Link
            href="/"
            className="hidden md:block bg-[#C9A14A] text-black px-3 py-1.5 text-xs tracking-wider uppercase hover:bg-[#b8933f] transition rounded-sm"
          >
            View Site
          </Link>
        </div>
        <div className="pt-[70px] w-full">{children}</div>
      </main>
    </div>
  );
}
