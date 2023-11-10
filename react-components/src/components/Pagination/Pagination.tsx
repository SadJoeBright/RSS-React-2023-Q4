import './Pagination.css';

interface PaginationProps {
  currentPage: number;
  toTheFirstPage: () => void;
  toThePrevPage: () => void;
  toTheNextPage: () => void;
  toTheLastPage: () => void;
}

export default function Pagination({
  currentPage,
  toTheFirstPage,
  toThePrevPage,
  toTheNextPage,
  toTheLastPage,
}: PaginationProps) {
  return (
    <div className="pagination">
      <button
        className="pagination__button"
        type="button"
        onClick={toTheFirstPage}
      >
        &lt;&lt;
      </button>

      <button
        className="pagination__button"
        type="button"
        onClick={toThePrevPage}
      >
        &lt;
      </button>

      <p className="current-page">{currentPage}</p>

      <button
        className="pagination__button"
        type="button"
        onClick={toTheNextPage}
      >
        &gt;
      </button>

      <button
        className="pagination__button"
        type="button"
        onClick={toTheLastPage}
      >
        &gt;&gt;
      </button>
    </div>
  );
}
