import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { RootState } from '../../state/store';
import { useGetProductsQuery } from '../../state/appApi';
import styles from './Pagination.module.css';

export default function Pagination() {
  const router = useRouter();
  const currentPage = Number(router.query.page) || 1;
  const [maxPage, setMaxPage] = useState(1);

  const itemsPerPage = Number(router.query.size) || 5;

  const searchValue = useSelector(
    (state: RootState) => state.searchValue.searchValue
  );

  const { data } = useGetProductsQuery({
    searchValue,
    itemsPerPage,
    currentPage,
  });

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
    if (router.query.search) {
      updatePageInURL(1);
    }
  }, [router.query.search]);

  const toTheFirstPage = () => {
    updatePageInURL(1);
  };

  const toThePrevPage = () => {
    if (currentPage > 1) {
      updatePageInURL(currentPage - 1);
    }
  };

  const toTheNextPage = () => {
    if (currentPage < maxPage) {
      updatePageInURL(currentPage + 1);
    }
  };

  const toTheLastPage = () => {
    updatePageInURL(maxPage);
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
