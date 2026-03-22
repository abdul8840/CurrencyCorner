import { useDispatch } from 'react-redux';
import { deleteAddress, setDefaultAddress } from '../../features/address/addressSlice';
import { FiEdit2, FiTrash2, FiStar } from 'react-icons/fi';
import toast from 'react-hot-toast';

const AddressCard = ({ address, onEdit }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this address?')) {
      dispatch(deleteAddress(address._id))
        .unwrap()
        .then(() => toast.success('Address deleted'))
        .catch((err) => toast.error(err));
    }
  };

  const handleSetDefault = () => {
    dispatch(setDefaultAddress(address._id))
      .unwrap()
      .then(() => toast.success('Default address updated'))
      .catch((err) => toast.error(err));
  };

  return (
    <div>
      <div>
        <span>{address.label}</span>
        {address.isDefault && <span>Default</span>}
      </div>
      <div>
        <p>{address.fullName}</p>
        <p>{address.addressLine1}</p>
        {address.addressLine2 && <p>{address.addressLine2}</p>}
        <p>{address.city}, {address.state} - {address.pincode}</p>
        <p>Phone: {address.phone}</p>
      </div>
      <div>
        {!address.isDefault && (
          <button onClick={handleSetDefault}><FiStar /> Set Default</button>
        )}
        <button onClick={() => onEdit(address)}><FiEdit2 /> Edit</button>
        <button onClick={handleDelete}><FiTrash2 /> Delete</button>
      </div>
    </div>
  );
};

export default AddressCard;