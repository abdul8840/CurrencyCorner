import { formatCurrency } from '../../utils/helpers';

const CartSummary = ({ cart, discount, shippingCharge }) => {
  const subtotal = cart?.totalPrice || 0;
  const shipping = shippingCharge !== undefined ? shippingCharge : (subtotal >= 500 ? 0 : 50);
  const total = subtotal - (discount || 0) + shipping;

  return (
    <div>
      <h3>Order Summary</h3>
      <div>
        <div>
          <span>Subtotal ({cart?.totalItems || 0} items)</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>
        {discount > 0 && (
          <div>
            <span>Discount</span>
            <span>-{formatCurrency(discount)}</span>
          </div>
        )}
        <div>
          <span>Shipping</span>
          <span>{shipping === 0 ? 'Free' : formatCurrency(shipping)}</span>
        </div>
        {subtotal < 500 && subtotal > 0 && (
          <p>Add {formatCurrency(500 - subtotal)} more for free shipping</p>
        )}
        <div>
          <span>Total</span>
          <span>{formatCurrency(total)}</span>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;