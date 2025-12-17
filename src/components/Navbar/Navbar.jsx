import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css";
import logo from "../../images/logo_removed_bg.png";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  /* =========================
     RESPONSIVE HANDLER
  ========================= */
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /* =========================
     LOGO CLICK (NO REFRESH)
  ========================= */
  const handleLogoClick = () => {
    setMenuOpen(false);

    // ✅ CASE 1: Already on Home → ONLY scroll to top
    if (location.pathname === "/") {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
      return; // 🚫 STOP HERE (NO NAVIGATION)
    }

    // ✅ CASE 2: On another page → Navigate to Home
    navigate("/");
  };

  return (
    <nav className="navbar">
      {/* =========================
          LOGO (NO LINK)
      ========================= */}
      <div className="logo" onClick={handleLogoClick}>
        <img src={logo} alt="DreamDwello Logo" className="logo-icon" />
        <div className="typing-container">
          <span className="typing-text">
            Find your dream home today.
          </span>
        </div>
      </div>

      {/* =========================
          DESKTOP MENU
      ========================= */}
      {!isMobile ? (
        <ul className="nav-links">
          {[
            { path: "/", label: "Home" },
            { path: "/properties", label: "Properties" },
            { path: "/services", label: "Services" },
            { path: "/about", label: "About" },
            { path: "/contact", label: "Contact" }
          ].map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={location.pathname === item.path ? "active" : ""}
              >
                {item.label}
              </Link>
            </li>
          ))}

          <li>
            <Link to="/login" className="login-btn">
              Login
            </Link>
          </li>
        </ul>
      ) : (
        <>
          {/* =========================
              HAMBURGER
          ========================= */}
          <button
            className={`hamburger ${menuOpen ? "open" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          {/* =========================
              MOBILE MENU
          ========================= */}
          <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
            {[
              { path: "/", label: "Home" },
              { path: "/properties", label: "Properties" },
              { path: "/services", label: "Services" },
              { path: "/about", label: "About" },
              { path: "/contact", label: "Contact" },
              { path: "/login", label: "Login" }
            ].map((item) => (
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
