import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAddresses, updateAddress } from '../features/address/addressSlice';
import AddressCard from '../components/profile/AddressCard';
import ProfileSidebar from '../components/profile/ProfileSidebar';
import SEO from '../components/common/SEO';
import { INDIAN_STATES, ADDRESS_LABELS } from '../utils/constants';
import { FiPlus, FiX } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { addAddress } from '../features/address/addressSlice';

const AddressesPage = () => {
  const dispatch = useDispatch();
  const { addresses, loading } = useSelector((state) => state.address);
  const [showForm, setShowForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '', phone: '', addressLine1: '', addressLine2: '',
    city: '', state: '', pincode: '', country: 'India',
    label: 'Home', isDefault: false
  });

  useEffect(() => {
    dispatch(fetchAddresses());
  }, [dispatch]);

  const handleEdit = (address) => {
    setEditingAddress(address);
    setFormData({
      fullName: address.fullName || '',
      phone: address.phone || '',
      addressLine1: address.addressLine1 || '',
      addressLine2: address.addressLine2 || '',
      city: address.city || '',
      state: address.state || '',
      pincode: address.pincode || '',
      country: address.country || 'India',
      label: address.label || 'Home',
      isDefault: address.isDefault || false
    });
    setShowForm(true);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const resetForm = () => {
    setFormData({
      fullName: '', phone: '', addressLine1: '', addressLine2: '',
      city: '', state: '', pincode: '', country: 'India',
      label: 'Home', isDefault: false
    });
    setEditingAddress(null);
    setShowForm(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingAddress) {
      dispatch(updateAddress({ id: editingAddress._id, data: formData }))
        .unwrap()
        .then(() => { toast.success('Address updated'); resetForm(); dispatch(fetchAddresses()); })
        .catch((err) => toast.error(err));
    } else {
      dispatch(addAddress(formData))
        .unwrap()
        .then(() => { toast.success('Address added'); resetForm(); dispatch(fetchAddresses()); })
        .catch((err) => toast.error(err));
    }
  };

  return (
    <div>
      <SEO title="My Addresses" />
      <div>
        <ProfileSidebar />
        <div>
          <div>
            <h1>My Addresses</h1>
            <button onClick={() => { resetForm(); setShowForm(!showForm); }}>
              {showForm ? <FiX /> : <FiPlus />}
              {showForm ? ' Cancel' : ' Add New Address'}
            </button>
          </div>

          {showForm && (
            <form onSubmit={handleSubmit}>
              <h2>{editingAddress ? 'Edit Address' : 'Add New Address'}</h2>
              <div>
                <div>
                  <label>Full Name *</label>
                  <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required />
                </div>
                <div>
                  <label>Phone *</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
                </div>
              </div>
              <div>
                <label>Address Line 1 *</label>
                <input type="text" name="addressLine1" value={formData.addressLine1} onChange={handleChange} required />
              </div>
              <div>
                <label>Address Line 2</label>
                <input type="text" name="addressLine2" value={formData.addressLine2} onChange={handleChange} />
              </div>
              <div>
                <div>
                  <label>City *</label>
                  <input type="text" name="city" value={formData.city} onChange={handleChange} required />
                </div>
                <div>
                  <label>State *</label>
                  <select name="state" value={formData.state} onChange={handleChange} required>
                    <option value="">Select State</option>
                    {INDIAN_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label>Pincode *</label>
                  <input type="text" name="pincode" value={formData.pincode} onChange={handleChange} required />
                </div>
              </div>
              <div>
                <div>
                  <label>Label</label>
                  <select name="label" value={formData.label} onChange={handleChange}>
                    {ADDRESS_LABELS.map(l => <option key={l} value={l}>{l}</option>)}
                  </select>
                </div>
                <label>
                  <input type="checkbox" name="isDefault" checked={formData.isDefault} onChange={handleChange} />
                  Set as default
                </label>
              </div>
              <div>
                <button type="submit" disabled={loading}>
                  {loading ? 'Saving...' : editingAddress ? 'Update Address' : 'Save Address'}
                </button>
                <button type="button" onClick={resetForm}>Cancel</button>
              </div>
            </form>
          )}

          <div>
            {addresses.map((address) => (
              <AddressCard key={address._id} address={address} onEdit={handleEdit} />
            ))}
          </div>

          {addresses.length === 0 && !showForm && (
            <div>
              <p>No addresses found. Add your first address.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddressesPage;