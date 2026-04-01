import BlogCard from "./BlogCard";

interface BlogPost {
  id: string | number;
  title: string;
  slug: string;
  author: string;
  date: string;
  image: string;
  content: string;
  excerpt?: string;
}

interface BlogGridProps {
  posts: BlogPost[];
  getExcerpt: (content: string, maxLength?: number) => string;
}

export default function BlogGrid({ posts, getExcerpt }: BlogGridProps) {
  if (posts.length === 0) {
    return (
      <div className="bg-panel border border-sand p-10 text-center">
        <div className="font-heading text-xl text-ink mb-2">No blogs yet</div>
        <p className="font-body text-sm text-muted">
          Check back soon for new posts.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-10">
      {posts.map((post) => (
        <BlogCard
          key={post.id}
          image={post.image}
          title={post.title}
          author={post.author}
          date={post.date}
          excerpt={post.excerpt || getExcerpt(post.content, 120)}
          slug={post.slug}
        />
      ))}
    </div>
  );
}
