type PaginationProps = {
  data: number[];
  currentPage: number;
  onArrowClick: (tyoe: "prev" | "next") => void;
  onPageClick: (page: number) => void;
};

// pagination
export function Pagination({
  data,
  currentPage,
  onArrowClick,
  onPageClick,
}: PaginationProps) {
  const pageItem = data.map((page: number) => {
    return (
      <button
        key={page}
        className={`w-8 h-8 inline-flex items-center justify-center text-neutral-900 hover:bg-green-200 rounded-lg ${
          currentPage === page
            ? "border-2 border-primary text-primary font-bold"
            : ""
        }`}
        onClick={() => onPageClick(page)}
      >
        {page}
      </button>
    );
  });
  return (
    <div className="pt-4 flex justify-center items-center text-base">
      <button
        className="w-8 h-8 inline-flex items-center justify-center text-neutral-900 hover:bg-green-200 rounded-lg"
        onClick={() => onArrowClick("prev")}
      >
        &laquo;
      </button>
      {pageItem}
      <button
        className="w-8 h-8 inline-flex items-center justify-center text-neutral-900 hover:bg-green-200 rounded-lg"
        onClick={() => onArrowClick("next")}
      >
        &raquo;
      </button>
    </div>
  );
}
