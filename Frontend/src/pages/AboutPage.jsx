import { Link } from 'react-router-dom';
import SEO from '../components/common/SEO';

const AboutPage = () => {
  return (
    <div>
      <SEO title="About Us" description="Learn about Currency Corner and our passion for numismatics" />
      <h1>About Currency Corner</h1>
      <div>
        <section>
          <h2>Our Story</h2>
          <p>
            Currency Corner was born from a deep passion for numismatics and the rich history embedded
            in every coin and banknote. We are a dedicated hobby marketplace that connects collectors
            with rare and fascinating currencies from India and around the world.
          </p>
        </section>
        <section>
          <h2>What We Offer</h2>
          <div>
            <div>
              <h3>World Currencies</h3>
              <p>Banknotes from countries across the globe</p>
            </div>
            <div>
              <h3>World Coins</h3>
              <p>Coins from various nations and eras</p>
            </div>
            <div>
              <h3>Indian Currencies</h3>
              <p>Historical and modern Indian banknotes</p>
            </div>
            <div>
              <h3>Indian Coins</h3>
              <p>Ancient to modern Indian coins</p>
            </div>
          </div>
        </section>
        <section>
          <h2>Our Promise</h2>
          <p>Every item is carefully verified for authenticity. We provide detailed descriptions, high-quality images, and honest condition grading.</p>
          <Link to="/shop">Start Exploring</Link>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;