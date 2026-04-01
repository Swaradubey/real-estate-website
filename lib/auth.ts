import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// Admin credentials from environment variables (for external use)
// Admin credentials as constants
export const ADMIN_EMAIL = "admin@hexerve.com";
export const ADMIN_PASSWORD = "12345";

// Extend NextAuth types
declare module "next-auth" {
  interface User {
    id: string;
  }
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
  }
}

// NextAuth configuration
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "admin@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // Check credentials against admin constants
        if (
          credentials.email === ADMIN_EMAIL &&
          credentials.password === ADMIN_PASSWORD
        ) {
          return {
            id: "1",
            email: credentials.email,
            name: "Admin",
          };
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

// Helper function to check if user is authenticated (for server components)
export async function isAuthenticated() {
  // This will be used with getServerSession in server components
  return true; // Placeholder - actual check done via session
}
