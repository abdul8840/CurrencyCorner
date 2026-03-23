import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createProduct, clearSuccess, clearError } from '../features/products/adminProductSlice';
import ProductForm from '../components/products/ProductForm';
import toast from 'react-hot-toast';

const AddProductPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, success, error } = useSelector((state) => state.adminProduct);

  useEffect(() => {
    if (success) {
      toast.success('Product created successfully');
      dispatch(clearSuccess());
      navigate('/products');
    }
    if (error) { toast.error(error); dispatch(clearError()); }
  }, [success, error, dispatch, navigate]);

  const handleSubmit = (formData) => {
    dispatch(createProduct(formData));
  };

  return (
    <div>
      <h1>Add New Product</h1>
      <ProductForm onSubmit={handleSubmit} loading={loading} />
    </div>
  );
};

export default AddProductPage;