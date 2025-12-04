export default function Pagination({ page, totalPages, onPageChange }) {
  const isPrevDisabled = page <= 1;
  const isNextDisabled = page >= totalPages;

  const handlePrev = () => {
    if (!isPrevDisabled) {
      onPageChange(page - 1);
    }
  };

  const handleNext = () => {
    if (!isNextDisabled) {
      onPageChange(page + 1);
    }
  };

  return (
    <div className="flex items-center justify-center gap-3 mt-8">
      <button
        onClick={handlePrev}
        disabled={isPrevDisabled}
        className="px-5 py-2.5 rounded-lg bg-white border border-gray-300 text-black font-medium hover:bg-black hover:text-white hover:border-black disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-black disabled:hover:border-gray-300 transition-all duration-200"
      >
        ← Previous
      </button>
      <span className="text-sm font-medium text-gray-700 min-w-[120px] text-center">
        Page {page} of {totalPages || 1}
      </span>
      <button
        onClick={handleNext}
        disabled={isNextDisabled}
        className="px-5 py-2.5 rounded-lg bg-black text-white font-medium hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-black transition-all duration-200"
      >
        Next →
      </button>
    </div>
  );
}