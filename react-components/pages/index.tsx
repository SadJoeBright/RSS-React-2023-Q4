import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ProductList from '../src/components/ProductList/ProductList';
import './global.module.css';
import ProductDetails from '../src/components/ProductDetails/ProductDetails';
import detailsStyles from '../src/components/ProductDetails/ProductDetails.module.css';

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
    }, 300);
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
