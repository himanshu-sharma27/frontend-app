import "./Footer.css";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="app-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <span className="footer-brand-dot" />
          RoadHouse Coffee
        </div>

        <p className="footer-copy">© {new Date().getFullYear()} RoadHouse Coffee. All rights reserved.</p>

        <ul className="footer-links">
          <li><Link to="/">Shop</Link></li>
          <li><Link to="/orders">Orders</Link></li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
