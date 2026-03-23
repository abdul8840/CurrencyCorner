import { Link, useLocation } from 'react-router-dom';
import { FiHome, FiPackage, FiGrid, FiShoppingBag, FiTag, FiUsers, FiMail, FiX } from 'react-icons/fi';

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();

  const menuItems = [
    { path: '/', icon: <FiHome />, label: 'Dashboard' },
    { path: '/products', icon: <FiPackage />, label: 'Products' },
    { path: '/categories', icon: <FiGrid />, label: 'Categories' },
    { path: '/orders', icon: <FiShoppingBag />, label: 'Orders' },
    { path: '/coupons', icon: <FiTag />, label: 'Coupons' },
    { path: '/users', icon: <FiUsers />, label: 'Users' },
    { path: '/contacts', icon: <FiMail />, label: 'Contacts' }
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {isOpen && <div onClick={onClose}></div>}
      <aside>
        <div>
          <h1>Currency Corner</h1>
          <p>Admin Panel</p>
          <button onClick={onClose}><FiX /></button>
        </div>
        <nav>
          {menuItems.map((item) => (
            <Link key={item.path} to={item.path} onClick={onClose}>
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;