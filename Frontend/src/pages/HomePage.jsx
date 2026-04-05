// HomePage.jsx
import SEO from '../components/common/SEO';
import HeroBanner from '../components/home/HeroBanner';
import CategorySection from '../components/home/CategorySection';
import FeaturedProducts from '../components/home/FeaturedProducts';
import LatestProducts from '../components/home/LatestProducts';
import WhyChooseUs from '../components/home/WhyChooseUs';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiMail } from 'react-icons/fi';
import { useState } from 'react';
import toast from 'react-hot-toast';

const HomePage = () => {
  const [email, setEmail] = useState('');
  const [subscribing, setSubscribing] = useState(false);

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    
    setSubscribing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast.success('Thanks for subscribing!');
    setEmail('');
    setSubscribing(false);
  };

  return (
    <div className="min-h-screen bg-bg-primary">
      <SEO title="Home" description="AR Hobby - Your destination for collectible currencies and coins" />
      
      {/* Hero Section */}
      <HeroBanner />
      
      {/* Categories Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <CategorySection />
      </section>
      
      {/* Featured Products Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-bg-secondary">
        <FeaturedProducts />
      </section>
      
      {/* Promotional Banner */}
      <section className="py-12 sm:py-16 bg-gradient-to-r from-primary-900 via-primary-800 to-primary-700 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div className="text-center lg:text-left">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
                Free Shipping on Orders Above ₹500
              </h2>
              <p className="text-lg text-primary-100 max-w-xl">
                Start building your collection today! Enjoy free delivery on all orders over ₹500.
              </p>
            </div>
            <div className="flex-shrink-0">
              <Link 
                to="/shop"
                className="inline-flex items-center gap-3 px-8 py-4 bg-white text-primary font-bold rounded-xl cursor-pointer transition-all duration-300 hover:bg-primary-50 hover:shadow-2xl active:scale-95 text-lg group"
              >
                Shop Now
                <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Latest Products Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <LatestProducts />
      </section>
      
      {/* Why Choose Us Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-bg-secondary">
        <WhyChooseUs />
      </section>
      
      {/* Newsletter Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-3xl p-8 sm:p-12 lg:p-16 border border-primary-200 text-center">
            <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center mx-auto mb-6 shadow-lg shadow-primary/30">
              <FiMail className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-text-primary mb-4">
              Join Our Newsletter
            </h2>
            <p className="text-text-secondary max-w-xl mx-auto mb-8">
              Subscribe to get updates on new arrivals, exclusive offers, and numismatic news!
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <div className="flex-1 relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full px-5 py-4 pl-12 rounded-xl border border-border bg-white text-text-primary placeholder:text-text-light transition-all duration-300 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/20"
                />
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-light" />
              </div>
              <button 
                type="submit"
                disabled={subscribing}
                className="px-8 py-4 bg-primary text-white font-bold rounded-xl cursor-pointer transition-all duration-300 hover:bg-primary-dark hover:shadow-lg hover:shadow-primary/30 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {subscribing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span className="hidden sm:inline">Subscribing...</span>
                  </>
                ) : (
                  <span>Subscribe</span>
                )}
              </button>
            </form>
            <p className="text-xs text-text-light mt-4">
              By subscribing, you agree to our Privacy Policy. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-8 sm:py-12 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center">
            {[
              { number: '5000+', label: 'Happy Customers' },
              { number: '10000+', label: 'Items Sold' },
              { number: '100%', label: 'Authentic Items' },
              { number: '4.9★', label: 'Customer Rating' }
            ].map((stat, index) => (
              <div key={index} className="text-white">
                <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary-300 mb-1">
                  {stat.number}
                </p>
                <p className="text-sm sm:text-base text-gray-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;