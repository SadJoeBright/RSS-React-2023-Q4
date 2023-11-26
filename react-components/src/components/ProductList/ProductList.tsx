import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import ProductCard from '../ProductCard/ProductCard';
import { AppDispatch, RootState } from '../../state/store';
import Loader from '../Loader/Loader';
import { Product } from '../../types/types';
import { setProductListLoadingState } from '../../state/productListLoadingState/productListLoadingState';
import styles from './ProductList.module.css';
import { useGetProductsQuery } from '../../state/appApi';

export default function ProductList() {
  const searchValue = useSelector(
    (state: RootState) => state.searchValue.searchValue
  );

  const itemsPerPage = useSelector(
    (state: RootState) => state.itemsPerPage.itemsPerPage
  );

  const router = useRouter();

  const currentPage = Number(router.query.page) || 1;

  const { data, isFetching } = useGetProductsQuery({
    searchValue,
    itemsPerPage,
    currentPage,
  });

  const isLoading = useSelector(
    (state: RootState) => state.productListLoadingState.isLoading
  );

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(setProductListLoadingState(isFetching));
  }, [isFetching]);

  const toDetailsPage = (product: Product) => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, id: product.id },
    });
  };

  return (
    <section className={styles.results}>
      {isLoading && <Loader />}
      {!data?.products.length && <p className={styles.noResults}>No results</p>}
      {data &&
        data.products.map((product: Product) => (
          <ProductCard
            key={product.id}
            product={product}
            clickHandler={() => toDetailsPage(product)}
          />
        ))}
    </section>
  );
}
