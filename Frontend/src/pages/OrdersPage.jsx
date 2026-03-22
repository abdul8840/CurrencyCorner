import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMyOrders } from '../features/order/orderSlice';
import OrderCard from '../components/order/OrderCard';
import Pagination from '../components/common/Pagination';
import ProfileSidebar from '../components/profile/ProfileSidebar';
import Loader from '../components/common/Loader';
import EmptyState from '../components/common/EmptyState';
import SEO from '../components/common/SEO';
import { FiPackage } from 'react-icons/fi';

const OrdersPage = () => {
  const dispatch = useDispatch();
  const { orders, totalOrders, page, pages, loading } = useSelector((state) => state.order);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchMyOrders({ page: currentPage }));
  }, [dispatch, currentPage]);

  return (
    <div>
      <SEO title="My Orders" />
      <div>
        <ProfileSidebar />
        <div>
          <h1>My Orders ({totalOrders})</h1>
          {loading ? (
            <Loader />
          ) : orders.length === 0 ? (
            <EmptyState
              icon={<FiPackage />}
              title="No Orders Yet"
              message="You haven't placed any orders yet."
              actionText="Start Shopping"
              actionLink="/shop"
            />
          ) : (
            <>
              {orders.map((order) => (
                <OrderCard key={order._id} order={order} />
              ))}
              <Pagination page={page} pages={pages} onPageChange={setCurrentPage} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;