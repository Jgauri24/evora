export default function Pagination({ page, totalPages, onPageChange }) {
    const prev = () => onPageChange(Math.max(1, page - 1));
    const next = () => onPageChange(Math.min(totalPages, page + 1));
    return (
      <div className="flex items-center justify-center gap-2 mt-6">
        <button onClick={prev} disabled={page <= 1} className="px-3 py-2 rounded bg-gray-100 disabled:opacity-50">Prev</button>
        <span className="text-sm">Page {page} of {totalPages || 1}</span>
        <button onClick={next} disabled={page >= totalPages} className="px-3 py-2 rounded bg-gray-100 disabled:opacity-50">Next</button>
      </div>
    );
  }