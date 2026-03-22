import PDFDocument from 'pdfkit';
import cloudinary from '../config/cloudinary.js';
import streamifier from 'streamifier';

class InvoiceService {
  async generateInvoice(order, user) {
    return new Promise((resolve, reject) => {
      const doc = new PDFDocument({ margin: 50 });
      const buffers = [];

      doc.on('data', (chunk) => buffers.push(chunk));
      doc.on('end', () => {
        const pdfBuffer = Buffer.concat(buffers);
        resolve(pdfBuffer);
      });
      doc.on('error', reject);

      doc.fontSize(20).text('Currency Corner', { align: 'center' });
      doc.fontSize(10).text('Collectible Currencies & Coins', { align: 'center' });
      doc.moveDown();
      doc.text(process.env.STORE_ADDRESS, { align: 'center' });
      doc.text(`Email: ${process.env.STORE_EMAIL} | Phone: ${process.env.STORE_PHONE}`, { align: 'center' });
      doc.moveDown();

      doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
      doc.moveDown();

      doc.fontSize(16).text('INVOICE', { align: 'center' });
      doc.moveDown();

      doc.fontSize(10);
      doc.text(`Invoice No: ${order.orderNumber}`);
      doc.text(`Date: ${new Date(order.createdAt).toLocaleDateString('en-IN')}`);
      doc.text(`Status: ${order.paymentStatus}`);
      doc.moveDown();

      doc.fontSize(12).text('Bill To:');
      doc.fontSize(10);
      doc.text(order.shippingAddress.fullName);
      doc.text(order.shippingAddress.addressLine1);
      if (order.shippingAddress.addressLine2) doc.text(order.shippingAddress.addressLine2);
      doc.text(`${order.shippingAddress.city}, ${order.shippingAddress.state} - ${order.shippingAddress.pincode}`);
      doc.text(`Phone: ${order.shippingAddress.phone}`);
      doc.moveDown();

      doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
      doc.moveDown();

      const tableTop = doc.y;
      doc.fontSize(10).font('Helvetica-Bold');
      doc.text('#', 50, tableTop);
      doc.text('Item', 70, tableTop);
      doc.text('Qty', 350, tableTop);
      doc.text('Price', 400, tableTop);
      doc.text('Total', 480, tableTop);

      doc.moveTo(50, tableTop + 15).lineTo(550, tableTop + 15).stroke();

      doc.font('Helvetica');
      let y = tableTop + 25;
      order.items.forEach((item, index) => {
        doc.text(index + 1, 50, y);
        doc.text(item.name.substring(0, 40), 70, y);
        doc.text(item.quantity.toString(), 350, y);
        doc.text(`Rs. ${item.price}`, 400, y);
        doc.text(`Rs. ${item.price * item.quantity}`, 480, y);
        y += 20;
      });

      doc.moveTo(50, y).lineTo(550, y).stroke();
      y += 15;

      doc.text('Subtotal:', 400, y);
      doc.text(`Rs. ${order.subtotal}`, 480, y);
      y += 15;

      if (order.discount > 0) {
        doc.text('Discount:', 400, y);
        doc.text(`-Rs. ${order.discount}`, 480, y);
        y += 15;
      }

      doc.text('Shipping:', 400, y);
      doc.text(`Rs. ${order.shippingCharge}`, 480, y);
      y += 15;

      doc.font('Helvetica-Bold');
      doc.text('Total:', 400, y);
      doc.text(`Rs. ${order.totalAmount}`, 480, y);
      y += 30;

      doc.font('Helvetica');
      doc.moveTo(50, y).lineTo(550, y).stroke();
      y += 15;

      doc.fontSize(10).text('Payment Details:', 50, y);
      y += 15;
      doc.fontSize(9);
      doc.text(`Bank: ${process.env.STORE_BANK_NAME}`, 50, y); y += 12;
      doc.text(`Account: ${process.env.STORE_ACCOUNT_NUMBER}`, 50, y); y += 12;
      doc.text(`IFSC: ${process.env.STORE_IFSC}`, 50, y); y += 12;
      doc.text(`Account Holder: ${process.env.STORE_ACCOUNT_HOLDER}`, 50, y); y += 12;
      doc.text(`UPI: ${process.env.STORE_UPI}`, 50, y); y += 20;

      doc.fontSize(8).text('Thank you for shopping with Currency Corner!', 50, y, { align: 'center' });

      doc.end();
    });
  }

  async uploadInvoiceToCloudinary(pdfBuffer, orderNumber) {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: 'raw',
          folder: 'currency-corner/invoices',
          public_id: `invoice-${orderNumber}`,
          format: 'pdf'
        },
        (error, result) => {
          if (error) reject(error);
          else resolve({ public_id: result.public_id, url: result.secure_url });
        }
      );
      streamifier.createReadStream(pdfBuffer).pipe(uploadStream);
    });
  }
}

export default new InvoiceService();