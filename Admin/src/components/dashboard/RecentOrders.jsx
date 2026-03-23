import { Link } from 'react-router-dom';
import { formatCurrency, formatDateTime, getStatusColor } from '../../utils/helpers';

const RecentOrders = ({ orders }) => {
  if (!orders || orders.length === 0) return <p>No recent orders</p>;

  return (
    <div>
      <div>
        <h3>Recent Orders</h3>
        <Link to="/orders">View All</Link>
      </div>
      <table>
        <thead>
          <tr>
            <th>Order</th>
            <th>Customer</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>
                <Link to={`/orders/${order._id}`}>#{order.orderNumber}</Link>
              </td>
              <td>{order.user?.name || 'N/A'}</td>
              <td>{formatCurrency(order.totalAmount)}</td>
              <td><span>{order.orderStatus}</span></td>
              <td>{formatDateTime(order.createdAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentOrders;