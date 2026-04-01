import React from "react";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  overlayColor?: string;
}

const PageHero: React.FC<PageHeroProps> = ({
  title,
  subtitle,
  backgroundImage = "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1600&q=80",
  overlayColor = "rgba(0, 0, 0, 0.6)",
}) => {
  return (
    <section className="relative w-full h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-[2000ms] hover:scale-105"
        style={{ backgroundImage: `url('${backgroundImage}')` }}
      />
      
      {/* Overlay */}
      <div 
        className="absolute inset-0"
        style={{ backgroundColor: overlayColor }}
      />
      
      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1 className="font-heading text-4xl sm:text-5xl md:text-7xl text-white mb-6 animate-fadeUp opacity-0" style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}>
          {title}
        </h1>
        {subtitle && (
          <p className="font-body text-lg sm:text-xl md:text-2xl text-cream/90 tracking-wide animate-fadeUp opacity-0" style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}>
            {subtitle}
          </p>
        )}
        
        {/* Elegant accent line */}
        <div className="mt-8 flex justify-center animate-fadeIn opacity-0" style={{ animationDelay: '600ms', animationFillMode: 'forwards' }}>
          <div className="w-24 h-[1px] bg-gold" />
        </div>
      </div>
    </section>
  );
};

export default PageHero;
