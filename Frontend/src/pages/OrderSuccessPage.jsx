import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrderById } from '../features/order/orderSlice';
import OrderSuccess from '../components/checkout/OrderSuccess';
import Loader from '../components/common/Loader';
import SEO from '../components/common/SEO';
import { FiCheckCircle, FiPackage, FiHome, FiShoppingBag } from 'react-icons/fi';

const OrderSuccessPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { order, bankDetails, loading } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(fetchOrderById(id));
  }, [id, dispatch]);

  if (loading || !order) {
    return (
      <div className="min-h-screen bg-bg-secondary flex items-center justify-center">
        <SEO title="Order Placed" />
        <div className="text-center">
          <Loader />
          <p className="mt-4 text-text-secondary">Loading your order details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 via-white to-bg-secondary">
      <SEO title="Order Placed Successfully" />
      
      {/* Success Animation Header */}
      <div className="relative overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
          
          {/* Confetti-like elements */}
          <div className="absolute top-20 left-[10%] w-3 h-3 bg-primary/20 rounded-full animate-bounce-subtle"></div>
          <div className="absolute top-32 left-[25%] w-2 h-2 bg-primary/30 rounded-full animate-bounce-subtle" 
               style={{ animationDelay: '0.2s' }}></div>
          <div className="absolute top-24 right-[15%] w-4 h-4 bg-primary/15 rounded-full animate-bounce-subtle"
               style={{ animationDelay: '0.4s' }}></div>
          <div className="absolute top-40 right-[30%] w-2 h-2 bg-primary/25 rounded-full animate-bounce-subtle"
               style={{ animationDelay: '0.6s' }}></div>
        </div>

        {/* Success Header */}
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8 text-center">
          {/* Success Icon */}
          <div className="relative inline-flex mb-6">
            <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-primary to-primary-dark 
                          rounded-full flex items-center justify-center shadow-2xl shadow-primary/30
                          animate-pulse-green">
              <FiCheckCircle className="w-12 h-12 sm:w-16 sm:h-16 text-white" />
            </div>
            {/* Ring animation */}
            <div className="absolute inset-0 rounded-full border-4 border-primary/20 animate-ping"></div>
          </div>

          {/* Success Message */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mb-4 animate-fade-in">
            Order Placed <span className="text-primary">Successfully!</span>
          </h1>
          
          <p className="text-lg text-text-secondary max-w-xl mx-auto animate-fade-in" 
             style={{ animationDelay: '0.1s' }}>
            Thank you for your order. We've received your order and will begin processing it soon.
          </p>

          {/* Order Number Badge */}
          <div className="mt-6 inline-flex items-center gap-3 px-6 py-3 bg-white rounded-full 
                        shadow-lg border border-border animate-fade-in"
               style={{ animationDelay: '0.2s' }}>
            <FiPackage className="w-5 h-5 text-primary" />
            <span className="text-text-secondary">Order Number:</span>
            <span className="font-bold text-primary text-lg">#{order.orderNumber}</span>
          </div>
        </div>
      </div>

      {/* Order Success Component */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <OrderSuccess order={order} bankDetails={bankDetails} />
        </div>

        {/* Quick Actions */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 
                      animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <Link 
            to={`/order/${order._id}`}
            className="flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 
                     bg-primary hover:bg-primary-dark text-white rounded-xl font-semibold 
                     transition-all duration-300 cursor-pointer shadow-lg shadow-primary/30
                     hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-0.5 active:scale-[0.98]"
          >
            <FiPackage className="w-5 h-5" />
            View Order Details
          </Link>
          
          <Link 
            to="/shop"
            className="flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 
                     bg-white hover:bg-bg-secondary text-text-primary rounded-xl font-semibold 
                     transition-all duration-300 cursor-pointer border-2 border-border
                     hover:border-primary hover:text-primary active:scale-[0.98]"
          >
            <FiShoppingBag className="w-5 h-5" />
            Continue Shopping
          </Link>
          
          <Link 
            to="/"
            className="flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 
                     bg-transparent hover:bg-bg-secondary text-text-secondary rounded-xl font-medium 
                     transition-all duration-300 cursor-pointer active:scale-[0.98]"
          >
            <FiHome className="w-5 h-5" />
            Back to Home
          </Link>
        </div>

        {/* Additional Info */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 animate-fade-in" 
             style={{ animationDelay: '0.5s' }}>
          <div className="bg-white rounded-2xl p-6 border border-border text-center
                        hover:shadow-lg hover:border-primary/20 transition-all duration-300">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="font-semibold text-text-primary mb-1">Confirmation Email</h3>
            <p className="text-sm text-text-secondary">Check your inbox for order confirmation details</p>
          </div>
          
          <div className="bg-white rounded-2xl p-6 border border-border text-center
                        hover:shadow-lg hover:border-primary/20 transition-all duration-300">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="font-semibold text-text-primary mb-1">Track Your Order</h3>
            <p className="text-sm text-text-secondary">We'll notify you when your order ships</p>
          </div>
          
          <div className="bg-white rounded-2xl p-6 border border-border text-center
                        hover:shadow-lg hover:border-primary/20 transition-all duration-300">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <h3 className="font-semibold text-text-primary mb-1">Need Help?</h3>
            <p className="text-sm text-text-secondary">Our support team is always here for you</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;