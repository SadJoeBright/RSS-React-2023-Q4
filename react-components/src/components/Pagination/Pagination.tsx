import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/appContext';
import './Pagination.css';

export default function Pagination() {
  const { itemsTotalCount, currentPage, itemsPerPage, setCurrentPage } =
    useAppContext();

  const maxPage = Math.ceil(itemsTotalCount / itemsPerPage);

  const navigate = useNavigate();

  const toTheFirstPage = () => {
    setCurrentPage(1);
    navigate(`products/?page=1`);
  };

  const toThePrevPage = () => {
    if (currentPage > 1) {
      navigate(`products/?page=${currentPage - 1}`);
      setCurrentPage(currentPage - 1);
    }
  };

  const toTheNextPage = () => {
    if (currentPage < maxPage) {
      navigate(`products/?page=${currentPage + 1}`);
      setCurrentPage(currentPage + 1);
    }
  };

  const toTheLastPage = () => {
    navigate(`products/?page=${maxPage}`);
    setCurrentPage(maxPage);
  };

  return (
    <div className="pagination">
      <button
        disabled={currentPage === 1}
        className="pagination__button"
        type="button"
        onClick={toTheFirstPage}
        data-testid="firstPageButton"
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
        data-testid="nextPageButton"
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
