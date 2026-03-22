import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { applyCoupon, removeCoupon, clearCouponError } from '../../features/coupon/couponSlice';
import { formatCurrency } from '../../utils/helpers';
import { FiTag, FiX } from 'react-icons/fi';
import toast from 'react-hot-toast';

const CouponInput = ({ orderAmount }) => {
  const [code, setCode] = useState('');
  const dispatch = useDispatch();
  const { appliedCoupon, loading, error } = useSelector((state) => state.coupon);

  const handleApply = (e) => {
    e.preventDefault();
    if (!code.trim()) {
      toast.error('Please enter a coupon code');
      return;
    }
    dispatch(applyCoupon({ code: code.trim(), orderAmount }))
      .unwrap()
      .then((data) => toast.success(data.message))
      .catch((err) => toast.error(err));
  };

  const handleRemove = () => {
    dispatch(removeCoupon());
    setCode('');
    toast.success('Coupon removed');
  };

  return (
    <div>
      <h3><FiTag /> Coupon Code</h3>
      {appliedCoupon ? (
        <div>
          <div>
            <span>{appliedCoupon.code}</span>
            <span>-{formatCurrency(appliedCoupon.discount)}</span>
          </div>
          <button onClick={handleRemove}><FiX /> Remove</button>
        </div>
      ) : (
        <form onSubmit={handleApply}>
          <input
            type="text"
            placeholder="Enter coupon code"
            value={code}
            onChange={(e) => {
              setCode(e.target.value.toUpperCase());
              if (error) dispatch(clearCouponError());
            }}
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Applying...' : 'Apply'}
          </button>
        </form>
      )}
      {error && <p>{error}</p>}
    </div>
  );
};

export default CouponInput;