import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAddresses, updateAddress } from '../features/address/addressSlice';
import AddressCard from '../components/profile/AddressCard';
import AddressForm from '../components/checkout/AddressForm';
import ProfileSidebar from '../components/profile/ProfileSidebar';
import SEO from '../components/common/SEO';
import { FiPlus } from 'react-icons/fi';
import toast from 'react-hot-toast';

const AddressesPage = () => {
  const dispatch = useDispatch();
  const { addresses, loading } = useSelector((state) => state.address);
  const [showForm, setShowForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);

  useEffect(() => {
    dispatch(fetchAddresses());
  }, [dispatch]);

  const handleEdit = (address) => {
    setEditingAddress(address);
    setShowForm(true);
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setEditingAddress(null);
    dispatch(fetchAddresses());
  };

  return (
    <div>
      <SEO title="My Addresses" />
      <div>
        <ProfileSidebar />
        <div>
          <div>
            <h1>My Addresses</h1>
            <button onClick={() => { setShowForm(!showForm); setEditingAddress(null); }}>
              <FiPlus /> Add New Address
            </button>
          </div>

          {showForm && (
            <AddressForm
              initialData={editingAddress}
              onSuccess={handleFormSuccess}
              onCancel={() => { setShowForm(false); setEditingAddress(null); }}
            />
          )}

          <div>
            {addresses.map((address) => (
              <AddressCard key={address._id} address={address} onEdit={handleEdit} />
            ))}
          </div>

          {addresses.length === 0 && !showForm && (
            <p>No addresses found. Add your first address.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddressesPage;