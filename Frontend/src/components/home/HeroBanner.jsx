import { Link } from 'react-router-dom';

const HeroBanner = () => {
  return (
    <section>
      <div>
        <h1>Discover Rare & Collectible Currencies</h1>
        <p>Explore our curated collection of world currencies, coins, and numismatic treasures from across the globe.</p>
        <div>
          <Link to="/shop">Shop Now</Link>
          <Link to="/about">Learn More</Link>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;