import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';

dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
console.log('SendGrid API Key set successfully', process.env.SENDGRID_API_KEY);

const msg = {
  to: 'your_email@gmail.com', // your email
  from: process.env.SENDGRID_FROM_EMAIL,
  subject: 'Test Email',
  text: 'SendGrid is working 🚀',
};

sgMail.send(msg)
  .then(() => console.log('✅ Email sent'))
  .catch(err => console.error('❌ Error:', err.response?.body || err.message));

export default sgMail;