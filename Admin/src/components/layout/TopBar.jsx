import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { adminLogout } from '../../features/auth/adminAuthSlice';
import NotificationDropdown from './NotificationDropdown';
import { FiMenu, FiLogOut, FiUser } from 'react-icons/fi';
import toast from 'react-hot-toast';

const TopBar = ({ onMenuClick }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.adminAuth);

  const handleLogout = () => {
    dispatch(adminLogout());
    toast.success('Logged out');
    navigate('/login');
  };

  return (
    <header>
      <div>
        <button onClick={onMenuClick}><FiMenu /></button>
      </div>
      <div>
        <NotificationDropdown />
        <div>
          <FiUser />
          <span>{user?.name}</span>
        </div>
        <button onClick={handleLogout}><FiLogOut /></button>
      </div>
    </header>
  );
};

export default TopBar;