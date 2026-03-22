import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addAddress } from '../../features/address/addressSlice';
import { INDIAN_STATES, ADDRESS_LABELS } from '../../utils/constants';
import toast from 'react-hot-toast';

const AddressForm = ({ onSuccess, onCancel, initialData }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    fullName: initialData?.fullName || '',
    phone: initialData?.phone || '',
    addressLine1: initialData?.addressLine1 || '',
    addressLine2: initialData?.addressLine2 || '',
    city: initialData?.city || '',
    state: initialData?.state || '',
    pincode: initialData?.pincode || '',
    country: initialData?.country || 'India',
    label: initialData?.label || 'Home',
    isDefault: initialData?.isDefault || false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addAddress(formData))
      .unwrap()
      .then((data) => {
        toast.success('Address added successfully');
        if (onSuccess) onSuccess(data.address);
      })
      .catch((err) => toast.error(err));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <div>
          <label>Full Name</label>
          <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required />
        </div>
        <div>
          <label>Phone</label>
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
        </div>
      </div>
      <div>
        <label>Address Line 1</label>
        <input type="text" name="addressLine1" value={formData.addressLine1} onChange={handleChange} required />
      </div>
      <div>
        <label>Address Line 2</label>
        <input type="text" name="addressLine2" value={formData.addressLine2} onChange={handleChange} />
      </div>
      <div>
        <div>
          <label>City</label>
          <input type="text" name="city" value={formData.city} onChange={handleChange} required />
        </div>
        <div>
          <label>State</label>
          <select name="state" value={formData.state} onChange={handleChange} required>
            <option value="">Select State</option>
            {INDIAN_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label>Pincode</label>
          <input type="text" name="pincode" value={formData.pincode} onChange={handleChange} required />
        </div>
      </div>
      <div>
        <div>
          <label>Label</label>
          <select name="label" value={formData.label} onChange={handleChange}>
            {ADDRESS_LABELS.map((l) => <option key={l} value={l}>{l}</option>)}
          </select>
        </div>
        <label>
          <input type="checkbox" name="isDefault" checked={formData.isDefault} onChange={handleChange} />
          Set as default address
        </label>
      </div>
      <div>
        <button type="submit">Save Address</button>
        {onCancel && <button type="button" onClick={onCancel}>Cancel</button>}
      </div>
    </form>
  );
};

export default AddressForm;