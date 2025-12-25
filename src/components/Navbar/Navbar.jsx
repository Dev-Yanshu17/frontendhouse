import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css";
import logo from "../../images/logo_removed_bg.png";
import { FaPhoneAlt} from "react-icons/fa";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  /* ================= RESPONSIVE ================= */
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /* ================= LOGO CLICK ================= */
  const handleLogoClick = () => {
    setMenuOpen(false);
    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/");
    }
  };

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/properties", label: "Properties" },
    { path: "/about", label: "About" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <nav className="navbar">
      {/* LOGO */}
      <div className="logo" onClick={handleLogoClick}>
        <img src={logo} alt="DreamDwello Logo" className="logo-icon" />
        <div className="typing-container">
          <span className="typing-text">Find your dream home today.</span>
        </div>
      </div>

      {/* DESKTOP VIEW */}
      {!isMobile ? (
        <>
          {/* NAV LINKS */}
          <ul className="nav-links">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={location.pathname === item.path ? "active" : ""}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* RIGHT SIDE ACTIONS */}
          <div className="nav-actions">
            {/* CALL FOR INQUIRY */}
            <a href="tel:+917859845311" className="call-box">
              <FaPhoneAlt className="contact-icon" />
              <div className="call-text">
                <span className="call-number">+7859845311</span>
                <span>Call for Inquiry</span>
              </div>
            </a>

            {/* APPOINTMENT BUTTON */}
            <button
              className="appointment-btn"
              onClick={() => navigate("/appointment")}
            >
              <i className="fas fa-paper-plane"></i>
              Appointment
            </button>
          </div>
        </>
      ) : (
        <>
          {/* HAMBURGER */}
          <button
            className={`hamburger ${menuOpen ? "open" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          {/* MOBILE MENU */}
          <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={location.pathname === item.path ? "active" : ""}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </nav>
  );
};

export default Navbar;
