"use client";

export default function Pagination1({
  currentPage,
  totalPages,
  onPageChange,
}) {
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <>
      <div className="mbp_pagination text-center">
        <ul className="page_navigation">
          <li
            className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
            onClick={handlePreviousPage}
          >
            <a className="page-link">
              <span className="fas fa-angle-left" />
            </a>
          </li>
          {Array.from({ length: totalPages }, (_, i) => (
            <li
              key={i}
              className={`page-item ${currentPage === i + 1 ? "active" : ""}`}
              onClick={() => onPageChange(i + 1)}
            >
              <a className="page-link">{i + 1}</a>
            </li>
          ))}
          <li
            className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}
            onClick={handleNextPage}
          >
            <a className="page-link">
              <span className="fas fa-angle-right" />
            </a>
          </li>
        </ul>
        <p className="mt10 mb-0 pagination_page_count text-center">
          Page {currentPage} of {totalPages}
        </p>
      </div>
    </>
  );
}
