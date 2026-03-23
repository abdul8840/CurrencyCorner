import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { fetchCategories, deleteCategory } from '../features/categories/adminCategorySlice';
import ConfirmModal from '../components/common/ConfirmModal';
import Loader from '../components/common/Loader';
import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';
import toast from 'react-hot-toast';

const CategoriesPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categories, loading } = useSelector((state) => state.adminCategory);
  const [deleteModal, setDeleteModal] = useState({ open: false, id: null });

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleDelete = () => {
    dispatch(deleteCategory(deleteModal.id))
      .unwrap()
      .then(() => toast.success('Category deleted'))
      .catch((err) => toast.error(err));
    setDeleteModal({ open: false, id: null });
  };

  if (loading) return <Loader />;

  return (
    <div>
      <div>
        <h1>Categories ({categories.length})</h1>
        <Link to="/categories/add"><FiPlus /> Add Category</Link>
      </div>

      <div>
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Slug</th>
              <th>Products</th>
              <th>Order</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => (
              <tr key={cat._id}>
                <td>
                  {cat.image?.url ? <img src={cat.image.url} alt={cat.name} /> : <span>No image</span>}
                </td>
                <td>{cat.name}</td>
                <td>{cat.slug}</td>
                <td>{cat.productCount || 0}</td>
                <td>{cat.order}</td>
                <td><span>{cat.isActive ? 'Active' : 'Inactive'}</span></td>
                <td>
                  <button onClick={() => navigate(`/categories/edit/${cat._id}`)}><FiEdit2 /></button>
                  <button onClick={() => setDeleteModal({ open: true, id: cat._id })}><FiTrash2 /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ConfirmModal
        isOpen={deleteModal.open}
        title="Delete Category"
        message="Are you sure? Categories with products cannot be deleted."
        onConfirm={handleDelete}
        onCancel={() => setDeleteModal({ open: false, id: null })}
      />
    </div>
  );
};

export default CategoriesPage;