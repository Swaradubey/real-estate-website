import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { createBlogPost } from "@/lib/firestore";

/**
 * POST /api/blogs
 * Create a new blog post using Firebase Client SDK (no firebase-admin, no service account).
 * Auth is enforced via NextAuth session — only logged-in admins can publish.
 */
export async function POST(req: Request) {
  try {
    // 1. Authenticate the session (NextAuth)
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { success: false, message: "Unauthorized: You must be logged in as an admin to publish." },
        { status: 401 }
      );
    }

    // 2. Parse and validate the request body
    const body = await req.json();
    const { title, content, author, image, seoTitle, metaDescription, keywords } = body;

    if (!title || !content || !author) {
      return NextResponse.json(
        { success: false, message: "Missing required fields: title, content, and author are required." },
        { status: 400 }
      );
    }

    // 3. Create the blog post via Firestore client SDK (lib/firestore.ts)
    const post = await createBlogPost({
      title,
      content,
      author,
      image,
      seoTitle,
      metaDescription,
      keywords: Array.isArray(keywords) ? keywords : [],
    });

    console.log(`[API Blog Create] SUCCESS: Created blog ID: ${post.id}, slug: ${post.slug}`);

    return NextResponse.json({
      success: true,
      message: "Blog post published successfully!",
      blogId: post.id,
      slug: post.slug,
    });
  } catch (error: any) {
    console.error("[API Blog Create] ERROR:", error);
    return NextResponse.json(
      { success: false, message: error.message || "An internal server error occurred while publishing." },
      { status: 500 }
    );
  }
}
