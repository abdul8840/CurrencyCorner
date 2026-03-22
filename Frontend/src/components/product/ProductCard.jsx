import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../features/cart/cartSlice';
import { formatCurrency } from '../../utils/helpers';
import { FiShoppingCart } from 'react-icons/fi';
import toast from 'react-hot-toast';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  const handleAddToCart = (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      toast.error('Please login to add items to cart');
      return;
    }
    if (product.stockStatus === 'Out of Stock') {
      toast.error('Product is out of stock');
      return;
    }
    dispatch(addToCart({ productId: product._id, quantity: 1 }))
      .unwrap()
      .then(() => toast.success('Added to cart'))
      .catch((err) => toast.error(err));
  };

  return (
    <div>
      <Link to={`/product/${product.slug}`}>
        <div>
          <img
            src={product.images?.[0]?.url || '/placeholder.png'}
            alt={product.name}
          />
          {product.stockStatus === 'Out of Stock' && (
            <span>Out of Stock</span>
          )}
          {product.comparePrice && product.comparePrice > product.price && (
            <span>{Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)}% OFF</span>
          )}
        </div>
        <div>
          <p>{product.category?.name}</p>
          <h3>{product.name}</h3>
          {product.country && <p>{product.country} {product.year && `• ${product.year}`}</p>}
          <div>
            <span>{formatCurrency(product.price)}</span>
            {product.comparePrice && product.comparePrice > product.price && (
              <span>{formatCurrency(product.comparePrice)}</span>
            )}
          </div>
        </div>
      </Link>
      <button onClick={handleAddToCart} disabled={product.stockStatus === 'Out of Stock'}>
        <FiShoppingCart /> Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;