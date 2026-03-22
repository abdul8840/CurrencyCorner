import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsByCategory } from '../features/product/productSlice';
import ProductGrid from '../components/product/ProductGrid';
import ProductFilters from '../components/product/ProductFilters';
import Pagination from '../components/common/Pagination';
import Loader from '../components/common/Loader';
import SEO from '../components/common/SEO';
import { buildQueryString } from '../utils/helpers';

const CategoryPage = () => {
  const { slug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { categoryProducts, category, totalProducts, page, pages, loading } = useSelector((state) => state.product);

  const [filters, setFilters] = useState({
    keyword: searchParams.get('keyword') || '',
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
    dispatch(fetchProductsByCategory({ slug, params: queryParams }));
  }, [filters, slug, dispatch, setSearchParams]);

  useEffect(() => {
    setFilters({
      keyword: '',
      stockStatus: '',
      condition: '',
      sort: 'new-to-old',
      minPrice: '',
      maxPrice: '',
      page: 1
    });
  }, [slug]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handlePageChange = (newPage) => {
    setFilters((prev) => ({ ...prev, page: newPage }));
  };

  return (
    <div>
      <SEO
        title={category?.name || 'Category'}
        description={category?.description || `Browse ${category?.name} collection`}
      />
      <div>
        {category?.image?.url && <img src={category.image.url} alt={category?.name} />}
        <h1>{category?.name}</h1>
        {category?.description && <p>{category.description}</p>}
        <p>{totalProducts} products found</p>
      </div>
      <div>
        <ProductFilters filters={filters} onFilterChange={handleFilterChange} showCategoryFilter={false} />
        <div>
          {loading ? <Loader /> : <ProductGrid products={categoryProducts} />}
          <Pagination page={page} pages={pages} onPageChange={handlePageChange} />
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;