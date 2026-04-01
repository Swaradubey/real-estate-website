import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    // Additional checks can be added here if needed
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized({ req, token }) {
        // Protect all /admin routes except /admin/login
        if (req.nextUrl.pathname.startsWith("/admin/login")) {
          return true;
        }
        // Require token for all other /admin routes
        if (req.nextUrl.pathname.startsWith("/admin")) {
          return token !== null;
        }
        return true;
      },
    },
    pages: {
      signIn: "/login",
    },
  }
);

export const config = {
  matcher: ["/admin/:path*", "/blog/create"],
};
