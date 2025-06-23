export default function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <div className="flex justify-center mt-4">
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="px-3 py-1 border rounded disabled:opacity-50"
      >
        Previous
      </button>
      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i}
          onClick={() => onPageChange(i + 1)}
          className={`px-3 py-1 border rounded mx-1 ${
            currentPage === i + 1 ? "bg-indigo-500 text-white" : ""
          }`}
        >
          {i + 1}
        </button>
      ))}
      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="px-3 py-1 border rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}
