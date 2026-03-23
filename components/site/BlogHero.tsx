interface BlogHeroProps {
  title?: string;
  postCount: number;
}

export default function BlogHero({ title = "Latest Blogs", postCount }: BlogHeroProps) {
  return (
    <div className="w-full px-4 text-center">
      {/* Decorative Gold Circle */}
      <div className="mb-6 flex justify-center">
        <div className="w-3 h-3 rounded-full bg-gold" />
      </div>
      
      {/* Label Tag */}
      <div className="label-tag mb-5 flex justify-center">
        Market Intelligence
      </div>
      
      {/* Title */}
      <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl text-ink leading-tight max-w-full mx-auto overflow-hidden" style={{ lineHeight: '1.2' }}>
        {title.split(" ").map((word, index) => (
          <span key={index}>
            {index === 1 ? (
              <em className="text-gold">{word}</em>
            ) : (
              word
            )}{" "}
          </span>
        ))}
      </h1>

      {/* Post Count */}
      <div className="flex items-center gap-3 justify-center mt-6">
        <div className="font-body text-sm text-muted">
          {postCount} Post{postCount !== 1 ? "s" : ""}
        </div>
      </div>
    </div>
  );
}
