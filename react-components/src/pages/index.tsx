import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ProductList from '../components/ProductList/ProductList';
import ProductDetails from '../components/ProductDetails/ProductDetails';
import detailsStyles from '../components/ProductDetails/ProductDetails.module.css';
import {
  getProducts,
  getDetails,
  getRunningQueriesThunk,
} from '../state/appApi';
import { wrapper } from '../state/store';

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const { page, size, search } = context.query;
    const { id: routeId } = context.query;
    console.log(context.query);

    try {
      if (routeId) {
        await store.dispatch(getDetails.initiate(Number(routeId)));
      } else {
        await store.dispatch(
          getProducts.initiate({
            currentPage: page ? +page : 1,
            itemsPerPage: size ? +size : 5,
            searchValue: search?.toString() || '',
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
    // setTimeout(() => {
    const { id, ...queryParams } = router.query;
    router.replace({
      pathname: router.pathname,
      query: queryParams,
    });
    setDetailsStyleClasses(detailsStyles.details);
    // });
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
    <div className="main">
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
