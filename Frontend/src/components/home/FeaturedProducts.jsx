import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchFeaturedProducts } from '../../features/product/productSlice';
import ProductCard from '../product/ProductCard';
import { FiArrowRight, FiStar } from 'react-icons/fi';

const FeaturedProducts = () => {
  const dispatch = useDispatch();
  const { featuredProducts } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchFeaturedProducts({ limit: 8 }));
  }, [dispatch]);

  if (featuredProducts.length === 0) return null;

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-bg-secondary relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2316a34a' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      ></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary-100 text-primary-dark 
                         text-xs sm:text-sm font-semibold rounded-full mb-4 tracking-wide uppercase">
            <FiStar className="text-primary" />
            Handpicked
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-text-primary mb-4 tracking-tight">
            Featured <span className="text-primary">Collections</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full mb-4"></div>
          <p className="text-text-secondary text-base sm:text-lg max-w-2xl mx-auto">
            Discover our most sought-after collectible currencies and rare finds
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6 lg:gap-7">
          {featuredProducts.map((product, index) => (
            <div
              key={product._id}
              className="transform transition-all duration-500"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12 sm:mt-16">
          <Link
            to="/shop"
            className="group inline-flex items-center gap-3 bg-primary hover:bg-primary-dark 
                     text-text-white font-bold py-4 px-10 rounded-full cursor-pointer 
                     transition-all duration-400 ease-out shadow-lg shadow-primary/25 
                     hover:shadow-xl hover:shadow-primary/30 transform hover:-translate-y-1
                     text-sm sm:text-base"
          >
            View All Products
            <FiArrowRight className="text-lg transition-transform duration-300 group-hover:translate-x-1.5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;