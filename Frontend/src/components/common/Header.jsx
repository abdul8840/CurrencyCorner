import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../features/auth/authSlice';
import { FiShoppingCart, FiUser, FiMenu, FiX, FiSearch, FiLogOut, FiPackage, FiMapPin } from 'react-icons/fi';
import toast from 'react-hot-toast';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [profileDropdown, setProfileDropdown] = useState(false);
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?keyword=${searchQuery}`);
      setSearchQuery('');
      setMenuOpen(false);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    setProfileDropdown(false);
    toast.success('Logged out successfully');
    navigate('/');
  };

  const cartItemCount = cart?.totalItems || 0;

  return (
    <header>
      <div>
        <div>
          <Link to="/">
            <h1>Currency Corner</h1>
          </Link>

          <form onSubmit={handleSearch}>
            <FiSearch />
            <input
              type="text"
              placeholder="Search collectibles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>

          <nav>
            <Link to="/">Home</Link>
            <Link to="/shop">Shop</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
          </nav>

          <div>
            <Link to="/cart">
              <FiShoppingCart />
              {cartItemCount > 0 && <span>{cartItemCount}</span>}
            </Link>

            {isAuthenticated ? (
              <div>
                <button onClick={() => setProfileDropdown(!profileDropdown)}>
                  <FiUser />
                  <span>{user?.name?.split(' ')[0]}</span>
                </button>
                {profileDropdown && (
                  <div>
                    <Link to="/profile" onClick={() => setProfileDropdown(false)}>
                      <FiUser /> Profile
                    </Link>
                    <Link to="/orders" onClick={() => setProfileDropdown(false)}>
                      <FiPackage /> Orders
                    </Link>
                    <Link to="/addresses" onClick={() => setProfileDropdown(false)}>
                      <FiMapPin /> Addresses
                    </Link>
                    <button onClick={handleLogout}>
                      <FiLogOut /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
              </div>
            )}

            <button onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div>
            <form onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
            <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
            <Link to="/shop" onClick={() => setMenuOpen(false)}>Shop</Link>
            <Link to="/about" onClick={() => setMenuOpen(false)}>About</Link>
            <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
            {isAuthenticated && (
              <>
                <Link to="/profile" onClick={() => setMenuOpen(false)}>Profile</Link>
                <Link to="/orders" onClick={() => setMenuOpen(false)}>Orders</Link>
                <Link to="/addresses" onClick={() => setMenuOpen(false)}>Addresses</Link>
                <button onClick={handleLogout}>Logout</button>
              </>
            )}
            {!isAuthenticated && (
              <>
                <Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
                <Link to="/register" onClick={() => setMenuOpen(false)}>Register</Link>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;