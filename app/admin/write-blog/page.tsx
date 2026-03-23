import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import BlogCreateForm from "../../../lib/blog-create/BlogCreateForm";

export default async function WriteBlogPage() {
  // Check if user is authenticated
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect("/login?callbackUrl=/admin/write-blog");
  }

  return (
    <div className="min-h-screen bg-[#F8F7F4]">
      <BlogCreateForm />
    </div>
  );
}
