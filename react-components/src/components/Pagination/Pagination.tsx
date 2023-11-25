import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useAppContext } from '../context/appContext';
import { RootState } from '../../state/store';
import { useGetProductsQuery } from '../../state/appApi';
import styles from './Pagination.module.css';

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

  const router = useRouter();

  const updatePageInURL = (newPage: number) => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, page: newPage },
    });
  };

  useEffect(() => {
    if (data?.total) {
      const itemsTotalCount = data.total;
      setMaxPage(Math.ceil(itemsTotalCount / itemsPerPage));
    } else {
      setMaxPage(1);
    }
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [searchValue]);

  const toTheFirstPage = () => {
    setCurrentPage(1);
    updatePageInURL(1);
  };

  const toThePrevPage = () => {
    if (currentPage > 1) {
      updatePageInURL(currentPage - 1);
      setCurrentPage(currentPage - 1);
    }
  };

  const toTheNextPage = () => {
    if (currentPage < maxPage) {
      updatePageInURL(currentPage + 1);
      setCurrentPage(currentPage + 1);
    }
  };

  const toTheLastPage = () => {
    updatePageInURL(maxPage);
    setCurrentPage(maxPage);
  };

  return (
    <div className={styles.pagination}>
      <button
        disabled={currentPage === 1}
        className={styles.pagination__button}
        type="button"
        onClick={toTheFirstPage}
        data-testid="firstPageButton"
      >
        &lt;&lt;
      </button>

      <button
        disabled={currentPage === 1}
        className={styles.pagination__button}
        type="button"
        onClick={toThePrevPage}
      >
        &lt;
      </button>

      <span className={styles.currentPage}>{currentPage}</span>

      <button
        disabled={currentPage === maxPage}
        className={styles.pagination__button}
        type="button"
        onClick={toTheNextPage}
        data-testid="nextPageButton"
      >
        &gt;
      </button>

      <button
        disabled={currentPage === maxPage}
        className={styles.pagination__button}
        type="button"
        onClick={toTheLastPage}
      >
        &gt;&gt;
      </button>
    </div>
  );
}
