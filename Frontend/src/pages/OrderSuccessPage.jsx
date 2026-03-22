import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrderById } from '../features/order/orderSlice';
import OrderSuccess from '../components/checkout/OrderSuccess';
import Loader from '../components/common/Loader';
import SEO from '../components/common/SEO';

const OrderSuccessPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { order, bankDetails, loading } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(fetchOrderById(id));
  }, [id, dispatch]);

  if (loading || !order) return <Loader />;

  return (
    <div>
      <SEO title="Order Placed" />
      <OrderSuccess order={order} bankDetails={bankDetails} />
    </div>
  );
};

export default OrderSuccessPage;