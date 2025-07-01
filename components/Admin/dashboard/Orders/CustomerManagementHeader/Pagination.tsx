export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) => {
  const getPaginationRange = () => {
    const range: (number | "...")[] = [];
    const delta = 2; // number of pages to show around current page

    const left = Math.max(2, currentPage - delta);
    const right = Math.min(totalPages - 1, currentPage + delta);

    range.push(1); // always show first page

    if (left > 2) {
      range.push("...");
    }

    for (let i = left; i <= right; i++) {
      range.push(i);
    }

    if (right < totalPages - 1) {
      range.push("...");
    }

    if (totalPages > 1) {
      range.push(totalPages); // always show last page
    }

    return range;
  };

  const paginationItems = getPaginationRange();

  return (
    <nav className="flex gap-2 justify-center items-center mt-6">
      <button
        className="w-6 h-6 text-black"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        aria-label="Previous page"
      >
        &lt;
      </button>

      {paginationItems.map((item, idx) =>
        item === "..." ? (
          <span key={`ellipsis-${idx}`} className="px-2 text-gray-500">
            ...
          </span>
        ) : (
          <button
            key={item}
            className={`w-6 h-6 text-sm rounded ${
              currentPage === item ? "bg-black text-white" : "bg-gray-200 text-black"
            }`}
            onClick={() => onPageChange(item)}
          >
            {item}
          </button>
        )
      )}

      <button
        className="w-6 h-6 text-black"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        aria-label="Next page"
      >
        &gt;
      </button>
    </nav>
  );
};
