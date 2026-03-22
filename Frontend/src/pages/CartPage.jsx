import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCart } from '../features/cart/cartSlice';
import CartItem from '../components/cart/CartItem';
import CartSummary from '../components/cart/CartSummary';
import Loader from '../components/common/Loader';
import EmptyState from '../components/common/EmptyState';
import SEO from '../components/common/SEO';
import { FiShoppingCart } from 'react-icons/fi';

const CartPage = () => {
  const dispatch = useDispatch();
  const { cart, loading } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  if (loading) return <Loader />;

  if (!cart || cart.items?.length === 0) {
    return (
      <div>
        <SEO title="Cart" />
        <EmptyState
          icon={<FiShoppingCart />}
          title="Your Cart is Empty"
          message="Looks like you haven't added any items to your cart yet."
          actionText="Start Shopping"
          actionLink="/shop"
        />
      </div>
    );
  }

  return (
    <div>
      <SEO title="Shopping Cart" />
      <h1>Shopping Cart</h1>
      <div>
        <div>
          {cart.items.map((item) => (
            <CartItem key={item._id} item={item} />
          ))}
        </div>
        <div>
          <CartSummary cart={cart} />
          <Link to="/checkout">Proceed to Checkout</Link>
          <Link to="/shop">Continue Shopping</Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage;