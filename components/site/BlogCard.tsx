import Link from "next/link";
import Image from "next/image";

interface BlogCardProps {
  image: string;
  title: string;
  author: string;
  date: string;
  excerpt: string;
  slug: string;
}

// Allowed hostnames for next/image optimization
const ALLOWED_IMAGE_HOSTS = [
  "images.unsplash.com",
  "plus.unsplash.com",
  "www.bing.com",
];

// Check if an image URL can use next/image optimization
function canUseNextImage(url: string): boolean {
  if (!url || typeof url !== "string") return false;
  // Allow local images (starting with /)
  if (url.startsWith("/")) return true;
  // Allow data URLs
  if (url.startsWith("data:image/")) return true;
  try {
    const urlObj = new URL(url);
    return ALLOWED_IMAGE_HOSTS.some((host) => urlObj.hostname === host);
  } catch {
    return false;
  }
}

export default function BlogCard({ image, title, author, date, excerpt, slug }: BlogCardProps) {
  const formattedDate = new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const useNextImage = canUseNextImage(image);

  return (
    <article className="group w-full bg-white border border-neutral-200 overflow-hidden flex flex-col h-full">
      {/* Featured Image */}
      <Link href={`/blog/${slug}`} className="block overflow-hidden">
        <div className="relative h-[260px]">
          {image ? (
            useNextImage ? (
              <Image
                src={image}
                alt={title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            ) : (
              // Use regular img tag for external images not in allowed domains
              <img
                src={image}
                alt={title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            )
          ) : (
            <div className="w-full h-full bg-cream-dk" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />
        </div>
      </Link>

      {/* Content */}
      <div className="p-8 flex flex-col grow">
        {/* Date & Author */}
        <div className="font-body text-xs text-muted mb-3">
          {formattedDate} · {author}
        </div>

        {/* Title */}
        <h3 className="font-heading text-xl text-ink leading-snug mb-3">
          <Link href={`/blog/${slug}`} className="hover:text-gold transition-colors duration-300">
            {title}
          </Link>
        </h3>

        {/* Excerpt */}
        <p className="font-body text-sm text-muted leading-relaxed line-clamp-3 mb-6 flex-grow">
          {excerpt}
        </p>

        {/* CTA Button */}
        <div className="mt-auto">
          <Link
            href={`/blog/${slug}`}
            className="btn-outline inline-flex items-center justify-center group-hover:bg-gold group-hover:text-ink transition-all duration-300"
          >
            Read More
          </Link>
        </div>
      </div>
    </article>
  );
}
