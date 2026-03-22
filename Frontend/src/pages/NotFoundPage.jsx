import { Link } from 'react-router-dom';
import SEO from '../components/common/SEO';

const NotFoundPage = () => {
  return (
    <div>
      <SEO title="Page Not Found" />
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>The page you are looking for does not exist or has been moved.</p>
      <div>
        <Link to="/">Go Home</Link>
        <Link to="/shop">Browse Shop</Link>
      </div>
    </div>
  );
};

export default NotFoundPage;