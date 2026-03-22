import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchCart } from '../features/cart/cartSlice';
import { createOrder, clearError } from '../features/order/orderSlice';
import { removeCoupon } from '../features/coupon/couponSlice';
import AddressSelector from '../components/checkout/AddressSelector';
import CouponInput from '../components/checkout/CouponInput';
import CartSummary from '../components/cart/CartSummary';
import OrderTerms from '../components/checkout/OrderTerms';
import Loader from '../components/common/Loader';
import SEO from '../components/common/SEO';
import toast from 'react-hot-toast';

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cart, loading: cartLoading } = useSelector((state) => state.cart);
  const { loading: orderLoading, error, orderPlaced, order } = useSelector((state) => state.order);
  const { appliedCoupon } = useSelector((state) => state.coupon);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [notes, setNotes] = useState('');

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  useEffect(() => {
    if (orderPlaced && order) {
      navigate(`/order-success/${order._id}`);
    }
  }, [orderPlaced, order, navigate]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const handlePlaceOrder = () => {
    if (!selectedAddress) {
      toast.error('Please select a shipping address');
      return;
    }
    if (!termsAccepted) {
      toast.error('Please accept the terms and conditions');
      return;
    }

    const orderData = {
      shippingAddress: {
        fullName: selectedAddress.fullName,
        phone: selectedAddress.phone,
        addressLine1: selectedAddress.addressLine1,
        addressLine2: selectedAddress.addressLine2,
        city: selectedAddress.city,
        state: selectedAddress.state,
        pincode: selectedAddress.pincode,
        country: selectedAddress.country
      },
      couponCode: appliedCoupon?.code || '',
      notes,
      termsAccepted
    };

    dispatch(createOrder(orderData))
      .unwrap()
      .then(() => {
        dispatch(removeCoupon());
        toast.success('Order placed successfully!');
      })
      .catch(() => {});
  };

  if (cartLoading) return <Loader />;

  if (!cart || cart.items?.length === 0) {
    navigate('/cart');
    return null;
  }

  const discount = appliedCoupon?.discount || 0;

  return (
    <div>
      <SEO title="Checkout" />
      <h1>Checkout</h1>
      <div>
        <div>
          <AddressSelector selectedAddress={selectedAddress} onSelectAddress={setSelectedAddress} />

          <div>
            <h3>Order Items</h3>
            {cart.items.map((item) => (
              <div key={item._id}>
                <img src={item.product?.images?.[0]?.url || '/placeholder.png'} alt={item.product?.name} />
                <div>
                  <p>{item.product?.name}</p>
                  <p>Qty: {item.quantity} × ₹{item.price}</p>
                </div>
                <p>₹{item.price * item.quantity}</p>
              </div>
            ))}
          </div>

          <div>
            <label>Order Notes (Optional)</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Any special instructions..."
            />
          </div>

          <OrderTerms accepted={termsAccepted} onAcceptChange={setTermsAccepted} />
        </div>

        <div>
          <CouponInput orderAmount={cart.totalPrice} />
          <CartSummary cart={cart} discount={discount} />
          <button onClick={handlePlaceOrder} disabled={orderLoading}>
            {orderLoading ? 'Placing Order...' : 'Place Order'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;