import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrderById, downloadInvoice } from '../features/order/orderSlice';
import OrderTimeline from '../components/order/OrderTimeline';
import Loader from '../components/common/Loader';
import SEO from '../components/common/SEO';
import { formatCurrency, formatDate, getStatusColor } from '../utils/helpers';
import { FiDownload, FiMapPin, FiCopy } from 'react-icons/fi';
import toast from 'react-hot-toast';

const OrderDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { order, bankDetails, loading } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(fetchOrderById(id));
  }, [id, dispatch]);

  const handleDownloadInvoice = () => {
    dispatch(downloadInvoice(id));
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied!');
  };

  if (loading || !order) return <Loader />;

  return (
    <div>
      <SEO title={`Order ${order.orderNumber}`} />
      <div>
        <div>
          <h1>Order #{order.orderNumber}</h1>
          <p>Placed on {formatDate(order.createdAt)}</p>
        </div>
        <div>
          <span className={getStatusColor(order.orderStatus)}>{order.orderStatus}</span>
          <span className={getStatusColor(order.paymentStatus)}>Payment: {order.paymentStatus}</span>
        </div>
      </div>

      <div>
        <div>
          <div>
            <h2>Order Items</h2>
            {order.items.map((item, index) => (
              <div key={index}>
                <img src={item.image || '/placeholder.png'} alt={item.name} />
                <div>
                  <p>{item.name}</p>
                  <p>Qty: {item.quantity} × {formatCurrency(item.price)}</p>
                </div>
                <p>{formatCurrency(item.price * item.quantity)}</p>
              </div>
            ))}
          </div>

          <div>
            <div><span>Subtotal</span><span>{formatCurrency(order.subtotal)}</span></div>
            {order.discount > 0 && (
              <div>
                <span>Discount {order.coupon?.code && `(${order.coupon.code})`}</span>
                <span>-{formatCurrency(order.discount)}</span>
              </div>
            )}
            <div><span>Shipping</span><span>{order.shippingCharge === 0 ? 'Free' : formatCurrency(order.shippingCharge)}</span></div>
            <div><span>Total</span><span>{formatCurrency(order.totalAmount)}</span></div>
          </div>

          <OrderTimeline statusHistory={order.statusHistory} />
        </div>

        <div>
          <div>
            <h3><FiMapPin /> Shipping Address</h3>
            <p>{order.shippingAddress.fullName}</p>
            <p>{order.shippingAddress.addressLine1}</p>
            {order.shippingAddress.addressLine2 && <p>{order.shippingAddress.addressLine2}</p>}
            <p>{order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}</p>
            <p>Phone: {order.shippingAddress.phone}</p>
          </div>

          {order.trackingNumber && (
            <div>
              <h3>Tracking Information</h3>
              <p>Tracking Number: {order.trackingNumber}
                <button onClick={() => copyToClipboard(order.trackingNumber)}><FiCopy /></button>
              </p>
              <a href="https://www.indiapost.gov.in/_layouts/15/DOP.Portal.Tracking/TrackConsignment.aspx" target="_blank" rel="noopener noreferrer">
                Track on India Post
              </a>
              <Link to={`/track-order/${order._id}`}>Track Order</Link>
            </div>
          )}

          {order.paymentStatus === 'Pending' && bankDetails && (
            <div>
              <h3>Payment Details</h3>
              <p>Bank: {bankDetails.bankName}</p>
              <p>Account: {bankDetails.accountNumber}
                <button onClick={() => copyToClipboard(bankDetails.accountNumber)}><FiCopy /></button>
              </p>
              <p>IFSC: {bankDetails.ifsc}</p>
              <p>UPI: {bankDetails.upi}
                <button onClick={() => copyToClipboard(bankDetails.upi)}><FiCopy /></button>
              </p>
              <a href={`https://wa.me/${bankDetails.whatsapp?.replace('+', '')}`} target="_blank" rel="noopener noreferrer">
                Send Payment Proof on WhatsApp
              </a>
            </div>
          )}

          <div>
            <button onClick={handleDownloadInvoice}><FiDownload /> Download Invoice</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailPage;