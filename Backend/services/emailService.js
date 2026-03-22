import sgMail from '../config/sendgrid.js';

class EmailService {
  constructor() {
    this.from = {
      email: process.env.SENDGRID_FROM_EMAIL,
      name: process.env.SENDGRID_FROM_NAME
    };
  }

  async sendOrderConfirmation(order, user, invoiceBuffer) {
    const msg = {
      to: user.email,
      from: this.from,
      subject: `Order Confirmed - ${order.orderNumber} | Currency Corner`,
      html: this.getOrderConfirmationHTML(order, user),
      attachments: invoiceBuffer ? [{
        content: invoiceBuffer.toString('base64'),
        filename: `Invoice-${order.orderNumber}.pdf`,
        type: 'application/pdf',
        disposition: 'attachment'
      }] : []
    };

    try {
      await sgMail.send(msg);
      console.log('Order confirmation email sent to:', user.email);
    } catch (error) {
      console.error('Email send error:', error);
    }
  }

  async sendPasswordResetEmail(user, resetUrl) {
    const msg = {
      to: user.email,
      from: this.from,
      subject: 'Password Reset Request - Currency Corner',
      html: this.getPasswordResetHTML(user, resetUrl)
    };

    try {
      await sgMail.send(msg);
      console.log('Password reset email sent to:', user.email);
    } catch (error) {
      console.error('Email send error:', error);
    }
  }

  async sendOrderStatusUpdate(order, user) {
    const msg = {
      to: user.email,
      from: this.from,
      subject: `Order ${order.orderStatus} - ${order.orderNumber} | Currency Corner`,
      html: this.getOrderStatusUpdateHTML(order, user)
    };

    try {
      await sgMail.send(msg);
    } catch (error) {
      console.error('Email send error:', error);
    }
  }

  getOrderConfirmationHTML(order, user) {
    const itemsHTML = order.items.map(item =>
      `<tr>
        <td>${item.name}</td>
        <td>${item.quantity}</td>
        <td>Rs. ${item.price}</td>
        <td>Rs. ${item.price * item.quantity}</td>
      </tr>`
    ).join('');

    return `
      <div>
        <h1>Order Confirmed!</h1>
        <p>Dear ${user.name},</p>
        <p>Thank you for your order. Your order has been placed successfully.</p>
        <h2>Order Details</h2>
        <p><strong>Order Number:</strong> ${order.orderNumber}</p>
        <p><strong>Date:</strong> ${new Date(order.createdAt).toLocaleDateString('en-IN')}</p>
        <table border="1" cellpadding="8" cellspacing="0">
          <thead>
            <tr><th>Item</th><th>Qty</th><th>Price</th><th>Total</th></tr>
          </thead>
          <tbody>${itemsHTML}</tbody>
        </table>
        <p><strong>Subtotal:</strong> Rs. ${order.subtotal}</p>
        ${order.discount > 0 ? `<p><strong>Discount:</strong> -Rs. ${order.discount}</p>` : ''}
        <p><strong>Shipping:</strong> Rs. ${order.shippingCharge}</p>
        <p><strong>Total Amount:</strong> Rs. ${order.totalAmount}</p>
        <h2>Payment Instructions</h2>
        <p>Please transfer the total amount using the following details:</p>
        <p><strong>Bank:</strong> ${process.env.STORE_BANK_NAME}</p>
        <p><strong>Account Number:</strong> ${process.env.STORE_ACCOUNT_NUMBER}</p>
        <p><strong>IFSC:</strong> ${process.env.STORE_IFSC}</p>
        <p><strong>Account Holder:</strong> ${process.env.STORE_ACCOUNT_HOLDER}</p>
        <p><strong>UPI:</strong> ${process.env.STORE_UPI}</p>
        <p>After payment, please send the payment proof via WhatsApp to ${process.env.STORE_WHATSAPP}</p>
        <p>Thank you for shopping with Currency Corner!</p>
      </div>
    `;
  }

  getPasswordResetHTML(user, resetUrl) {
    return `
      <div>
        <h1>Password Reset Request</h1>
        <p>Dear ${user.name},</p>
        <p>You have requested to reset your password. Click the link below:</p>
        <a href="${resetUrl}">Reset Password</a>
        <p>This link will expire in 30 minutes.</p>
        <p>If you did not request this, please ignore this email.</p>
      </div>
    `;
  }

  getOrderStatusUpdateHTML(order, user) {
    return `
      <div>
        <h1>Order Status Update</h1>
        <p>Dear ${user.name},</p>
        <p>Your order <strong>${order.orderNumber}</strong> status has been updated to <strong>${order.orderStatus}</strong>.</p>
        ${order.trackingNumber ? `<p><strong>Tracking Number:</strong> ${order.trackingNumber}</p>
        <p><a href="https://www.indiapost.gov.in/_layouts/15/DOP.Portal.Tracking/TrackConsignment.aspx">Track your shipment on India Post</a></p>` : ''}
        <p>Thank you for shopping with Currency Corner!</p>
      </div>
    `;
  }
}

export default new EmailService();