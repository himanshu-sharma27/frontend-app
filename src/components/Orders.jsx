/* Orders.jsx */
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../App";
import axios from "axios";
import "./Orders.css";

function Orders() {
  const API_URL = import.meta.env.VITE_API_URL;
  const { user } = useContext(AppContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const url = `${API_URL}/orders/${user.email}`;
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setOrders(response.data);
    } catch (err) {
      console.log("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <main className="orders-page">
      <div className="container">

        <div className="page-header">
          <h1 className="page-title">Order History</h1>
          <p className="page-subtitle">Track and manage your previous orders</p>
        </div>

        {loading ? (
          <p style={{ color: "var(--color-text-tertiary)", fontSize: "var(--text-sm)" }}>
            Loading orders…
          </p>
        ) : orders.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">📦</div>
            <p className="empty-state-title">No orders yet</p>
            <p className="empty-state-desc">
              When you place an order, it will show up here.
            </p>
          </div>
        ) : (
          <div className="orders-list">
            {orders.map((order, i) => (
              <div
                className="order-card"
                key={order._id}
                style={{ animationDelay: `${i * 0.06}s` }}
              >
                <div className="order-header">
                  <div className="order-meta">
                    <span className="order-id">Order #{order._id?.slice(-8).toUpperCase()}</span>
                    <span className="order-date">{formatDate(order.orderDate)}</span>
                  </div>
                  <span className="order-status order-status-delivered">Delivered</span>
                </div>

                <div className="order-items">
                  {order.items.map((item) => (
                    <div className="order-item-row" key={item._id}>
                      <span className="order-item-name">{item.name}</span>
                      <span className="order-item-qty">× {item.quantity}</span>
                      <span className="order-item-price">
                        ₹{(item.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="order-footer">
                  <span className="order-total-label">Order total</span>
                  <span className="order-total-value">
                    ₹{order.orderValue.toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </main>
  );
}

export default Orders;
