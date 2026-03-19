import { useState, useEffect, useContext } from "react";
import { AppContext } from "../App";
import axios from "axios";
import "./Content.css";

const API_URL = import.meta.env.VITE_API_URL;

function Content() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { cart, setCart } = useContext(AppContext);

  const fetchProducts = async () => {
    try {
      const url = `${API_URL}/store`;
      const res = await axios.get(url);
      setProducts(res.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addToCart = (product) => {
    const found = cart.find((item) => item._id === product._id);
    if (!found) {
      product.quantity = 1;
      setCart([...cart, product]);
    }
  };

  const isInCart = (id) => cart.some((item) => item._id === id);

  return (
    <main className="store-page">
      <div className="container">

        {/* Hero Section */}
        <div className="store-hero">
          <span className="store-hero-eyebrow">From Our Kitchen</span>
          <h1 className="store-hero-title">
            Brewed with passion, <em>thoughtfully</em> served with warmth.
          </h1>
          <p className="store-hero-desc">
            From rich espresso to comforting bites, we bring you flavors that feel like home.
          </p>
        </div>

        {/* Section Header */}
        {!loading && (
          <div className="section-header">
            <span className="section-title">All Products</span>
            <span className="section-count">{products.length} items</span>
          </div>
        )}

        {/* Product Grid */}
        {loading ? (
          <div className="product-grid">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="product-skeleton">
                <div className="skeleton-image" />
              </div>
            ))}
          </div>
        ) : (
          <div className="product-grid">
            {products.map((product) => (
              <div className="product-card" key={product._id}>

                <div className="product-image-wrap">
                  <img
                    src={`${API_URL}/${product.imageUrl}`}
                    alt={product.name}
                    loading="lazy"
                  />
                </div>

                <div className="product-body">
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-desc">{product.desc}</p>
                </div>

                <div className="product-footer">
                  <div className="product-price">
                    <span className="product-price-currency">₹</span>
                    {product.price.toLocaleString()}
                  </div>
                  <button
                    className={`add-to-cart-btn${isInCart(product._id) ? " in-cart" : ""}`}
                    onClick={() => addToCart(product)}
                    disabled={isInCart(product._id)}
                  >
                    {isInCart(product._id) ? (
                      <>
                        <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                          <path d="M2 6.5l3.5 3.5L11 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        Added
                      </>
                    ) : (
                      "Add to Cart"
                    )}
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </main>
  );
}

export default Content;
