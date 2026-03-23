import { useState, useEffect } from 'react';

const CouponForm = ({ initialData, onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    code: '', description: '', type: 'percentage', value: '',
    minOrderAmount: '', maxDiscount: '', usageLimit: '',
    perUserLimit: 1, startDate: '', endDate: '', isActive: true
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        code: initialData.code || '',
        description: initialData.description || '',
        type: initialData.type || 'percentage',
        value: initialData.value || '',
        minOrderAmount: initialData.minOrderAmount || '',
        maxDiscount: initialData.maxDiscount || '',
        usageLimit: initialData.usageLimit || '',
        perUserLimit: initialData.perUserLimit || 1,
        startDate: initialData.startDate ? new Date(initialData.startDate).toISOString().split('T')[0] : '',
        endDate: initialData.endDate ? new Date(initialData.endDate).toISOString().split('T')[0] : '',
        isActive: initialData.isActive !== undefined ? initialData.isActive : true
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const submitData = { ...formData };
    if (submitData.minOrderAmount === '') delete submitData.minOrderAmount;
    if (submitData.maxDiscount === '') delete submitData.maxDiscount;
    if (submitData.usageLimit === '') delete submitData.usageLimit;
    onSubmit(submitData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <div>
          <label>Coupon Code *</label>
          <input type="text" name="code" value={formData.code} onChange={handleChange} required
            style={{ textTransform: 'uppercase' }} />
        </div>
        <div>
          <label>Description</label>
          <input type="text" name="description" value={formData.description} onChange={handleChange} />
        </div>
      </div>
      <div>
        <div>
          <label>Discount Type *</label>
          <select name="type" value={formData.type} onChange={handleChange}>
            <option value="percentage">Percentage (%)</option>
            <option value="fixed">Fixed Amount (₹)</option>
          </select>
        </div>
        <div>
          <label>Value * {formData.type === 'percentage' ? '(%)' : '(₹)'}</label>
          <input type="number" name="value" value={formData.value} onChange={handleChange} required min="0" step="0.01" />
        </div>
      </div>
      <div>
        <div>
          <label>Min Order Amount (₹)</label>
          <input type="number" name="minOrderAmount" value={formData.minOrderAmount} onChange={handleChange} min="0" />
        </div>
        <div>
          <label>Max Discount (₹)</label>
          <input type="number" name="maxDiscount" value={formData.maxDiscount} onChange={handleChange} min="0" />
        </div>
      </div>
      <div>
        <div>
          <label>Usage Limit (total)</label>
          <input type="number" name="usageLimit" value={formData.usageLimit} onChange={handleChange} min="0" />
        </div>
        <div>
          <label>Per User Limit</label>
          <input type="number" name="perUserLimit" value={formData.perUserLimit} onChange={handleChange} min="1" />
        </div>
      </div>
      <div>
        <div>
          <label>Start Date *</label>
          <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} required />
        </div>
        <div>
          <label>End Date *</label>
          <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} required />
        </div>
      </div>
      <label>
        <input type="checkbox" name="isActive" checked={formData.isActive} onChange={handleChange} />
        Active
      </label>
      <button type="submit" disabled={loading}>
        {loading ? 'Saving...' : initialData ? 'Update Coupon' : 'Create Coupon'}
      </button>
    </form>
  );
};

export default CouponForm;