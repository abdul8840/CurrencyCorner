import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FiUser, FiPackage, FiMapPin } from 'react-icons/fi';

const ProfileSidebar = () => {
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);

  const links = [
    { path: '/profile', icon: <FiUser />, label: 'Profile' },
    { path: '/orders', icon: <FiPackage />, label: 'My Orders' },
    { path: '/addresses', icon: <FiMapPin />, label: 'Addresses' }
  ];

  return (
    <div>
      <div>
        {user?.avatar?.url ? (
          <img src={user.avatar.url} alt={user.name} />
        ) : (
          <div><FiUser /></div>
        )}
        <h3>{user?.name}</h3>
        <p>{user?.email}</p>
      </div>
      <nav>
        {links.map((link) => (
          <Link key={link.path} to={link.path}>
            {link.icon} {link.label}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default ProfileSidebar;