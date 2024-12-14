import React, { useEffect, useState } from 'react';

function Cart() {
  const [cartItems, setCartItems] = useState([]);

  // Fetch cart items
  useEffect(() => {
    fetch('http://localhost:5000/cart')
      .then((response) => response.json())
      .then((data) => setCartItems(data))
      .catch((error) => console.error('Error fetching cart:', error));
  }, []);

  // Remove item from cart
  const removeFromCart = (id) => {
    fetch(`http://localhost:5000/cart/${id}`, { method: 'DELETE' })
      .then(() => {
        setCartItems(cartItems.filter((item) => item.id !== id));
      });
  };

  // Calculate total price
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div>
      <h1>Your Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <p>{item.name} - ${item.price}</p>
              <button onClick={() => removeFromCart(item.id)}>Remove</button>
            </div>
          ))}
          <h3>Total: ${totalPrice.toFixed(2)}</h3>
          <a href="/checkout">
            <button>Proceed to Checkout</button>
          </a>
        </div>
      )}
    </div>
  );
};

export default Cart;
