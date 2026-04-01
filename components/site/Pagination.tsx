"use client";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
      }
    }
    
    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-12">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`font-body text-xs tracking-widest uppercase py-3 px-5 border transition-all ${
          currentPage === 1
            ? "border-gold/20 text-cream/30 cursor-not-allowed"
            : "border-gold/50 text-cream hover:border-gold hover:bg-gold hover:text-ink"
        }`}
      >
        Previous
      </button>

      {/* Page Numbers */}
      <div className="flex items-center gap-1">
        {getPageNumbers().map((page, index) => (
          <div key={index}>
            {page === "..." ? (
              <span className="font-body text-cream/50 px-3">...</span>
            ) : (
              <button
                onClick={() => onPageChange(page as number)}
                className={`font-body text-sm w-10 h-10 border transition-all ${
                  currentPage === page
                    ? "bg-gold border-gold text-ink"
                    : "border-gold/30 text-cream hover:border-gold hover:text-gold"
                }`}
              >
                {page}
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`font-body text-xs tracking-widest uppercase py-3 px-5 border transition-all ${
          currentPage === totalPages
            ? "border-gold/20 text-cream/30 cursor-not-allowed"
            : "border-gold/50 text-cream hover:border-gold hover:bg-gold hover:text-ink"
        }`}
      >
        Next
      </button>
    </div>
  );
}
