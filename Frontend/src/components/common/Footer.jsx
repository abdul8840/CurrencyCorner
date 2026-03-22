import { Link } from 'react-router-dom';
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer>
      <div>
        <div>
          <div>
            <h2>Currency Corner</h2>
            <p>Your trusted destination for collectible currencies, coins, and numismatic treasures from around the world.</p>
          </div>
          <div>
            <h3>Quick Links</h3>
            <Link to="/">Home</Link>
            <Link to="/shop">Shop</Link>
            <Link to="/about">About Us</Link>
            <Link to="/contact">Contact</Link>
          </div>
          <div>
            <h3>My Account</h3>
            <Link to="/profile">Profile</Link>
            <Link to="/orders">My Orders</Link>
            <Link to="/addresses">Addresses</Link>
            <Link to="/cart">Cart</Link>
          </div>
          <div>
            <h3>Contact Us</h3>
            <p><FiMapPin /> 123 Collector Street, Mumbai, India</p>
            <p><FiPhone /> +91-9876543210</p>
            <p><FiMail /> info@currencycorner.com</p>
          </div>
        </div>
        <div>
          <p>&copy; {new Date().getFullYear()} Currency Corner. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;