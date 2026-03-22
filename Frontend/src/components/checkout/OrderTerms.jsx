const OrderTerms = ({ accepted, onAcceptChange }) => {
  return (
    <div>
      <h3>Terms & Conditions</h3>
      <div>
        <p>1. All items are collectible currencies/coins sold as-is based on the described condition.</p>
        <p>2. Payment must be completed via bank transfer or UPI within 24 hours of placing the order.</p>
        <p>3. After payment, send payment proof screenshot via WhatsApp for verification.</p>
        <p>4. Orders will be shipped via India Post within 2-3 business days after payment verification.</p>
        <p>5. Tracking number will be provided once the order is shipped.</p>
        <p>6. Returns are accepted within 7 days if the item significantly differs from the description.</p>
        <p>7. Shipping charges are non-refundable.</p>
        <p>8. Free shipping on orders above ₹500.</p>
      </div>
      <label>
        <input
          type="checkbox"
          checked={accepted}
          onChange={(e) => onAcceptChange(e.target.checked)}
        />
        I have read and agree to the terms and conditions
      </label>
    </div>
  );
};

export default OrderTerms;