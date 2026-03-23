import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrderById, updateOrderStatus, downloadInvoice } from '../features/orders/adminOrderSlice';
import OrderStatusUpdate from '../components/orders/OrderStatusUpdate';
import OrderInvoice from '../components/orders/OrderInvoice';
import Loader from '../components/common/Loader';
import { formatCurrency, formatDate, formatDateTime } from '../utils/helpers';
import { FiMapPin, FiUser, FiMail, FiPhone } from 'react-icons/fi';
import toast from 'react-hot-toast';

const OrderDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { order, loading } = useSelector((state) => state.adminOrder);

  useEffect(() => {
    dispatch(fetchOrderById(id));
  }, [id, dispatch]);

  const handleStatusUpdate = (data) => {
    dispatch(updateOrderStatus({ id, data }))
      .unwrap()
      .then(() => toast.success('Order updated successfully'))
      .catch((err) => toast.error(err));
  };

  const handleInvoiceDownload = () => {
    dispatch(downloadInvoice(id));
  };

  if (loading || !order) return <Loader />;

  return (
    <div>
      <div>
        <h1>Order #{order.orderNumber}</h1>
        <p>Placed on {formatDate(order.createdAt)}</p>
      </div>

      <div>
        <div>
          <div>
            <h2>Order Items</h2>
            {order.items?.map((item, index) => (
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

          <div>
            <h3>Status History</h3>
            {order.statusHistory?.map((entry, index) => (
              <div key={index}>
                <span>{entry.status}</span>
                <span>{formatDateTime(entry.date)}</span>
                {entry.note && <p>{entry.note}</p>}
              </div>
            ))}
          </div>
        </div>

        <div>
          <div>
            <h3><FiUser /> Customer</h3>
            <p>{order.user?.name}</p>
            <p><FiMail /> {order.user?.email}</p>
            {order.user?.phone && <p><FiPhone /> {order.user.phone}</p>}
          </div>

          <div>
            <h3><FiMapPin /> Shipping Address</h3>
            <p>{order.shippingAddress?.fullName}</p>
            <p>{order.shippingAddress?.phone}</p>
            <p>{order.shippingAddress?.addressLine1}</p>
            {order.shippingAddress?.addressLine2 && <p>{order.shippingAddress.addressLine2}</p>}
            <p>{order.shippingAddress?.city}, {order.shippingAddress?.state} - {order.shippingAddress?.pincode}</p>
          </div>

          {order.trackingNumber && (
            <div>
              <h3>Tracking</h3>
              <p>Number: {order.trackingNumber}</p>
              <a href="https://www.indiapost.gov.in/_layouts/15/DOP.Portal.Tracking/TrackConsignment.aspx"
                target="_blank" rel="noopener noreferrer">Track on India Post</a>
            </div>
          )}

          {order.notes && (
            <div>
              <h3>Customer Notes</h3>
              <p>{order.notes}</p>
            </div>
          )}

          {order.adminNotes && (
            <div>
              <h3>Admin Notes</h3>
              <p>{order.adminNotes}</p>
            </div>
          )}

          <OrderInvoice order={order} onDownload={handleInvoiceDownload} />
          <OrderStatusUpdate order={order} onUpdate={handleStatusUpdate} loading={loading} />
        </div>
      </div>
    </div>
  );
};

export default OrderDetailPage;