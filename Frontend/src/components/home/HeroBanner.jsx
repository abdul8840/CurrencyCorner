import { Link } from 'react-router-dom';
import { FiArrowRight, FiInfo } from 'react-icons/fi';

const HeroBanner = () => {
  return (
    <section className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center overflow-hidden bg-bg-secondary">
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-72 sm:w-96 h-72 sm:h-96 bg-primary-200/30 rounded-full 
                      mix-blend-multiply filter blur-3xl animate-[pulse_8s_ease-in-out_infinite]"></div>
        <div className="absolute top-1/3 right-0 w-80 sm:w-[500px] h-80 sm:h-[500px] bg-primary-100/40 rounded-full 
                      mix-blend-multiply filter blur-3xl animate-[pulse_10s_ease-in-out_infinite_2s]"></div>
        <div className="absolute -bottom-20 left-1/3 w-96 h-96 bg-primary-300/20 rounded-full 
                      mix-blend-multiply filter blur-3xl animate-[pulse_9s_ease-in-out_infinite_4s]"></div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(circle, #16a34a 1px, transparent 1px)`,
          backgroundSize: '30px 30px',
        }}
      ></div>

      {/* Floating Decorative Elements */}
      <div className="absolute top-20 right-10 sm:right-20 w-4 h-4 bg-primary rounded-full opacity-20 
                    animate-bounce" style={{ animationDuration: '3s' }}></div>
      <div className="absolute top-40 left-10 sm:left-32 w-3 h-3 bg-primary-400 rounded-full opacity-30 
                    animate-bounce" style={{ animationDuration: '4s', animationDelay: '1s' }}></div>
      <div className="absolute bottom-32 right-1/4 w-5 h-5 bg-primary-300 rounded-full opacity-15 
                    animate-bounce" style={{ animationDuration: '3.5s', animationDelay: '0.5s' }}></div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="max-w-3xl lg:max-w-4xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100/80 backdrop-blur-sm 
                        border border-primary-200 rounded-full mb-6 sm:mb-8 
                        animate-[fadeIn_0.8s_ease-out]">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
            </span>
            <span className="text-primary-dark text-xs sm:text-sm font-semibold tracking-wide">
              Trusted by 10,000+ Collectors Worldwide
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-text-primary 
                       leading-[1.1] tracking-tight mb-6 sm:mb-8
                       animate-[fadeIn_1s_ease-out_0.2s_both]">
            Discover
            <span className="relative inline-block mx-2 sm:mx-3">
              <span className="text-primary">Rare</span>
              <svg className="absolute -bottom-1 sm:-bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none">
                <path d="M2 8C50 2 150 2 198 8" stroke="#16a34a" strokeWidth="3" strokeLinecap="round"
                  className="opacity-40" />
              </svg>
            </span>
            &
            <br className="hidden sm:block" />
            <span className="text-primary"> Collectible</span> Currencies
          </h1>

          {/* Description */}
          <p className="text-text-secondary text-base sm:text-lg lg:text-xl leading-relaxed 
                      max-w-2xl mb-8 sm:mb-10
                      animate-[fadeIn_1s_ease-out_0.4s_both]">
            Explore our curated collection of world currencies, coins, and numismatic
            treasures from across the globe. Each piece tells a story of history and heritage.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-5
                        animate-[fadeIn_1s_ease-out_0.6s_both]">
            <Link
              to="/shop"
              className="group inline-flex items-center justify-center gap-3 bg-primary 
                       hover:bg-primary-dark text-text-white font-bold 
                       py-4 sm:py-5 px-8 sm:px-10 rounded-full cursor-pointer 
                       transition-all duration-400 ease-out 
                       shadow-xl shadow-primary/25 hover:shadow-2xl hover:shadow-primary/35 
                       transform hover:-translate-y-1 text-base sm:text-lg"
            >
              Shop Now
              <FiArrowRight className="text-xl transition-all duration-300 group-hover:translate-x-2" />
            </Link>

            <Link
              to="/about"
              className="group inline-flex items-center justify-center gap-3 
                       bg-bg-primary/80 backdrop-blur-sm border-2 border-border 
                       hover:border-primary text-text-primary hover:text-primary 
                       font-bold py-4 sm:py-5 px-8 sm:px-10 rounded-full cursor-pointer 
                       transition-all duration-400 ease-out shadow-lg hover:shadow-xl 
                       transform hover:-translate-y-1 text-base sm:text-lg"
            >
              <FiInfo className="text-xl" />
              Learn More
            </Link>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-6 sm:gap-10 mt-12 sm:mt-16 pt-8 sm:pt-10 
                        border-t border-border-light/50
                        animate-[fadeIn_1s_ease-out_0.8s_both]">
            {[
              { value: '5,000+', label: 'Products' },
              { value: '50+', label: 'Countries' },
              { value: '10K+', label: 'Customers' },
              { value: '4.9★', label: 'Rating' },
            ].map((stat, index) => (
              <div key={index} className="text-center sm:text-left">
                <p className="text-2xl sm:text-3xl font-extrabold text-primary mb-1">
                  {stat.value}
                </p>
                <p className="text-text-light text-xs sm:text-sm font-medium uppercase tracking-wider">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom wave decoration */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 80L48 74.7C96 69 192 59 288 53.3C384 48 480 48 576 50.7C672 53 768 59 864 58.7C960 59 1056 53 1152 50.7C1248 48 1344 48 1392 48L1440 48V80H1392C1344 80 1248 80 1152 80C1056 80 960 80 864 80C768 80 672 80 576 80C480 80 384 80 288 80C192 80 96 80 48 80H0Z"
            fill="white" />
        </svg>
      </div>
    </section>
  );
};

export default HeroBanner;