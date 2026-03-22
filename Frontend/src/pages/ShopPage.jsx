import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../features/product/productSlice';
import ProductGrid from '../components/product/ProductGrid';
import ProductFilters from '../components/product/ProductFilters';
import Pagination from '../components/common/Pagination';
import Loader from '../components/common/Loader';
import SEO from '../components/common/SEO';
import { buildQueryString } from '../utils/helpers';

const ShopPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { products, totalProducts, page, pages, loading } = useSelector((state) => state.product);

  const [filters, setFilters] = useState({
    keyword: searchParams.get('keyword') || '',
    category: searchParams.get('category') || '',
    stockStatus: searchParams.get('stockStatus') || '',
    condition: searchParams.get('condition') || '',
    sort: searchParams.get('sort') || 'new-to-old',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    page: Number(searchParams.get('page')) || 1
  });

  useEffect(() => {
    const queryParams = buildQueryString(filters);
    setSearchParams(queryParams);
    dispatch(fetchProducts(queryParams));
  }, [filters, dispatch, setSearchParams]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handlePageChange = (newPage) => {
    setFilters((prev) => ({ ...prev, page: newPage }));
  };

  return (
    <div>
      <SEO title="Shop" description="Browse our collection of collectible currencies and coins" />
      <div>
        <h1>Shop All Products</h1>
        <p>{totalProducts} products found</p>
      </div>
      <div>
        <ProductFilters filters={filters} onFilterChange={handleFilterChange} />
        <div>
          {loading ? <Loader /> : <ProductGrid products={products} />}
          <Pagination page={page} pages={pages} onPageChange={handlePageChange} />
        </div>
      </div>
    </div>
  );
};

export default ShopPage;