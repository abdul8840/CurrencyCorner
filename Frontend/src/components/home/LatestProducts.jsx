import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchLatestProducts } from '../../features/product/productSlice';
import ProductCard from '../product/ProductCard';
import { FiArrowRight, FiClock } from 'react-icons/fi';

const LatestProducts = () => {
  const dispatch = useDispatch();
  const { latestProducts } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchLatestProducts({ limit: 8 }));
  }, [dispatch]);

  if (latestProducts.length === 0) return null;

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-bg-primary relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-10 right-10 w-40 h-40 bg-primary-50 rounded-full blur-3xl opacity-60"></div>
      <div className="absolute bottom-10 left-10 w-56 h-56 bg-primary-100/30 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-12 sm:mb-16 gap-4">
          <div>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary-100 text-primary-dark 
                           text-xs sm:text-sm font-semibold rounded-full mb-4 tracking-wide uppercase">
              <FiClock className="text-primary" />
              Just Arrived
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-text-primary tracking-tight">
              Latest <span className="text-primary">Additions</span>
            </h2>
            <div className="w-20 h-1 bg-primary rounded-full mt-4"></div>
          </div>

          {/* Desktop View All */}
          <Link
            to="/shop?sort=new-to-old"
            className="hidden sm:inline-flex items-center gap-2 text-primary hover:text-primary-dark 
                     font-semibold cursor-pointer transition-all duration-300 group text-base"
          >
            View All New Arrivals
            <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1.5" />
          </Link>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6 lg:gap-7">
          {latestProducts.map((product, index) => (
            <div
              key={product._id}
              className="transform transition-all duration-500"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* Mobile View All Button */}
        <div className="text-center mt-12 sm:hidden">
          <Link
            to="/shop?sort=new-to-old"
            className="group inline-flex items-center gap-3 bg-primary hover:bg-primary-dark 
                     text-text-white font-bold py-4 px-10 rounded-full cursor-pointer 
                     transition-all duration-400 ease-out shadow-lg shadow-primary/25 
                     hover:shadow-xl hover:shadow-primary/30 transform hover:-translate-y-1
                     text-sm"
          >
            View All New Arrivals
            <FiArrowRight className="text-lg transition-transform duration-300 group-hover:translate-x-1.5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LatestProducts;