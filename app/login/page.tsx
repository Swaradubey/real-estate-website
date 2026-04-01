"use client";

import { useState, Suspense } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import Cursor from "@/components/site/Cursor";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/admin/write-blog";
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetStatus, setResetStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [resetMessage, setResetMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid password");
        setIsLoading(false);
      } else {
        router.push(callbackUrl);
        router.refresh();
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setResetStatus("loading");
    setResetMessage("");

    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setResetStatus("success");
        setResetMessage("Password reset link has been sent to your email.");
      } else {
        setResetStatus("error");
        setResetMessage(data.error || "Failed to send reset link. Please try again.");
      }
    } catch (err) {
      setResetStatus("error");
      setResetMessage("An error occurred. Please try again.");
    }
  };

  if (showForgotPassword) {
    return (
      <div className="pt-24 pb-20 bg-cream min-h-screen flex items-center justify-center">
        <div className="w-full max-w-md px-6">
          <div className="bg-panel border border-sand p-8 md:p-10">
            <h1 className="font-heading text-3xl md:text-4xl font-light italic text-ink mb-2 text-center">
              Reset Password
            </h1>
            <p className="text-muted text-center mb-8 font-body">
              Enter your email to receive a password reset link
            </p>

            {resetStatus === "success" && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded mb-6 font-body text-sm">
                {resetMessage}
              </div>
            )}

            {resetStatus === "error" && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6 font-body text-sm">
                {resetMessage}
              </div>
            )}

            <form onSubmit={handleResetPassword} className="space-y-6">
              <div>
                <label htmlFor="reset-email" className="block text-ink font-body text-sm font-medium mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="reset-email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-sand bg-white font-body text-ink focus:outline-none focus:border-gold transition-colors"
                  placeholder="admin@example.com"
                />
              </div>

              <button
                type="submit"
                disabled={resetStatus === "loading"}
                className="w-full bg-[#C9A14A] text-black py-3 px-4 font-body text-sm tracking-wider uppercase hover:bg-[#b8933f] transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {resetStatus === "loading" ? "Sending..." : "Send Reset Link"}
              </button>
            </form>

            <div className="mt-8 text-center">
              <button 
                onClick={() => setShowForgotPassword(false)}
                className="text-muted hover:text-gold transition font-body text-sm"
              >
                ← Back to Login
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 bg-cream min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md px-6">
        <div className="bg-panel border border-sand p-8 md:p-10">
          <h1 className="font-heading text-3xl md:text-4xl font-light italic text-ink mb-2 text-center">
            Admin Login
          </h1>
          <p className="text-muted text-center mb-8 font-body">
            Sign in to manage your blog posts
          </p>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4 font-body text-sm">
              <div className="flex flex-col items-center gap-2">
                <span>{error}</span>
                {error === "Invalid password" && (
                  <button 
                    onClick={() => setShowForgotPassword(true)}
                    className="text-gold hover:underline font-medium"
                  >
                    Reset Password
                  </button>
                )}
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-ink font-body text-sm font-medium mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border border-sand bg-white font-body text-ink focus:outline-none focus:border-gold transition-colors"
                placeholder="admin@example.com"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="password" className="block text-ink font-body text-sm font-medium">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setShowForgotPassword(true)}
                  className="text-muted hover:text-gold transition font-body text-xs"
                >
                  Forgot Password?
                </button>
              </div>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 border border-sand bg-white font-body text-ink focus:outline-none focus:border-gold transition-colors"
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#C9A14A] text-black py-3 px-4 font-body text-sm tracking-wider uppercase hover:bg-[#b8933f] transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="mt-8 text-center">
            <Link href="/" className="text-muted hover:text-gold transition font-body text-sm">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function LoginLoading() {
  return (
    <div className="pt-24 pb-20 bg-cream min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold mx-auto mb-4"></div>
        <p className="text-muted font-body">Loading...</p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <>
      <Cursor />
      <Navbar />
      <Suspense fallback={<LoginLoading />}>
        <LoginForm />
      </Suspense>
      <Footer />
    </>
  );
}
