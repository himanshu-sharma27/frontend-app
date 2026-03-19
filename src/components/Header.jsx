import "./Header.css";
import { Link, useLocation } from "react-router-dom";
import { AppContext } from "../App";
import { useContext, useEffect, useState } from "react";

function Header() {
  const { user, cart } = useContext(AppContext);
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  const cartCount = cart?.reduce((sum, item) => sum + item.quantity, 0) || 0;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path) =>
    path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);

  return (
    <header className={`app-header${scrolled ? " scrolled" : ""}`}>
      <div className="header-inner">

        {/* Brand */}
        <Link to="/" className="header-brand">
          <div className="header-brand-icon">
            <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 4a2 2 0 012-2h8a2 2 0 012 2v1H2V4zM2 7h12v5a2 2 0 01-2 2H4a2 2 0 01-2-2V7z" fill="currentColor"/>
            </svg>
          </div>
          <span className="header-brand-name">RoadHouse Coffee</span>
          
        </Link>

        {/* Nav */}
        <nav>
          <ul className="header-nav">
            <li>
              <Link to="/" className={`header-nav-link${isActive("/") ? " active" : ""}`}>
                <span className="nav-label">Shop</span>
              </Link>
            </li>
            <li>
              <Link to="/cart" className={`header-cart-link${isActive("/cart") ? " active" : ""}`}>
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                  <path d="M0.5 1.5h2l2 8h7l2-6H4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="6" cy="12.5" r="1" fill="currentColor"/>
                  <circle cx="11" cy="12.5" r="1" fill="currentColor"/>
                </svg>
                <span className="nav-label">Cart</span>
                {cartCount > 0 && (
                  <span className="cart-badge" key={cartCount}>{cartCount}</span>
                )}
              </Link>
            </li>

            {user?.email ? (
              <>
                <li>
                  <Link to="/orders" className={`header-nav-link${isActive("/orders") ? " active" : ""}`}>
                    <span className="nav-label">Orders</span>
                  </Link>
                </li>
                <li>
                  <Link to="/logout" className="header-auth-btn">
                    Sign out
                  </Link>
                </li>
              </>
            ) : (
              <li>
                <Link to="/login" className="header-auth-btn">
                  Sign in
                </Link>
              </li>
            )}
          </ul>
        </nav>

      </div>
    </header>
  );
}

export default Header;
