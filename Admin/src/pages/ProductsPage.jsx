import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { fetchProducts, deleteProduct } from '../features/products/adminProductSlice';
import Pagination from '../components/common/Pagination';
import ConfirmModal from '../components/common/ConfirmModal';
import Loader from '../components/common/Loader';
import { formatCurrency } from '../utils/helpers';
import { FiPlus, FiEdit2, FiTrash2, FiSearch } from 'react-icons/fi';
import toast from 'react-hot-toast';

const ProductsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, totalProducts, page, pages, loading } = useSelector((state) => state.adminProduct);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteModal, setDeleteModal] = useState({ open: false, id: null });

  useEffect(() => {
    const params = { page: currentPage };
    if (search) params.keyword = search;
    dispatch(fetchProducts(params));
  }, [dispatch, currentPage, search]);

  const handleDelete = () => {
    dispatch(deleteProduct(deleteModal.id))
      .unwrap()
      .then(() => toast.success('Product deleted'))
      .catch((err) => toast.error(err));
    setDeleteModal({ open: false, id: null });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
  };

  if (loading) return <Loader />;

  return (
    <div>
      <div>
        <h1>Products ({totalProducts})</h1>
        <Link to="/products/add"><FiPlus /> Add Product</Link>
      </div>

      <form onSubmit={handleSearch}>
        <FiSearch />
        <input type="text" placeholder="Search products..." value={search}
          onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }} />
      </form>

      <div>
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Status</th>
              <th>Featured</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>
                  <img src={product.images?.[0]?.url || '/placeholder.png'} alt={product.name} />
                </td>
                <td>{product.name}</td>
                <td>{product.category?.name || 'N/A'}</td>
                <td>{formatCurrency(product.price)}</td>
                <td>{product.stock}</td>
                <td><span>{product.stockStatus}</span></td>
                <td>{product.isFeatured ? 'Yes' : 'No'}</td>
                <td>
                  <button onClick={() => navigate(`/products/edit/${product._id}`)}><FiEdit2 /></button>
                  <button onClick={() => setDeleteModal({ open: true, id: product._id })}><FiTrash2 /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination page={page} pages={pages} onPageChange={setCurrentPage} />

      <ConfirmModal
        isOpen={deleteModal.open}
        title="Delete Product"
        message="Are you sure you want to delete this product? This action cannot be undone."
        onConfirm={handleDelete}
        onCancel={() => setDeleteModal({ open: false, id: null })}
      />
    </div>
  );
};

export default ProductsPage;