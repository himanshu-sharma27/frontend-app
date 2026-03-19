import { useContext, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AppContext } from "../App";
import axios from "axios";
import "./Cart.css";

function Cart() {
  const { cart, setCart, user } = useContext(AppContext);
  const [orderValue, setOrderValue] = useState(0);
  const [placing, setPlacing] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const increment = (id) => {
    setCart(cart.map((item) =>
      item._id === id ? { ...item, quantity: item.quantity + 1 } : item
    ));
  };

  const decrement = (id) => {
    setCart(cart.map((item) =>
      item._id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    ).filter((item) => item.quantity > 0));
  };

  const remove = (id) => {
    setCart(cart.filter((item) => item._id !== id));
  };

  useEffect(() => {
    setOrderValue(
      cart.reduce((sum, item) => sum + item.quantity * item.price, 0)
    );
  }, [cart]);

  const placeOrder = async () => {
    if (!user?.email) return navigate("/login");
    setPlacing(true);
    try {
      const url = `${API_URL}/orders`;
      const order = {
        email: user.email,
        items: cart,
        orderValue,
        orderDate: Date.now(),
      };
      await axios.post(url, order, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setCart([]);
      navigate("/orders");
    } finally {
      setPlacing(false);
    }
  };

  const isEmpty = !cart || cart.length === 0;

  return (
    <main className="cart-page">
      <div className="container">

        <div className="page-header">
          <h1 className="page-title">Your Cart</h1>
          {!isEmpty && (
            <p className="page-subtitle">{cart.length} item{cart.length !== 1 ? "s" : ""}</p>
          )}
        </div>

        {isEmpty ? (
          <div className="empty-state">
            <div className="empty-state-icon">🛒</div>
            <p className="empty-state-title">Your cart is empty</p>
            <p className="empty-state-desc">
              Looks like you haven't added anything yet. Explore the store and find something you love.
            </p>
            <Link to="/" className="btn btn-primary btn-lg" style={{ marginTop: "8px" }}>
              Continue shopping
            </Link>
          </div>
        ) : (
          <div className="cart-layout">

            {/* Cart Items */}
            <div className="cart-items-section">
              {cart.map((item) => (
                <div className="cart-item" key={item._id}>
                  <div className="cart-item-thumb">
                    {item.imageUrl && (
                      <img src={`${API_URL}/${item.imageUrl}`} alt={item.name} />
                    )}
                  </div>

                  <div className="cart-item-info">
                    <p className="cart-item-name">{item.name}</p>
                    <p className="cart-item-unit-price">₹{item.price.toLocaleString()} each</p>
                  </div>

                  <div className="cart-item-controls">
                    <div className="qty-control">
                      <button
                        className="qty-btn"
                        onClick={() => decrement(item._id)}
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span className="qty-value">{item.quantity}</span>
                      <button
                        className="qty-btn"
                        onClick={() => increment(item._id)}
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>

                    <span className="cart-item-subtotal">
                      ₹{(item.quantity * item.price).toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <aside className="cart-summary">
              <p className="cart-summary-title">Order Summary</p>

              <div className="cart-summary-rows">
                <div className="cart-summary-row">
                  <span className="cart-summary-row-label">Subtotal</span>
                  <span className="cart-summary-row-value">₹{orderValue.toLocaleString()}</span>
                </div>
                <div className="cart-summary-row">
                  <span className="cart-summary-row-label">Shipping</span>
                  <span className="cart-summary-row-value" style={{ color: "var(--color-success)" }}>Free</span>
                </div>
                <div className="cart-summary-row">
                  <span className="cart-summary-row-label">Taxes</span>
                  <span className="cart-summary-row-value">Calculated at checkout</span>
                </div>
              </div>

              <div className="cart-summary-divider" />

              <div className="cart-summary-total">
                <span className="cart-summary-total-label">Total</span>
                <span className="cart-summary-total-value">₹{orderValue.toLocaleString()}</span>
              </div>

              <button
                className="cart-checkout-btn"
                onClick={placeOrder}
                disabled={placing}
              >
                {placing
                  ? "Placing order…"
                  : user?.email
                  ? "Place Order"
                  : "Sign in to Order"}
              </button>

              <p className="cart-note">
                <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                  <path d="M5.5 0.5a5 5 0 100 10 5 5 0 000-10zm0 2.2a.7.7 0 110 1.4.7.7 0 010-1.4zm.7 5.6H4.8V4.8h1.4v3.5z" fill="currentColor"/>
                </svg>
                Secure checkout · Free returns
              </p>
            </aside>

          </div>
        )}

      </div>
    </main>
  );
}

export default Cart;
