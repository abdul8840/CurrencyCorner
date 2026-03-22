import { useState } from 'react';
import { contactAPI } from '../services/api';
import SEO from '../components/common/SEO';
import { FiMail, FiPhone, FiMapPin, FiMessageSquare } from 'react-icons/fi';
import toast from 'react-hot-toast';
import emailjs from '@emailjs/browser';

const ContactPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await contactAPI.submit(formData);

      try {
        await emailjs.send(
          import.meta.env.VITE_EMAILJS_SERVICE_ID,
          import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
          {
            from_name: formData.name,
            from_email: formData.email,
            subject: formData.subject,
            message: formData.message
          },
          import.meta.env.VITE_EMAILJS_PUBLIC_KEY
        );
      } catch (emailError) {
        console.log('EmailJS error (non-critical):', emailError);
      }

      toast.success('Message sent successfully!');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to send message');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <SEO title="Contact Us" description="Get in touch with Currency Corner" />
      <h1>Contact Us</h1>
      <div>
        <div>
          <div>
            <FiMapPin />
            <h3>Address</h3>
            <p>123 Collector Street, Mumbai, Maharashtra, India 400001</p>
          </div>
          <div>
            <FiPhone />
            <h3>Phone</h3>
            <p>+91-9876543210</p>
          </div>
          <div>
            <FiMail />
            <h3>Email</h3>
            <p>info@currencycorner.com</p>
          </div>
          <div>
            <FiMessageSquare />
            <h3>WhatsApp</h3>
            <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer">
              Chat with us
            </a>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div>
            <label>Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div>
            <label>Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div>
            <label>Subject</label>
            <input type="text" name="subject" value={formData.subject} onChange={handleChange} required />
          </div>
          <div>
            <label>Message</label>
            <textarea name="message" value={formData.message} onChange={handleChange} required rows={5} />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;