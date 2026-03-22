import { Link } from 'react-router-dom';
import { formatCurrency } from '../../utils/helpers';
import { FiCheckCircle, FiCopy } from 'react-icons/fi';
import toast from 'react-hot-toast';

const OrderSuccess = ({ order, bankDetails }) => {
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard');
  };

  return (
    <div>
      <div>
        <FiCheckCircle />
        <h1>Order Placed Successfully!</h1>
        <p>Order Number: {order.orderNumber}</p>
      </div>

      <div>
        <h2>Complete Your Payment</h2>
        <p>Please transfer {formatCurrency(order.totalAmount)} using the details below:</p>

        <div>
          <h3>Bank Transfer</h3>
          <div>
            <p>Bank: {bankDetails.bankName}</p>
            <p>Account Number: {bankDetails.accountNumber}
              <button onClick={() => copyToClipboard(bankDetails.accountNumber)}><FiCopy /></button>
            </p>
            <p>IFSC: {bankDetails.ifsc}
              <button onClick={() => copyToClipboard(bankDetails.ifsc)}><FiCopy /></button>
            </p>
            <p>Account Holder: {bankDetails.accountHolder}</p>
          </div>
        </div>

        <div>
          <h3>UPI Payment</h3>
          <p>UPI ID: {bankDetails.upi}
            <button onClick={() => copyToClipboard(bankDetails.upi)}><FiCopy /></button>
          </p>
        </div>

        <div>
          <p>After payment, please send the payment proof via WhatsApp to:</p>
          <a href={`https://wa.me/${bankDetails.whatsapp?.replace('+', '')}`} target="_blank" rel="noopener noreferrer">
            {bankDetails.whatsapp}
          </a>
        </div>
      </div>

      <div>
        <Link to={`/order/${order._id}`}>View Order Details</Link>
        <Link to="/orders">My Orders</Link>
        <Link to="/shop">Continue Shopping</Link>
      </div>
    </div>
  );
};

export default OrderSuccess;