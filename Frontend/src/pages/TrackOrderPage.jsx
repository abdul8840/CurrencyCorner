import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { trackOrder } from '../features/order/orderSlice';
import OrderTimeline from '../components/order/OrderTimeline';
import Loader from '../components/common/Loader';
import SEO from '../components/common/SEO';
import { FiCopy } from 'react-icons/fi';
import toast from 'react-hot-toast';

const TrackOrderPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { order, trackingInfo, loading } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(trackOrder(id));
  }, [id, dispatch]);

  if (loading) return <Loader />;

  return (
    <div>
      <SEO title="Track Order" />
      <h1>Track Your Order</h1>

      {order && (
        <div>
          <div>
            <p>Order: {order.orderNumber}</p>
            <p>Status: {order.orderStatus}</p>
          </div>

          {trackingInfo && (
            <div>
              <h2>Tracking Information</h2>
              <p>Carrier: {trackingInfo.carrier}</p>
              <p>Tracking Number: {trackingInfo.trackingNumber}
                <button onClick={() => {
                  navigator.clipboard.writeText(trackingInfo.trackingNumber);
                  toast.success('Copied!');
                }}><FiCopy /></button>
              </p>
              <a href={trackingInfo.trackingUrl} target="_blank" rel="noopener noreferrer">
                Track on India Post Website
              </a>
            </div>
          )}

          {!trackingInfo && (
            <div>
              <p>Tracking information is not yet available. It will be updated once your order is shipped.</p>
            </div>
          )}

          <OrderTimeline statusHistory={order.statusHistory} />

          <Link to={`/order/${id}`}>Back to Order Details</Link>
        </div>
      )}
    </div>
  );
};

export default TrackOrderPage;