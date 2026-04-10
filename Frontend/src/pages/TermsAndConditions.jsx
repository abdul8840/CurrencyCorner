// TermsAndConditions.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FiShield, 
  FiClock, 
  FiSmartphone, 
  FiTruck, 
  FiMapPin, 
  FiRefreshCw, 
  FiDollarSign, 
  FiGift,
  FiChevronRight,
  FiHome,
  FiMail,
  FiPhone
} from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import SEO from '../components/common/SEO';

const TermsAndConditions = () => {
  const terms = [
    {
      id: 1,
      icon: <FiShield className="w-6 h-6" />,
      title: "Item Condition",
      description: "All items are collectible currencies/coins sold as-is based on the described condition.",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600"
    },
    {
      id: 2,
      icon: <FiClock className="w-6 h-6" />,
      title: "Payment Timeline",
      description: "Payment must be completed via bank transfer or UPI within 24 hours of placing the order.",
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      textColor: "text-purple-600"
    },
    {
      id: 3,
      icon: <FaWhatsapp className="w-6 h-6" />,
      title: "Payment Verification",
      description: "After payment, send payment proof screenshot via WhatsApp for verification.",
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      textColor: "text-green-600"
    },
    {
      id: 4,
      icon: <FiTruck className="w-6 h-6" />,
      title: "Shipping Timeline",
      description: "Orders will be shipped via India Post within 2-3 business days after payment verification.",
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50",
      textColor: "text-orange-600"
    },
    {
      id: 5,
      icon: <FiMapPin className="w-6 h-6" />,
      title: "Order Tracking",
      description: "Tracking number will be provided once the order is shipped.",
      color: "from-cyan-500 to-cyan-600",
      bgColor: "bg-cyan-50",
      textColor: "text-cyan-600"
    },
    {
      id: 6,
      icon: <FiRefreshCw className="w-6 h-6" />,
      title: "Return Policy",
      description: "Once an item has been shipped, returns will not be accepted. Please contact us immediately if there are any issues with your order. We will do our best to resolve any problems, but we cannot accept returns or cancellations after shipping.",
      color: "from-red-500 to-red-600",
      bgColor: "bg-red-50",
      textColor: "text-red-600"
    },
    {
      id: 7,
      icon: <FiDollarSign className="w-6 h-6" />,
      title: "Shipping Charges",
      description: "Shipping charges are non-refundable.",
      color: "from-yellow-500 to-yellow-600",
      bgColor: "bg-yellow-50",
      textColor: "text-yellow-600"
    },
    {
      id: 8,
      icon: <FiGift className="w-6 h-6" />,
      title: "Free Shipping",
      description: "Free shipping on orders above ₹1000.",
      color: "from-pink-500 to-pink-600",
      bgColor: "bg-pink-50",
      textColor: "text-pink-600"
    }
  ];

  return (
    <>
      <SEO 
        title="Terms and Conditions" 
        description="Read our terms and conditions for purchasing collectible currencies and coins. Learn about payment, shipping, returns, and more."
      />
      
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-primary-600 to-primary-800 text-white overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full filter blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full filter blur-3xl translate-x-1/2 translate-y-1/2"></div>
          </div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 rounded-full mb-6 backdrop-blur-sm">
                <FiShield className="w-10 h-10" />
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
                Terms & Conditions
              </h1>
              <p className="text-lg sm:text-xl text-primary-100 max-w-2xl mx-auto">
                Please read these terms carefully before making a purchase
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <Link to="/" className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                  <FiHome className="w-4 h-4" />
                  Home
                </Link>
                <Link to="/shop" className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                  Start Shopping
                  <FiChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Last Updated */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="bg-yellow-50 border-l-4 border-yellow-400 rounded-lg p-4">
            <p className="text-sm text-yellow-800">
              <strong>Last Updated:</strong> {new Date().toLocaleDateString('en-IN', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
        </div>

        {/* Terms Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {terms.map((term, index) => (
              <div
                key={term.id}
                className={`${term.bgColor} rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 animate-fade-in`}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="flex items-start gap-4">
                  <div className={`flex-shrink-0 w-12 h-12 ${term.textColor} bg-white rounded-xl flex items-center justify-center shadow-md`}>
                    {term.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className={`text-xl font-bold ${term.textColor} mb-2`}>
                      {term.title}
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {term.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Important Notes Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-gradient-to-r from-primary-50 to-green-50 rounded-2xl p-8 border border-primary-200">
            <div className="text-center mb-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
                Important Notes
              </h2>
              <div className="w-20 h-1 bg-primary-500 mx-auto rounded-full"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
                  <FiClock className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">24-Hour Payment Window</h3>
                <p className="text-sm text-gray-600">
                  Orders not paid within 24 hours will be automatically cancelled
                </p>
              </div>
              
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                  <FaWhatsapp className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">WhatsApp Support</h3>
                <p className="text-sm text-gray-600">
                  For quick assistance, contact us on WhatsApp with your order number
                </p>
              </div>
              
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                  <FiTruck className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">India Post Shipping</h3>
                <p className="text-sm text-gray-600">
                  All orders are shipped via India Post with tracking number
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mb-12">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-8 md:p-10 bg-gradient-to-br from-primary-600 to-primary-700 text-white">
                <h3 className="text-2xl font-bold mb-4">Have Questions?</h3>
                <p className="text-primary-100 mb-6">
                  If you have any questions about our terms and conditions, please don't hesitate to contact us.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <FaWhatsapp className="w-5 h-5 text-green-400" />
                    <span>WhatsApp: {'7081434589'}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FiMail className="w-5 h-5 text-primary-200" />
                    <span>Email: {'arhobby4@email.com'}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FiPhone className="w-5 h-5 text-primary-200" />
                    <span>Phone: {'7081434589'}</span>
                  </div>
                </div>
              </div>
              
              <div className="p-8 md:p-10 bg-gray-50">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Quick Summary</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <FiChevronRight className="w-5 h-5 text-primary-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Items sold as-is based on described condition</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FiChevronRight className="w-5 h-5 text-primary-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">24-hour payment window via UPI or bank transfer</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FiChevronRight className="w-5 h-5 text-primary-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Payment proof required on WhatsApp</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FiChevronRight className="w-5 h-5 text-primary-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">2-3 days shipping after verification</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FiChevronRight className="w-5 h-5 text-primary-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">No returns after shipping</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FiChevronRight className="w-5 h-5 text-primary-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Free shipping on orders ₹1000+</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Agreement Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="text-center bg-gray-50 rounded-2xl p-8 border border-gray-200">
            <p className="text-gray-600 mb-4">
              By placing an order on AR Hobby, you acknowledge that you have read, understood, 
              and agree to be bound by these Terms and Conditions.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                to="/shop" 
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-all duration-300 hover:shadow-lg active:scale-95"
              >
                Start Shopping
                <FiChevronRight className="w-4 h-4" />
              </Link>
              <Link 
                to="/contact" 
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-primary-600 rounded-lg font-semibold border-2 border-primary-600 hover:bg-primary-50 transition-all duration-300"
              >
                Contact Us
                <FiMail className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </>
  );
};

export default TermsAndConditions;