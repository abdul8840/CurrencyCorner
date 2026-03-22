import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductBySlug, fetchRelatedProducts, clearProduct } from '../features/product/productSlice';
import { addToCart } from '../features/cart/cartSlice';
import ProductImageGallery from '../components/product/ProductImageGallery';
import ProductCard from '../components/product/ProductCard';
import Loader from '../components/common/Loader';
import SEO from '../components/common/SEO';
import { formatCurrency } from '../utils/helpers';
import { FiShoppingCart, FiMinus, FiPlus } from 'react-icons/fi';
import toast from 'react-hot-toast';

const ProductDetailPage = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const { product, relatedProducts, loading, error } = useSelector((state) => state.product);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    dispatch(fetchProductBySlug(slug));
    return () => { dispatch(clearProduct()); };
  }, [slug, dispatch]);

  useEffect(() => {
    if (product?._id) {
      dispatch(fetchRelatedProducts({ id: product._id, params: { limit: 4 } }));
    }
  }, [product, dispatch]);

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      toast.error('Please login to add items to cart');
      return;
    }
    dispatch(addToCart({ productId: product._id, quantity }))
      .unwrap()
      .then(() => toast.success('Added to cart'))
      .catch((err) => toast.error(err));
  };

  if (loading) return <Loader />;
  if (error) return <div><p>{error}</p><Link to="/shop">Back to Shop</Link></div>;
  if (!product) return null;

  return (
    <div>
      <SEO title={product.name} description={product.description?.substring(0, 160)} />

      <div>
        <Link to="/shop">Shop</Link> / <Link to={`/category/${product.category?.slug}`}>{product.category?.name}</Link> / {product.name}
      </div>

      <div>
        <div>
          <ProductImageGallery images={product.images} />
        </div>
        <div>
          <span>{product.category?.name}</span>
          <h1>{product.name}</h1>

          <div>
            <span>{formatCurrency(product.price)}</span>
            {product.comparePrice && product.comparePrice > product.price && (
              <>
                <span>{formatCurrency(product.comparePrice)}</span>
                <span>{Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)}% OFF</span>
              </>
            )}
          </div>

          <span>{product.stockStatus}</span>

          <div>
            {product.country && <div><span>Country:</span><span>{product.country}</span></div>}
            {product.year && <div><span>Year:</span><span>{product.year}</span></div>}
            {product.condition && <div><span>Condition:</span><span>{product.condition}</span></div>}
            {product.denomination && <div><span>Denomination:</span><span>{product.denomination}</span></div>}
            {product.material && <div><span>Material:</span><span>{product.material}</span></div>}
            {product.weight && <div><span>Weight:</span><span>{product.weight}</span></div>}
            {product.dimensions && <div><span>Dimensions:</span><span>{product.dimensions}</span></div>}
            {product.rarity && <div><span>Rarity:</span><span>{product.rarity}</span></div>}
          </div>

          <p>{product.description}</p>

          {product.additionalInfo && (
            <div>
              <h3>Additional Information</h3>
              <p>{product.additionalInfo}</p>
            </div>
          )}

          {product.stockStatus === 'In Stock' && (
            <div>
              <div>
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}><FiMinus /></button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}><FiPlus /></button>
              </div>
              <button onClick={handleAddToCart}>
                <FiShoppingCart /> Add to Cart
              </button>
            </div>
          )}

          {product.stock > 0 && <p>{product.stock} in stock</p>}
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <div>
          <h2>Related Products</h2>
          <div>
            {relatedProducts.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailPage;