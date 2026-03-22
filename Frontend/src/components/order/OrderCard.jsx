import { Link } from 'react-router-dom';
import { formatCurrency, formatDate, getStatusColor } from '../../utils/helpers';

const OrderCard = ({ order }) => {
  return (
    <div>
      <div>
        <div>
          <p>Order #{order.orderNumber}</p>
          <p>{formatDate(order.createdAt)}</p>
        </div>
        <span className={getStatusColor(order.orderStatus)}>{order.orderStatus}</span>
      </div>
      <div>
        {order.items.slice(0, 3).map((item, index) => (
          <div key={index}>
            <img src={item.image || '/placeholder.png'} alt={item.name} />
            <div>
              <p>{item.name}</p>
              <p>Qty: {item.quantity} × {formatCurrency(item.price)}</p>
            </div>
          </div>
        ))}
        {order.items.length > 3 && <p>+{order.items.length - 3} more items</p>}
      </div>
      <div>
        <div>
          <span>Total: {formatCurrency(order.totalAmount)}</span>
          <span className={getStatusColor(order.paymentStatus)}>Payment: {order.paymentStatus}</span>
        </div>
        <div>
          <Link to={`/order/${order._id}`}>View Details</Link>
          {order.trackingNumber && (
            <Link to={`/track-order/${order._id}`}>Track Order</Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderCard;