// frontend/src/components/products/ProductCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingCart, FiHeart, FiEye } from 'react-icons/fi';

const ProductCard = ({ product, isNew = false }) => {
  const discountPercentage = product.comparePrice 
    ? Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)
    : 0;

  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-100 h-full flex flex-col">
      {/* Image Container */}
      <div className="relative overflow-hidden bg-gray-100 aspect-square">
        <Link to={`/product/${product.slug}`}>
          <img 
            src={product.images?.[0]?.url} 
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </Link>

        {/* Badges */}
        <div className="absolute top-4 left-4 right-4 flex items-start justify-between gap-2 z-20">
          <div className="flex flex-col gap-2">
            {isNew && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-black rounded-full shadow-lg">
                <span className="animate-pulse">✨</span> NEW
              </span>
            )}
            {discountPercentage > 0 && (
              <span className="inline-flex px-3 py-1.5 bg-red-500 text-white text-xs font-black rounded-full">
                -{discountPercentage}%
              </span>
            )}
          </div>
          {product.stock > 0 && (
            <span className="px-3 py-1.5 bg-green-100 text-green-700 text-xs font-bold rounded-full">
              In Stock
            </span>
          )}
        </div>

        {/* Overlay Actions */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100">
          <button className="w-12 h-12 rounded-full bg-white text-green-600 flex items-center justify-center hover:bg-green-50 transition transform hover:scale-110 shadow-lg">
            <FiShoppingCart className="w-6 h-6" />
          </button>
          <button className="w-12 h-12 rounded-full bg-white text-red-600 flex items-center justify-center hover:bg-red-50 transition transform hover:scale-110 shadow-lg">
            <FiHeart className="w-6 h-6" />
          </button>
          <Link 
            to={`/product/${product.slug}`}
            className="w-12 h-12 rounded-full bg-white text-blue-600 flex items-center justify-center hover:bg-blue-50 transition transform hover:scale-110 shadow-lg"
          >
            <FiEye className="w-6 h-6" />
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col">
        <div className="mb-3">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            {product.category?.name}
          </p>
          <Link 
            to={`/product/${product.slug}`}
            className="text-sm sm:text-base font-bold text-gray-900 group-hover:text-green-600 transition line-clamp-2 mt-1"
          >
            {product.name}
          </Link>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="text-yellow-400">★</span>
            ))}
          </div>
          <span className="text-xs text-gray-600">(45)</span>
        </div>

        {/* Price */}
        <div className="mt-auto">
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-xl sm:text-2xl font-black text-green-600">
              ₹{product.price}
            </span>
            {product.comparePrice > product.price && (
              <span className="text-sm line-through text-gray-500">
                ₹{product.comparePrice}
              </span>
            )}
          </div>

          <Link 
            to={`/product/${product.slug}`}
            className="w-full py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-green-500/30 active:scale-95 text-center text-sm"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;