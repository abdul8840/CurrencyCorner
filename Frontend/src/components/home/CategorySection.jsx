import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCategories } from '../../features/category/categorySlice';

const CategorySection = () => {
  const dispatch = useDispatch();
  const { categories, loading } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  if (loading) return <div><p>Loading categories...</p></div>;

  return (
    <section>
      <div>
        <h2>Shop by Category</h2>
        <p>Browse our diverse collection of currencies and coins</p>
        <div>
          {categories.map((category) => (
            <Link key={category._id} to={`/category/${category.slug}`}>
              {category.image?.url && <img src={category.image.url} alt={category.name} />}
              <h3>{category.name}</h3>
              <p>{category.productCount} items</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;