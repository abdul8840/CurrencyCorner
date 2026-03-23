import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createCoupon, clearSuccess, clearError } from '../features/coupons/adminCouponSlice';
import CouponForm from '../components/coupons/CouponForm';
import toast from 'react-hot-toast';

const AddCouponPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, success, error } = useSelector((state) => state.adminCoupon);

  useEffect(() => {
    if (success) { toast.success('Coupon created'); dispatch(clearSuccess()); navigate('/coupons'); }
    if (error) { toast.error(error); dispatch(clearError()); }
  }, [success, error, dispatch, navigate]);

  const handleSubmit = (data) => { dispatch(createCoupon(data)); };

  return (
    <div>
      <h1>Add New Coupon</h1>
      <CouponForm onSubmit={handleSubmit} loading={loading} />
    </div>
  );
};

export default AddCouponPage;