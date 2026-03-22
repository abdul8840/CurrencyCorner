import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { updateCartItem, removeFromCart } from '../../features/cart/cartSlice';
import { formatCurrency } from '../../utils/helpers';
import { FiMinus, FiPlus, FiTrash2 } from 'react-icons/fi';
import toast from 'react-hot-toast';

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity < 1) return;
    dispatch(updateCartItem({ productId: item.product._id, quantity: newQuantity }))
      .unwrap()
      .catch((err) => toast.error(err));
  };

  const handleRemove = () => {
    dispatch(removeFromCart(item.product._id))
      .unwrap()
      .then(() => toast.success('Item removed from cart'))
      .catch((err) => toast.error(err));
  };

  return (
    <div>
      <img src={item.product?.images?.[0]?.url || '/placeholder.png'} alt={item.product?.name} />
      <div>
        <Link to={`/product/${item.product?.slug}`}>
          <h3>{item.product?.name}</h3>
        </Link>
        <p>{formatCurrency(item.price)}</p>
      </div>
      <div>
        <button onClick={() => handleQuantityChange(item.quantity - 1)}><FiMinus /></button>
        <span>{item.quantity}</span>
        <button onClick={() => handleQuantityChange(item.quantity + 1)}><FiPlus /></button>
      </div>
      <div>
        <p>{formatCurrency(item.price * item.quantity)}</p>
      </div>
      <button onClick={handleRemove}><FiTrash2 /></button>
    </div>
  );
};

export default CartItem;