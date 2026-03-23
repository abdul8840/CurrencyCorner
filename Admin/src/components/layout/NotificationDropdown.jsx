import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchNewOrders, markOrderViewed, markAllOrdersViewed } from '../../features/orders/adminOrderSlice';
import { formatDateTime, formatCurrency } from '../../utils/helpers';
import { FiBell, FiX } from 'react-icons/fi';

const NotificationDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { newOrders, newOrderCount } = useSelector((state) => state.adminOrder);
  const dropdownRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    dispatch(fetchNewOrders());
    intervalRef.current = setInterval(() => {
      dispatch(fetchNewOrders());
    }, 30000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [dispatch]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleOrderClick = (orderId) => {
    dispatch(markOrderViewed(orderId));
    navigate(`/orders/${orderId}`);
    setIsOpen(false);
  };

  const handleMarkAllRead = () => {
    dispatch(markAllOrdersViewed());
  };

  return (
    <div ref={dropdownRef}>
      <button onClick={() => setIsOpen(!isOpen)}>
        <FiBell />
        {newOrderCount > 0 && <span>{newOrderCount}</span>}
      </button>

      {isOpen && (
        <div>
          <div>
            <h3>New Orders</h3>
            {newOrderCount > 0 && (
              <button onClick={handleMarkAllRead}>Mark all read</button>
            )}
          </div>
          <div>
            {newOrders.length === 0 ? (
              <p>No new orders</p>
            ) : (
              newOrders.map((order) => (
                <div key={order._id} onClick={() => handleOrderClick(order._id)}>
                  <div>
                    <p>#{order.orderNumber}</p>
                    <p>{order.user?.name}</p>
                  </div>
                  <div>
                    <span>{formatCurrency(order.totalAmount)}</span>
                    <span>{formatDateTime(order.createdAt)}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;