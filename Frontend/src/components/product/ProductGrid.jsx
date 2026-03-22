import ProductCard from './ProductCard';
import EmptyState from '../common/EmptyState';
import { FiPackage } from 'react-icons/fi';

const ProductGrid = ({ products }) => {
  if (!products || products.length === 0) {
    return (
      <EmptyState
        icon={<FiPackage />}
        title="No Products Found"
        message="Try adjusting your filters or search query."
        actionText="Browse All Products"
        actionLink="/shop"
      />
    );
  }

  return (
    <div>
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;