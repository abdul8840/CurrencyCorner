import SibApiV3Sdk from 'sib-api-v3-sdk';
import dotenv from 'dotenv';

dotenv.config();

console.log('Brevo API Key status:', process.env.BREVO_API_KEY ? '✅ Set' : '❌ Missing');

// Configure Brevo API
const defaultClient = SibApiV3Sdk.ApiClient.instance;
const apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = process.env.BREVO_API_KEY;

const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

console.log('✅ Brevo API configured successfully');

class EmailService {
  constructor() {
    this.sender = {
      email: process.env.BREVO_FROM_EMAIL || 'noreply@yourdomain.com',
      name: process.env.BREVO_FROM_NAME || 'Your Store'
    };
    this.apiInstance = apiInstance; // Store the api instance
  }

  async sendEmail({ to, subject, html, attachment = [] }) {
    try {
      const email = new SibApiV3Sdk.SendSmtpEmail();

      email.sender = this.sender;
      email.to = [
        {
          email: to.email,
          name: to.name || "User"
        }
      ];
      email.subject = subject;
      email.htmlContent = html;

      if (attachment.length > 0) {
        email.attachment = attachment;
      }

      const response = await this.apiInstance.sendTransacEmail(email);
      console.log("✅ Email sent:", response.messageId || "Success");
      return response;
    } catch (error) {
      console.error("❌ FULL BREVO ERROR:", error.response?.body || error.message);
      throw error;
    }
  }

  async sendOrderConfirmation(order, user, invoiceBuffer) {
    const attachments = [];

    if (invoiceBuffer) {
      attachments.push({
        content: invoiceBuffer.toString('base64'),
        name: `Invoice-${order.orderNumber}.pdf`,
        type: 'application/pdf'
      });
    }

    return this.sendEmail({
      to: { email: user.email, name: user.name },
      subject: `Order Confirmed - ${order.orderNumber} | ${process.env.BREVO_FROM_NAME}`,
      html: this.getOrderConfirmationHTML(order, user),
      attachment: attachments
    });
  }

  async sendPasswordResetEmail(user, resetUrl) {
    return this.sendEmail({
      to: { email: user.email, name: user.name },
      subject: "Password Reset Request - Currency Corner",
      html: this.getPasswordResetHTML(user, resetUrl)
    });
  }

  async sendOrderStatusUpdate(order, user) {
    return this.sendEmail({
      to: { email: user.email, name: user.name },
      subject: `Order ${order.orderStatus} - ${order.orderNumber}`,
      html: this.getOrderStatusUpdateHTML(order, user)
    });
  }

  async sendWelcomeEmail(user) {
    return this.sendEmail({
      to: { email: user.email, name: user.name },
      subject: "Welcome to Currency Corner!",
      html: this.getWelcomeHTML(user)
    });
  }

  async sendContactFormEmail(contactData) {
    return this.sendEmail({
      to: { email: process.env.BREVO_FROM_EMAIL },
      subject: `New Contact Form - ${contactData.name}`,
      html: this.getContactFormHTML(contactData)
    });
  }

  async sendCampaignEmail(subscriber, campaign, products) {
    try {
      // Validate required parameters
      if (!subscriber || !subscriber.email) {
        throw new Error('Invalid subscriber data: email is required');
      }
      
      if (!campaign) {
        throw new Error('Invalid campaign data');
      }

      if (!this.apiInstance) {
        throw new Error('Brevo API not initialized');
      }

      console.log(`📧 Preparing to send email to: ${subscriber.email}`);
      console.log(`📧 Campaign subject: ${campaign.subject}`);

      const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

      sendSmtpEmail.sender = this.sender;
      sendSmtpEmail.to = [{ 
        email: subscriber.email, 
        name: subscriber.name || 'Valued Customer' 
      }];
      sendSmtpEmail.subject = campaign.subject;
      sendSmtpEmail.htmlContent = this.getCampaignHTML(subscriber, campaign, products || []);

      const response = await this.apiInstance.sendTransacEmail(sendSmtpEmail);
      console.log(`✅ Campaign email sent successfully to: ${subscriber.email}`);
      return response;
    } catch (error) {
      console.error('❌ Campaign email error:', error.message || error);
      throw error;
    }
  }

  getOrderConfirmationHTML(order, user) {
    const itemsHTML = order.items
      .map(
        (item) =>
          `<tr>
        <td style="padding: 10px; border-bottom: 1px solid #ddd;">${item.name}</td>
        <td style="padding: 10px; border-bottom: 1px solid #ddd; text-align: center;">${item.quantity}</td>
        <td style="padding: 10px; border-bottom: 1px solid #ddd; text-align: right;">Rs. ${item.price}</td>
        <td style="padding: 10px; border-bottom: 1px solid #ddd; text-align: right;">Rs. ${item.price * item.quantity}</td>
       </tr>`
      )
      .join('');

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #2c3e50; color: white; padding: 20px; text-align: center; border-radius: 5px 5px 0 0; }
          .content { background-color: #f9f9f9; padding: 20px; border: 1px solid #ddd; border-radius: 0 0 5px 5px; }
          .order-details { background-color: white; padding: 15px; margin: 15px 0; border-radius: 5px; }
          table { width: 100%; border-collapse: collapse; margin: 15px 0; }
          th { background-color: #2c3e50; color: white; padding: 10px; text-align: left; }
          .total-section { background-color: #ecf0f1; padding: 15px; border-radius: 5px; margin: 15px 0; }
          .payment-section { background-color: #fff3cd; padding: 15px; border-radius: 5px; margin: 15px 0; border-left: 4px solid #ffc107; }
          .footer { text-align: center; color: #777; font-size: 12px; margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; }
          .button { display: inline-block; background-color: #2c3e50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin: 10px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎉 Order Confirmed!</h1>
          </div>
          <div class="content">
            <p>Dear <strong>${user.name}</strong>,</p>
            <p>Thank you for your order! Your order has been placed successfully. We're excited to get your items to you.</p>

            <div class="order-details">
              <h2 style="color: #2c3e50; border-bottom: 2px solid #2c3e50; padding-bottom: 10px;">Order Details</h2>
              <p><strong>Order Number:</strong> <span style="color: #e74c3c;">${order.orderNumber}</span></p>
              <p><strong>Order Date:</strong> ${new Date(order.createdAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
              <p><strong>Status:</strong> <span style="background-color: #3498db; color: white; padding: 5px 10px; border-radius: 3px;">${order.orderStatus}</span></p>
            </div>

            <h3 style="color: #2c3e50;">Items Ordered</h3>
            <table>
              <thead>
                <tr>
                  <th>Item</th>
                  <th style="text-align: center;">Quantity</th>
                  <th style="text-align: right;">Price</th>
                  <th style="text-align: right;">Total</th>
                </tr>
              </thead>
              <tbody>
                ${itemsHTML}
              </tbody>
            </table>

            <div class="total-section">
              <table style="margin: 0;">
                <tr>
                  <td><strong>Subtotal:</strong></td>
                  <td style="text-align: right;"><strong>Rs. ${order.subtotal}</strong></td>
                </tr>
                ${order.discount > 0 ? `<tr style="color: #27ae60;"><td><strong>Discount:</strong></td><td style="text-align: right;"><strong>-Rs. ${order.discount}</strong></td></tr>` : ''}
                <tr>
                  <td><strong>Shipping Charge:</strong></td>
                  <td style="text-align: right;"><strong>Rs. ${order.shippingCharge}</strong></td>
                </tr>
                <tr style="font-size: 16px; border-top: 2px solid #bdc3c7;">
                  <td><strong>Total Amount:</strong></td>
                  <td style="text-align: right;"><strong style="color: #e74c3c;">Rs. ${order.totalAmount}</strong></td>
                </tr>
              </table>
            </div>

            <div class="payment-section">
              <h3 style="margin-top: 0; color: #ff6b6b;">💳 Payment Instructions</h3>
              <p>Please transfer the total amount using the following payment methods:</p>
              
              <h4 style="color: #2c3e50; margin-top: 15px;">Bank Transfer</h4>
              <p>
                <strong>Bank Name:</strong> ${process.env.STORE_BANK_NAME}<br>
                <strong>Account Number:</strong> ${process.env.STORE_ACCOUNT_NUMBER}<br>
                <strong>IFSC Code:</strong> ${process.env.STORE_IFSC}<br>
                <strong>Account Holder:</strong> ${process.env.STORE_ACCOUNT_HOLDER}
              </p>

              <h4 style="color: #2c3e50;">UPI Payment</h4>
              <p><strong>UPI ID:</strong> ${process.env.STORE_UPI}</p>

              <p style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #fff0c7;">
                <strong>📱 After payment, please send the payment proof via WhatsApp to:</strong><br>
                <span style="color: #27ae60; font-size: 16px;"><strong>${process.env.STORE_WHATSAPP}</strong></span>
              </p>
            </div>

            <div style="text-align: center; margin: 20px 0;">
              <a href="${process.env.FRONTEND_URL || 'https://currencycorner.com'}/orders/${order._id}" class="button">View Order Details</a>
            </div>

            <p style="margin-top: 20px;">If you have any questions about your order, please don't hesitate to contact us.</p>
            <p>Thank you for shopping with <strong>Currency Corner</strong>!</p>
          </div>
          <div class="footer">
            <p>© 2024 Currency Corner. All rights reserved.</p>
            <p>Store Address: ${process.env.STORE_ADDRESS}</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  getPasswordResetHTML(user, resetUrl) {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #2c3e50; color: white; padding: 20px; text-align: center; border-radius: 5px 5px 0 0; }
          .content { background-color: #f9f9f9; padding: 20px; border: 1px solid #ddd; border-radius: 0 0 5px 5px; }
          .reset-box { background-color: #fff3cd; padding: 20px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #ffc107; }
          .button { display: inline-block; background-color: #e74c3c; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; }
          .footer { text-align: center; color: #777; font-size: 12px; margin-top: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🔐 Password Reset Request</h1>
          </div>
          <div class="content">
            <p>Hello <strong>${user.name}</strong>,</p>
            <p>We received a request to reset the password for your Currency Corner account. Click the button below to reset your password:</p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${resetUrl}" class="button">Reset Password</a>
            </div>

            <div class="reset-box">
              <p><strong>⚠️ Important:</strong></p>
              <ul>
                <li>This link will expire in <strong>30 minutes</strong></li>
                <li>The link can only be used once</li>
                <li>If you didn't request this, please ignore this email</li>
              </ul>
            </div>

            <p>If the button doesn't work, copy and paste this link in your browser:</p>
            <p style="word-break: break-all; background-color: #ecf0f1; padding: 10px; border-radius: 5px;"><code>${resetUrl}</code></p>

            <p style="margin-top: 20px;">For security reasons, never share this link with anyone.</p>
          </div>
          <div class="footer">
            <p>© 2024 Currency Corner. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  getOrderStatusUpdateHTML(order, user) {
    const statusColors = {
      'Placed': '#3498db',
      'Confirmed': '#9b59b6',
      'Processing': '#f39c12',
      'Shipped': '#1abc9c',
      'Delivered': '#27ae60',
      'Cancelled': '#e74c3c'
    };

    const statusColor = statusColors[order.orderStatus] || '#3498db';

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #2c3e50; color: white; padding: 20px; text-align: center; border-radius: 5px 5px 0 0; }
          .content { background-color: #f9f9f9; padding: 20px; border: 1px solid #ddd; border-radius: 0 0 5px 5px; }
          .status-box { background-color: white; padding: 20px; border-radius: 5px; margin: 20px 0; border-left: 4px solid ${statusColor}; }
          .status-badge { display: inline-block; background-color: ${statusColor}; color: white; padding: 8px 15px; border-radius: 3px; font-weight: bold; }
          .tracking-box { background-color: #ecf0f1; padding: 15px; border-radius: 5px; margin: 15px 0; }
          .button { display: inline-block; background-color: #2c3e50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; }
          .footer { text-align: center; color: #777; font-size: 12px; margin-top: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>📦 Order Status Update</h1>
          </div>
          <div class="content">
            <p>Hello <strong>${user.name}</strong>,</p>
            <p>Great news! We have an update on your order.</p>

            <div class="status-box">
              <p style="margin: 0 0 10px 0;"><strong>Order Number:</strong> ${order.orderNumber}</p>
              <p style="margin: 0;">
                <strong>New Status:</strong> <span class="status-badge">${order.orderStatus}</span>
              </p>
            </div>

            ${order.trackingNumber ? `
              <div class="tracking-box">
                <h3 style="margin-top: 0; color: #2c3e50;">📍 Tracking Information</h3>
                <p><strong>Tracking Number:</strong> <code style="background-color: white; padding: 5px; border-radius: 3px;">${order.trackingNumber}</code></p>
                <p>
                  <a href="https://www.indiapost.gov.in/_layouts/15/DOP.Portal.Tracking/TrackConsignment.aspx" class="button" style="font-size: 14px;">Track Your Shipment</a>
                </p>
              </div>
            ` : ''}

            <div style="text-align: center; margin: 20px 0;">
              <a href="${process.env.FRONTEND_URL || 'https://currencycorner.com'}/orders/${order._id}" class="button">View Full Details</a>
            </div>

            <p style="margin-top: 20px; color: #777; font-size: 14px;">
              If you have any questions, feel free to reach out to us via WhatsApp: <strong>${process.env.STORE_WHATSAPP}</strong>
            </p>
          </div>
          <div class="footer">
            <p>© 2024 Currency Corner. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  getWelcomeHTML(user) {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #2c3e50; color: white; padding: 20px; text-align: center; border-radius: 5px 5px 0 0; }
          .content { background-color: #f9f9f9; padding: 20px; border: 1px solid #ddd; border-radius: 0 0 5px 5px; }
          .welcome-box { background-color: #d4edda; padding: 20px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #28a745; }
          .button { display: inline-block; background-color: #2c3e50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; }
          .features { background-color: white; padding: 15px; border-radius: 5px; margin: 15px 0; }
          .feature-item { padding: 10px 0; border-bottom: 1px solid #ecf0f1; }
          .footer { text-align: center; color: #777; font-size: 12px; margin-top: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>👋 Welcome to Currency Corner!</h1>
          </div>
          <div class="content">
            <div class="welcome-box">
              <p style="margin: 0; font-size: 16px;"><strong>Hello ${user.name}! 🎉</strong></p>
              <p style="margin: 10px 0 0 0;">Your account has been created successfully. Welcome to our community!</p>
            </div>

            <p>We're thrilled to have you join Currency Corner. Here's what you can do now:</p>

            <div class="features">
              <div class="feature-item">
                <strong>🛍️ Shop Our Collection</strong><br>
                Browse through our curated selection of currency and collectibles.
              </div>
              <div class="feature-item">
                <strong>💰 Exclusive Deals</strong><br>
                Get access to special offers and discounts for our registered members.
              </div>
              <div class="feature-item">
                <strong>📦 Track Orders</strong><br>
                Keep track of your orders and shipments in real-time.
              </div>
              <div class="feature-item">
                <strong>💬 Customer Support</strong><br>
                Our team is here to help you with any questions!
              </div>
            </div>

            <div style="text-align: center; margin: 20px 0;">
              <a href="${process.env.FRONTEND_URL || 'https://currencycorner.com'}" class="button">Start Shopping Now</a>
            </div>

            <p style="margin-top: 20px;">If you have any questions, don't hesitate to contact us:</p>
            <p>
              📧 Email: <strong>${process.env.STORE_EMAIL}</strong><br>
              📱 WhatsApp: <strong>${process.env.STORE_WHATSAPP}</strong>
            </p>
          </div>
          <div class="footer">
            <p>© 2024 Currency Corner. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  getContactFormHTML(contactData) {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #2c3e50; color: white; padding: 20px; text-align: center; border-radius: 5px 5px 0 0; }
          .content { background-color: #f9f9f9; padding: 20px; border: 1px solid #ddd; border-radius: 0 0 5px 5px; }
          .info-box { background-color: white; padding: 15px; border-radius: 5px; margin: 15px 0; border-left: 4px solid #2c3e50; }
          .message-box { background-color: #ecf0f1; padding: 15px; border-radius: 5px; margin: 15px 0; font-style: italic; }
          .footer { text-align: center; color: #777; font-size: 12px; margin-top: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>📧 New Contact Form Submission</h1>
          </div>
          <div class="content">
            <p>You have received a new contact form submission:</p>

            <div class="info-box">
              <p><strong>Name:</strong> ${contactData.name}</p>
              <p><strong>Email:</strong> ${contactData.email}</p>
              <p><strong>Phone:</strong> ${contactData.phone || 'Not provided'}</p>
              <p><strong>Subject:</strong> ${contactData.subject || 'No subject'}</p>
            </div>

            <div class="message-box">
              <p><strong>Message:</strong></p>
              <p>${contactData.message.replace(/\n/g, '<br>')}</p>
            </div>

            <p style="color: #777; font-size: 12px;">
              You can reply directly to this contact's email: ${contactData.email}
            </p>
          </div>
          <div class="footer">
            <p>© 2024 Currency Corner. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  getCampaignHTML(subscriber, campaign, products) {
    const productList = Array.isArray(products) ? products : [];
    
    const productsHTML = productList.slice(0, 6).map(product => `
      <div style="background: white; padding: 15px; border-radius: 10px; margin-bottom: 15px; border: 1px solid #e0e0e0;">
        <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/product/${product._id}" style="text-decoration: none; color: #333;">
          <div style="height: 200px; background: #f5f5f5; border-radius: 8px; margin-bottom: 10px; overflow: hidden;">
            ${product.images && product.images.length > 0 && product.images[0].url 
              ? `<img src="${product.images[0].url}" style="width: 100%; height: 100%; object-fit: cover;" />` 
              : '<div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background: #e0e0e0; color: #999;">No Image</div>'}
          </div>
          <h3 style="margin: 0 0 8px 0; font-size: 16px; font-weight: bold; color: #333;">${this.escapeHtml(product.name || 'Product')}</h3>
          <p style="margin: 0 0 10px 0; color: #666; font-size: 14px; line-height: 1.4;">${this.escapeHtml((product.description || '').substring(0, 100))}...</p>
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span style="font-size: 18px; font-weight: bold; color: #2c3e50;">Rs. ${product.price || 0}</span>
            <span style="background: #2c3e50; color: white; padding: 8px 16px; border-radius: 6px; font-weight: bold; display: inline-block;">View Details</span>
          </div>
        </a>
      </div>
    `).join('');

    const unsubscribeLink = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/unsubscribe?email=${encodeURIComponent(subscriber.email)}`;
    const preferencesLink = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/newsletter-preferences?email=${encodeURIComponent(subscriber.email)}`;

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${this.escapeHtml(campaign.title)}</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background: #f5f5f5; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; background: white; }
          .header { background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%); color: white; padding: 40px 30px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { padding: 30px 0; }
          .products { display: grid; gap: 15px; }
          .footer { text-align: center; padding: 20px; color: #999; font-size: 12px; border-top: 1px solid #eee; margin-top: 30px; }
          .cta-button { display: inline-block; background: #2c3e50; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: bold; }
          .cta-button:hover { background: #1a252f; }
          @media only screen and (max-width: 600px) {
            .container { width: 100% !important; }
            .products { grid-template-columns: 1fr !important; }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin: 0 0 10px 0; font-size: 28px;">${this.escapeHtml(campaign.title)}</h1>
            <p style="margin: 0; opacity: 0.9; font-size: 16px;">${this.escapeHtml(campaign.description)}</p>
          </div>

          ${campaign.bannerImage && campaign.bannerImage.url ? `
            <div style="margin: 20px 0;">
              <img src="${campaign.bannerImage.url}" style="width: 100%; height: auto; border-radius: 8px;" alt="Campaign Banner" />
            </div>
          ` : ''}

          <div class="content">
            <h2 style="color: #2c3e50; margin-bottom: 20px; font-size: 24px;">Featured Products</h2>
            <div class="products">
              ${productsHTML || '<p style="text-align: center; color: #999;">No products featured in this campaign.</p>'}
            </div>
          </div>

          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/shop" class="cta-button">Shop All Products</a>
          </div>

          <div class="footer">
            <p style="margin: 0 0 10px 0;">You received this email because you subscribed to our newsletter.</p>
            <p style="margin: 0;">
              <a href="${unsubscribeLink}" style="color: #999; text-decoration: none;">Unsubscribe</a> | 
              <a href="${preferencesLink}" style="color: #999; text-decoration: none;">Update Preferences</a>
            </p>
            <p style="margin: 10px 0 0 0;">&copy; ${new Date().getFullYear()} Your Store. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  escapeHtml(text) {
    if (!text) return '';
    return String(text)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }
}

export default new EmailService();