import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ProductList from '../src/components/ProductList/ProductList';
import './global.module.css';
import ProductDetails from '../src/components/ProductDetails/ProductDetails';
import detailsStyles from '../src/components/ProductDetails/ProductDetails.module.css';
import {
  getProducts,
  getDetails,
  getRunningQueriesThunk,
} from '../src/state/appApi';
import { wrapper } from '../src/state/store';

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const { currentPage, itemsPerPage, searchValue } = context.query;
    const { id: routeId } = context.query;

    try {
      if (routeId) {
        await store.dispatch(getDetails.initiate(Number(routeId)));
      } else {
        await store.dispatch(
          getProducts.initiate({
            currentPage: currentPage ? +currentPage : 1,
            itemsPerPage: itemsPerPage ? +itemsPerPage : 5,
            searchValue: searchValue?.toString() || '',
          })
        );
      }

      await Promise.all(store.dispatch(getRunningQueriesThunk()));
    } catch (error) {
      console.error('Error fetching data:', error);
    }

    return {
      props: {},
    };
  }
);

function Home() {
  const router = useRouter();
  const { id: routeId } = router.query;
  const [detailsStyleClasses, setDetailsStyleClasses] = useState('details');

  const hideDetails = () => {
    setDetailsStyleClasses(detailsStyles.details);

    setTimeout(() => {
      const { id, ...queryParams } = router.query;
      router.replace({
        pathname: router.pathname,
        query: queryParams,
      });
    }, 200);
  };

  useEffect(() => {
    if (routeId) {
      setTimeout(() => {
        setDetailsStyleClasses(
          `${detailsStyles.details} ${detailsStyles.details_visible}`
        );
      });
    }
  }, [routeId]);

  return (
    <div>
      <ProductList />
      {routeId && (
        <ProductDetails
          productId={Number(routeId)}
          handleClick={hideDetails}
          styleClasses={detailsStyleClasses}
        />
      )}
    </div>
  );
}

export default Home;
