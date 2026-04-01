/** @type {import('next').NextConfig} */
module.exports = {
  // Removed 'output: export' to support dynamic Firestore data
  // Firebase Hosting supports Next.js SSR via Firebase Functions
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
