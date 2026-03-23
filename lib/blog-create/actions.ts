"use server";

import { createBlogPost, type FirestoreBlogPost } from "@/lib/firestore";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

const MAX_IMAGE_BYTES = 10 * 1024 * 1024; // 10 MB
const ALLOWED_IMAGE_MIME_TYPES = new Set(["image/jpeg", "image/jpg", "image/png", "image/webp"]);

function validateEmbeddedImages(content: string) {
  const imgTagRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/gi;
  let match: RegExpExecArray | null;

  while ((match = imgTagRegex.exec(content)) !== null) {
    const src = match[1];

    if (!src.startsWith("data:")) continue;

    const [meta, base64Part] = src.split(",", 2);
    if (!meta || !base64Part) continue;

    const mimeMatch = /^data:([^;]+);base64$/i.exec(meta);
    const mime = mimeMatch?.[1]?.toLowerCase() ?? "";

    if (!ALLOWED_IMAGE_MIME_TYPES.has(mime)) {
      throw new Error("Only JPG, JPEG, PNG or WEBP images are allowed.");
    }

    const base64 = base64Part.replace(/=+$/, "");
    const estimatedBytes = Math.floor((base64.length * 3) / 4);

    if (estimatedBytes > MAX_IMAGE_BYTES) {
      throw new Error("Image size must be less than 10 MB.");
    }
  }
}

export async function createBlogPostAction(formData: FormData): Promise<FirestoreBlogPost> {
  // Verify user is authenticated
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("Unauthorized: You must be logged in to create a blog post.");
  }

  const title = String(formData.get("title") ?? "");
  const content = String(formData.get("content") ?? "");
  const author = String(formData.get("author") ?? "");
  const image = String(formData.get("image") ?? "");
  const seoTitle = String(formData.get("seoTitle") ?? "");
  const metaDescription = String(formData.get("metaDescription") ?? "");
  const keywordsRaw = String(formData.get("keywords") ?? "");

  if (!title || !content || !author) {
    throw new Error("Title, content, and author are required.");
  }

  validateEmbeddedImages(content);

  const keywords = keywordsRaw
    .split(",")
    .map((k) => k.trim())
    .filter(Boolean);

  const post = await createBlogPost({
    title,
    content,
    author,
    image,
    seoTitle,
    metaDescription,
    keywords,
  });
  
  return post;
}

