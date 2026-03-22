import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchLatestProducts } from '../../features/product/productSlice';
import ProductCard from '../product/ProductCard';

const LatestProducts = () => {
  const dispatch = useDispatch();
  const { latestProducts } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchLatestProducts({ limit: 8 }));
  }, [dispatch]);

  if (latestProducts.length === 0) return null;

  return (
    <section>
      <div>
        <h2>Latest Additions</h2>
        <div>
          {latestProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
        <div>
          <Link to="/shop?sort=new-to-old">View All New Arrivals</Link>
        </div>
      </div>
    </section>
  );
};

export default LatestProducts;