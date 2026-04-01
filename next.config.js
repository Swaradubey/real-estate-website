/** @type {import('next').NextConfig} */
module.exports = {
  // Keep firebase-admin server-side only — prevents it from being bundled
  // into client code, which causes "Module not found: Can't resolve 'firebase-admin'"
  experimental: {
    serverComponentsExternalPackages: ["firebase-admin"],
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "plus.unsplash.com" },
      { protocol: "https", hostname: "www.bing.com" },
      { protocol: "https", hostname: "www.dreamstime.com" },
      { protocol: "https", hostname: "thumbs.dreamstime.com" },
    ],
  },
};
