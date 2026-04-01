import type { Metadata } from "next";
import "./globals.css";
import SessionProvider from "@/components/admin/SessionProvider";

export const metadata: Metadata = {
  title: "Atibha Realty — Luxury Real Estate Since 2003",
  description: "India's most trusted luxury real estate brand. Premium properties across Mumbai, Delhi, Bengaluru, Hyderabad and beyond.",
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="bg-black">
      <body className="bg-black text-white">
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
