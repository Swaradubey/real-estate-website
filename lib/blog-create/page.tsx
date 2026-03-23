import { redirect } from "next/navigation";

export default async function BlogCreatePage() {
  // Redirect to the new admin write-blog page
  redirect("/admin/write-blog");
}
