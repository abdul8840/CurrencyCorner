import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCategories } from '../../features/category/categorySlice';
import { SORT_OPTIONS, STOCK_OPTIONS, PRODUCT_CONDITIONS } from '../../utils/constants';
import { FiFilter, FiX } from 'react-icons/fi';

const ProductFilters = ({ filters, onFilterChange, showCategoryFilter = true }) => {
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const { categories } = useSelector((state) => state.category);
  const dispatch = useDispatch();

  useEffect(() => {
    if (categories.length === 0) {
      dispatch(fetchCategories());
    }
  }, [dispatch, categories.length]);

  const handleChange = (key, value) => {
    onFilterChange({ ...filters, [key]: value, page: 1 });
  };

  const handleClearFilters = () => {
    onFilterChange({
      keyword: '',
      category: '',
      stockStatus: '',
      condition: '',
      sort: 'new-to-old',
      minPrice: '',
      maxPrice: '',
      page: 1
    });
  };

  const hasActiveFilters = filters.category || filters.stockStatus || filters.condition || filters.minPrice || filters.maxPrice || filters.keyword;

  return (
    <div>
      <div>
        <button onClick={() => setShowMobileFilters(!showMobileFilters)}>
          <FiFilter /> Filters
        </button>
        <select value={filters.sort || 'new-to-old'} onChange={(e) => handleChange('sort', e.target.value)}>
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>

      <div>
        <div>
          <h3>Filters</h3>
          {hasActiveFilters && (
            <button onClick={handleClearFilters}><FiX /> Clear All</button>
          )}
        </div>

        <div>
          <input
            type="text"
            placeholder="Search..."
            value={filters.keyword || ''}
            onChange={(e) => handleChange('keyword', e.target.value)}
          />
        </div>

        {showCategoryFilter && (
          <div>
            <h4>Category</h4>
            <select value={filters.category || ''} onChange={(e) => handleChange('category', e.target.value)}>
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>{cat.name} ({cat.productCount})</option>
              ))}
            </select>
          </div>
        )}

        <div>
          <h4>Availability</h4>
          {STOCK_OPTIONS.map((opt) => (
            <label key={opt.value}>
              <input
                type="radio"
                name="stockStatus"
                value={opt.value}
                checked={filters.stockStatus === opt.value}
                onChange={(e) => handleChange('stockStatus', e.target.value)}
              />
              {opt.label}
            </label>
          ))}
        </div>

        <div>
          <h4>Condition</h4>
          <select value={filters.condition || ''} onChange={(e) => handleChange('condition', e.target.value)}>
            <option value="">All Conditions</option>
            {PRODUCT_CONDITIONS.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div>
          <h4>Price Range</h4>
          <div>
            <input
              type="number"
              placeholder="Min"
              value={filters.minPrice || ''}
              onChange={(e) => handleChange('minPrice', e.target.value)}
            />
            <span>to</span>
            <input
              type="number"
              placeholder="Max"
              value={filters.maxPrice || ''}
              onChange={(e) => handleChange('maxPrice', e.target.value)}
            />
          </div>
        </div>

        <div>
          <h4>Sort By</h4>
          <select value={filters.sort || 'new-to-old'} onChange={(e) => handleChange('sort', e.target.value)}>
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default ProductFilters;