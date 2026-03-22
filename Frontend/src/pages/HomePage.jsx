import SEO from '../components/common/SEO';
import HeroBanner from '../components/home/HeroBanner';
import CategorySection from '../components/home/CategorySection';
import FeaturedProducts from '../components/home/FeaturedProducts';
import LatestProducts from '../components/home/LatestProducts';
import WhyChooseUs from '../components/home/WhyChooseUs';

const HomePage = () => {
  return (
    <div>
      <SEO title="Home" description="Currency Corner - Your destination for collectible currencies and coins" />
      <HeroBanner />
      <CategorySection />
      <FeaturedProducts />
      <LatestProducts />
      <WhyChooseUs />
    </div>
  );
};

export default HomePage;