import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductById, updateProduct, clearProduct, clearSuccess, clearError } from '../features/products/adminProductSlice';
import ProductForm from '../components/products/ProductForm';
import Loader from '../components/common/Loader';
import toast from 'react-hot-toast';

const EditProductPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { product, loading, success, error } = useSelector((state) => state.adminProduct);

  useEffect(() => {
    dispatch(fetchProductById(id));
    return () => { dispatch(clearProduct()); };
  }, [id, dispatch]);

  useEffect(() => {
    if (success) {
      toast.success('Product updated successfully');
      dispatch(clearSuccess());
      navigate('/products');
    }
    if (error) { toast.error(error); dispatch(clearError()); }
  }, [success, error, dispatch, navigate]);

  const handleSubmit = (formData) => {
    dispatch(updateProduct({ id, formData }));
  };

  if (loading && !product) return <Loader />;

  return (
    <div>
      <h1>Edit Product</h1>
      {product && <ProductForm initialData={product} onSubmit={handleSubmit} loading={loading} />}
    </div>
  );
};

export default EditProductPage;