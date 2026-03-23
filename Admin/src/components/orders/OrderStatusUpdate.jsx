import { useState } from 'react';
import { ORDER_STATUSES, PAYMENT_STATUSES } from '../../utils/helpers';

const OrderStatusUpdate = ({ order, onUpdate, loading }) => {
  const [orderStatus, setOrderStatus] = useState(order?.orderStatus || '');
  const [paymentStatus, setPaymentStatus] = useState(order?.paymentStatus || '');
  const [trackingNumber, setTrackingNumber] = useState(order?.trackingNumber || '');
  const [adminNotes, setAdminNotes] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {};
    if (orderStatus && orderStatus !== order?.orderStatus) data.orderStatus = orderStatus;
    if (paymentStatus && paymentStatus !== order?.paymentStatus) data.paymentStatus = paymentStatus;
    if (trackingNumber && trackingNumber !== order?.trackingNumber) data.trackingNumber = trackingNumber;
    if (adminNotes) data.adminNotes = adminNotes;

    if (Object.keys(data).length === 0) return;
    onUpdate(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Update Order</h3>
      <div>
        <div>
          <label>Order Status</label>
          <select value={orderStatus} onChange={(e) => setOrderStatus(e.target.value)}>
            {ORDER_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label>Payment Status</label>
          <select value={paymentStatus} onChange={(e) => setPaymentStatus(e.target.value)}>
            {PAYMENT_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>
      <div>
        <label>Tracking Number (India Post)</label>
        <input type="text" value={trackingNumber} onChange={(e) => setTrackingNumber(e.target.value)}
          placeholder="Enter India Post tracking number" />
      </div>
      <div>
        <label>Admin Notes</label>
        <textarea value={adminNotes} onChange={(e) => setAdminNotes(e.target.value)} rows={3}
          placeholder="Add notes about this update..." />
      </div>
      <button type="submit" disabled={loading}>
        {loading ? 'Updating...' : 'Update Order'}
      </button>
    </form>
  );
};

export default OrderStatusUpdate;