import { FiShield, FiTruck, FiAward, FiHeadphones } from 'react-icons/fi';

const WhyChooseUs = () => {
  const features = [
    { icon: <FiAward />, title: 'Authentic Items', description: 'Every item is verified for authenticity' },
    { icon: <FiShield />, title: 'Secure Transactions', description: 'Safe and secure payment process' },
    { icon: <FiTruck />, title: 'India Post Shipping', description: 'Reliable shipping with tracking' },
    { icon: <FiHeadphones />, title: 'Customer Support', description: 'Dedicated support via WhatsApp' }
  ];

  return (
    <section>
      <div>
        <h2>Why Choose Currency Corner</h2>
        <div>
          {features.map((feature, index) => (
            <div key={index}>
              <div>{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;