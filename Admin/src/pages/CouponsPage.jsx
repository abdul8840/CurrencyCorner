import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { fetchCoupons, deleteCoupon } from '../features/coupons/adminCouponSlice';
import ConfirmModal from '../components/common/ConfirmModal';
import Loader from '../components/common/Loader';
import { formatCurrency, formatDate } from '../utils/helpers';
import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';
import toast from 'react-hot-toast';

const CouponsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { coupons, loading } = useSelector((state) => state.adminCoupon);
  const [deleteModal, setDeleteModal] = useState({ open: false, id: null });

  useEffect(() => {
    dispatch(fetchCoupons());
  }, [dispatch]);

  const handleDelete = () => {
    dispatch(deleteCoupon(deleteModal.id))
      .unwrap()
      .then(() => toast.success('Coupon deleted'))
      .catch((err) => toast.error(err));
    setDeleteModal({ open: false, id: null });
  };

  if (loading) return <Loader />;

  return (
    <div>
      <div>
        <h1>Coupons ({coupons.length})</h1>
        <Link to="/coupons/add"><FiPlus /> Add Coupon</Link>
      </div>

      <div>
        <table>
          <thead>
            <tr>
              <th>Code</th>
              <th>Type</th>
              <th>Value</th>
              <th>Min Order</th>
              <th>Used</th>
              <th>Validity</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {coupons.map((coupon) => (
              <tr key={coupon._id}>
                <td>{coupon.code}</td>
                <td>{coupon.type === 'percentage' ? 'Percentage' : 'Fixed'}</td>
                <td>{coupon.type === 'percentage' ? `${coupon.value}%` : formatCurrency(coupon.value)}</td>
                <td>{coupon.minOrderAmount ? formatCurrency(coupon.minOrderAmount) : '-'}</td>
                <td>{coupon.usedCount}{coupon.usageLimit ? `/${coupon.usageLimit}` : ''}</td>
                <td>
                  <p>{formatDate(coupon.startDate)}</p>
                  <p>{formatDate(coupon.endDate)}</p>
                </td>
                <td>
                  <span>{coupon.isActive ? 'Active' : 'Inactive'}</span>
                </td>
                <td>
                  <button onClick={() => navigate(`/coupons/edit/${coupon._id}`)}><FiEdit2 /></button>
                  <button onClick={() => setDeleteModal({ open: true, id: coupon._id })}><FiTrash2 /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ConfirmModal
        isOpen={deleteModal.open}
        title="Delete Coupon"
        message="Are you sure you want to delete this coupon?"
        onConfirm={handleDelete}
        onCancel={() => setDeleteModal({ open: false, id: null })}
      />
    </div>
  );
};

export default CouponsPage;