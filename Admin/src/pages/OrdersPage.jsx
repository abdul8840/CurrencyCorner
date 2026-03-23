import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchOrders } from '../features/orders/adminOrderSlice';
import Pagination from '../components/common/Pagination';
import Loader from '../components/common/Loader';
import { formatCurrency, formatDateTime, ORDER_STATUSES, PAYMENT_STATUSES } from '../utils/helpers';
import { FiEye } from 'react-icons/fi';

const OrdersPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { orders, totalOrders, page, pages, loading } = useSelector((state) => state.adminOrder);
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState('');
  const [paymentFilter, setPaymentFilter] = useState('');

  useEffect(() => {
    const params = { page: currentPage };
    if (statusFilter) params.status = statusFilter;
    if (paymentFilter) params.paymentStatus = paymentFilter;
    dispatch(fetchOrders(params));
  }, [dispatch, currentPage, statusFilter, paymentFilter]);

  if (loading) return <Loader />;

  return (
    <div>
      <h1>Orders ({totalOrders})</h1>

      <div>
        <select value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}>
          <option value="">All Statuses</option>
          {ORDER_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <select value={paymentFilter} onChange={(e) => { setPaymentFilter(e.target.value); setCurrentPage(1); }}>
          <option value="">All Payments</option>
          {PAYMENT_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      <div>
        <table>
          <thead>
            <tr>
              <th>Order #</th>
              <th>Customer</th>
              <th>Items</th>
              <th>Total</th>
              <th>Order Status</th>
              <th>Payment</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order.orderNumber}</td>
                <td>
                  <div>
                    <p>{order.user?.name || 'N/A'}</p>
                    <p>{order.user?.email}</p>
                  </div>
                </td>
                <td>{order.items?.length || 0}</td>
                <td>{formatCurrency(order.totalAmount)}</td>
                <td><span>{order.orderStatus}</span></td>
                <td><span>{order.paymentStatus}</span></td>
                <td>{formatDateTime(order.createdAt)}</td>
                <td>
                  <button onClick={() => navigate(`/orders/${order._id}`)}><FiEye /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination page={page} pages={pages} onPageChange={setCurrentPage} />
    </div>
  );
};

export default OrdersPage;