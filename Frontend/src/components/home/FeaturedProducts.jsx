import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchFeaturedProducts } from '../../features/product/productSlice';
import ProductCard from '../product/ProductCard';

const FeaturedProducts = () => {
  const dispatch = useDispatch();
  const { featuredProducts } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchFeaturedProducts({ limit: 8 }));
  }, [dispatch]);

  if (featuredProducts.length === 0) return null;

  return (
    <section>
      <div>
        <h2>Featured Collections</h2>
        <div>
          {featuredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
        <div>
          <Link to="/shop">View All Products</Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;