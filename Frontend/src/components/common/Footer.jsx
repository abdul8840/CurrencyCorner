import { Link } from 'react-router-dom';
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-secondary text-text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 py-12 sm:py-16">
          {/* Brand Section */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h2 className="text-2xl sm:text-3xl font-bold text-primary-light mb-4 tracking-tight">
              AR Hobby
            </h2>
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed max-w-xs">
              Your trusted destination for collectible currencies, coins, and numismatic
              treasures from around the world.
            </p>
            {/* Social icons placeholder */}
            <div className="flex gap-3 mt-6">
              {['facebook', 'twitter', 'instagram'].map((social) => (
                <div
                  key={social}
                  className="w-10 h-10 rounded-full bg-secondary-light border border-gray-700 
                             flex items-center justify-center cursor-pointer 
                             hover:bg-primary hover:border-primary transition-all duration-300"
                >
                  <span className="text-xs uppercase text-gray-400 hover:text-white">
                    {social[0].toUpperCase()}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-accent mb-5 relative inline-block">
              Quick Links
              <span className="absolute -bottom-1.5 left-0 w-10 h-0.5 bg-primary rounded-full"></span>
            </h3>
            <div className="flex flex-col gap-3">
              {[
                { to: '/', label: 'Home' },
                { to: '/shop', label: 'Shop' },
                { to: '/about', label: 'About Us' },
                { to: '/contact', label: 'Contact' },
              ].map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-gray-400 hover:text-primary-light text-sm sm:text-base 
                             cursor-pointer transition-colors duration-300 hover:translate-x-1 
                             transform inline-flex items-center gap-1 w-fit"
                >
                  <span className="opacity-0 hover:opacity-100 transition-opacity">›</span>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* My Account */}
          <div>
            <h3 className="text-lg font-semibold text-accent mb-5 relative inline-block">
              My Account
              <span className="absolute -bottom-1.5 left-0 w-10 h-0.5 bg-primary rounded-full"></span>
            </h3>
            <div className="flex flex-col gap-3">
              {[
                { to: '/profile', label: 'Profile' },
                { to: '/orders', label: 'My Orders' },
                { to: '/addresses', label: 'Addresses' },
                { to: '/cart', label: 'Cart' },
              ].map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-gray-400 hover:text-primary-light text-sm sm:text-base 
                             cursor-pointer transition-colors duration-300 hover:translate-x-1 
                             transform inline-flex items-center gap-1 w-fit"
                >
                  <span className="opacity-0 hover:opacity-100 transition-opacity">›</span>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="text-lg font-semibold text-accent mb-5 relative inline-block">
              Contact Us
              <span className="absolute -bottom-1.5 left-0 w-10 h-0.5 bg-primary rounded-full"></span>
            </h3>
            <div className="flex flex-col gap-4">
              <p className="flex items-start gap-3 text-gray-400 text-sm sm:text-base">
                <FiMapPin className="text-primary-light text-lg mt-0.5 flex-shrink-0" />
                <span>123 Collector Street, Mumbai, India</span>
              </p>
              <p className="flex items-center gap-3 text-gray-400 text-sm sm:text-base">
                <FiPhone className="text-primary-light text-lg flex-shrink-0" />
                <span>+91-9876543210</span>
              </p>
              <p className="flex items-center gap-3 text-gray-400 text-sm sm:text-base">
                <FiMail className="text-primary-light text-lg flex-shrink-0" />
                <span>info@currencycorner.com</span>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700/60 py-6">
          <p className="text-center text-gray-500 text-xs sm:text-sm">
            &copy; {new Date().getFullYear()} AR Hobby. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;