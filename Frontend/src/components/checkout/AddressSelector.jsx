import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAddresses } from '../../features/address/addressSlice';
import AddressForm from './AddressForm';
import { FiPlus } from 'react-icons/fi';

const AddressSelector = ({ selectedAddress, onSelectAddress }) => {
  const dispatch = useDispatch();
  const { addresses } = useSelector((state) => state.address);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    dispatch(fetchAddresses());
  }, [dispatch]);

  useEffect(() => {
    if (addresses.length > 0 && !selectedAddress) {
      const defaultAddress = addresses.find((a) => a.isDefault) || addresses[0];
      onSelectAddress(defaultAddress);
    }
  }, [addresses, selectedAddress, onSelectAddress]);

  const handleAddressAdded = (newAddress) => {
    setShowAddForm(false);
    onSelectAddress(newAddress);
  };

  return (
    <div>
      <div>
        <h3>Shipping Address</h3>
        <button onClick={() => setShowAddForm(!showAddForm)}>
          <FiPlus /> Add New
        </button>
      </div>

      {showAddForm && (
        <AddressForm onSuccess={handleAddressAdded} onCancel={() => setShowAddForm(false)} />
      )}

      <div>
        {addresses.map((address) => (
          <div key={address._id} onClick={() => onSelectAddress(address)}>
            <input
              type="radio"
              name="address"
              checked={selectedAddress?._id === address._id}
              onChange={() => onSelectAddress(address)}
            />
            <div>
              <p>{address.fullName} | {address.phone}</p>
              <p>{address.addressLine1}</p>
              {address.addressLine2 && <p>{address.addressLine2}</p>}
              <p>{address.city}, {address.state} - {address.pincode}</p>
              {address.isDefault && <span>Default</span>}
              <span>{address.label}</span>
            </div>
          </div>
        ))}
      </div>

      {addresses.length === 0 && !showAddForm && (
        <p>No addresses found. Please add a shipping address.</p>
      )}
    </div>
  );
};

export default AddressSelector;