import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useAppContext } from '../context/appContext';
import './Pagination.css';
import { RootState } from '../../state/store';
import { useGetProductsQuery } from '../../state/appApi';

export default function Pagination() {
  const { currentPage, setCurrentPage } = useAppContext();
  const [maxPage, setMaxPage] = useState(1);

  const itemsPerPage = useSelector(
    (state: RootState) => state.itemsPerPage.itemsPerPage
  );

  const searchValue = useSelector(
    (state: RootState) => state.searchValue.searchValue
  );

  const { data } = useGetProductsQuery({
    searchValue,
    itemsPerPage,
    currentPage,
  });

  useEffect(() => {
    if (data?.total) {
      const itemsTotalCount = data.total;
      setMaxPage(Math.ceil(itemsTotalCount / itemsPerPage));
    } else {
      setMaxPage(1);
    }
  });

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

      <span className="current-page">{currentPage}</span>

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
