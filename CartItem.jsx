import { useDispatch, useSelector } from 'react-redux';
import {
  clearCart,
  decreaseItemQuantity,
  increaseItemQuantity,
  removeItemFromCart,
} from './CartSlice';

const CartItem = ({ onNavigate }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <main className="shopping-cart">
      <div className="section-heading">
        <p>Cart</p>
        <h2>Your Shopping Cart</h2>
      </div>

      <div className="cart-summary">
        <span>Total plants: {totalQuantity}</span>
        <strong>Total: ${totalAmount.toFixed(2)}</strong>
      </div>

      {cartItems.length === 0 ? (
        <p className="empty-cart">Your cart is empty.</p>
      ) : (
        <ul className="cart-items">
          {cartItems.map((item) => (
            <li key={item.id} className="cart-item">
              <img src={item.thumbnail} alt={item.name} />
              <div className="cart-item-details">
                <h3>{item.name}</h3>
                <p>Unit price: ${item.price.toFixed(2)}</p>
                <p>Item total: ${(item.price * item.quantity).toFixed(2)}</p>
              </div>
              <div className="quantity-controls">
                <button onClick={() => dispatch(decreaseItemQuantity(item.id))}>
                  -
                </button>
                <span>{item.quantity}</span>
                <button onClick={() => dispatch(increaseItemQuantity(item.id))}>
                  +
                </button>
              </div>
              <button
                className="remove-item-btn"
                onClick={() => dispatch(removeItemFromCart(item.id))}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className="cart-actions">
        <button className="clear-cart-btn" onClick={() => dispatch(clearCart())}>
          Clear Cart
        </button>
        <button className="checkout-btn" onClick={() => alert('Coming Soon')}>
          Checkout
        </button>
        <button className="continue-btn" onClick={() => onNavigate('plants')}>
          Continue Shopping
        </button>
      </div>
    </main>
  );
};

export default CartItem;
