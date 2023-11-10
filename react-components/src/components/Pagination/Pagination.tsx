import './Pagination.css';

interface PaginationProps {
  currentPage: number;
  itemsPerPage: number;
  itemsTotalCount: number;
  updatePageNumber: (page: number) => void;
}

export default function Pagination({
  currentPage,
  itemsPerPage,
  itemsTotalCount,
  updatePageNumber,
}: PaginationProps) {
  const maxPage = Math.ceil(itemsTotalCount / itemsPerPage);

  const toTheFirstPage = () => {
    updatePageNumber(1);
  };

  const toThePrevPage = () => {
    if (currentPage > 1) {
      updatePageNumber(currentPage - 1);
    }
  };

  const toTheNextPage = () => {
    if (currentPage < maxPage) {
      updatePageNumber(currentPage + 1);
    }
  };

  const toTheLastPage = () => {
    updatePageNumber(maxPage);
  };

  return (
    <div className="pagination">
      <button
        disabled={currentPage === 1}
        className="pagination__button"
        type="button"
        onClick={toTheFirstPage}
      >
        &lt;&lt;
      </button>

      <button
        disabled={currentPage === 1}
        className="pagination__button"
        type="button"
        onClick={toThePrevPage}
      >
        &lt;
      </button>

      <p className="current-page">{currentPage}</p>

      <button
        disabled={currentPage === maxPage}
        className="pagination__button"
        type="button"
        onClick={toTheNextPage}
      >
        &gt;
      </button>

      <button
        disabled={currentPage === maxPage}
        className="pagination__button"
        type="button"
        onClick={toTheLastPage}
      >
        &gt;&gt;
      </button>
    </div>
  );
}
