import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategoryById, updateCategory, clearCategory, clearSuccess, clearError } from '../features/categories/adminCategorySlice';
import CategoryForm from '../components/categories/CategoryForm';
import Loader from '../components/common/Loader';
import toast from 'react-hot-toast';

const EditCategoryPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { category, loading, success, error } = useSelector((state) => state.adminCategory);

  useEffect(() => {
    dispatch(fetchCategoryById(id));
    return () => { dispatch(clearCategory()); };
  }, [id, dispatch]);

  useEffect(() => {
    if (success) { toast.success('Category updated'); dispatch(clearSuccess()); navigate('/categories'); }
    if (error) { toast.error(error); dispatch(clearError()); }
  }, [success, error, dispatch, navigate]);

  const handleSubmit = (formData) => { dispatch(updateCategory({ id, formData })); };

  if (loading && !category) return <Loader />;

  return (
    <div>
      <h1>Edit Category</h1>
      {category && <CategoryForm initialData={category} onSubmit={handleSubmit} loading={loading} />}
    </div>
  );
};

export default EditCategoryPage;