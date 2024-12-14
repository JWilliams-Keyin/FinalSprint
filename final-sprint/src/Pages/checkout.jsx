import React, { useState } from 'react';
import OrderButton from '../Components/orderButton'

function Checkout() {
  const [isCheckedOut, setIsCheckedOut] = useState(false);

  const handleCheckout = () => {
    setIsCheckedOut(true);
  };

  return (
    <div>
      <h1>Checkout</h1>
      {isCheckedOut ? (
        <p>Thank you for your order! Your purchase has been confirmed.</p>
      ) : (
        <div>
          <p>Please review your cart and proceed to complete the purchase.</p>
          <OrderButton onClick = {handleCheckout}>Place Order</OrderButton>
        </div>
      )}
    </div>
  );
};

export default Checkout;
