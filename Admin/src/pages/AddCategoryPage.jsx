import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createCategory, clearSuccess, clearError } from '../features/categories/adminCategorySlice';
import CategoryForm from '../components/categories/CategoryForm';
import toast from 'react-hot-toast';

const AddCategoryPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, success, error } = useSelector((state) => state.adminCategory);

  useEffect(() => {
    if (success) { toast.success('Category created'); dispatch(clearSuccess()); navigate('/categories'); }
    if (error) { toast.error(error); dispatch(clearError()); }
  }, [success, error, dispatch, navigate]);

  const handleSubmit = (formData) => { dispatch(createCategory(formData)); };

  return (
    <div>
      <h1>Add New Category</h1>
      <CategoryForm onSubmit={handleSubmit} loading={loading} />
    </div>
  );
};

export default AddCategoryPage;