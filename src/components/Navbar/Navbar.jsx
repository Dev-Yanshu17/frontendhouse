import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";
import logo from "../../images/logo_removed_bg.png";

const Navbar = () => {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <img src={logo} alt="logo" className="logo-icon" />
        <div className="typing-container">
          <span className="typing-text">Find your dream home today.</span>
        </div>
      </div>

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
            <Link 
              to="/login" 
              className={`login-btn ${location.pathname === "/login" ? "active" : ""}`}
            >
              Login
            </Link>
          </li>
        </ul>
      ) : (
        <>
          <button 
            className={`hamburger ${menuOpen ? "open" : ""}`}
            onClick={toggleMenu}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "10px",
              zIndex: 1000
            }}
          >
            <span style={{
              display: "block",
              width: "25px",
              height: "3px",
              background: "#fff",
              margin: "5px 0",
              transition: "0.3s",
              transform: menuOpen ? "rotate(45deg) translate(5px, 5px)" : "none"
            }}></span>
            <span style={{
              display: "block",
              width: "25px",
              height: "3px",
              background: "#fff",
              margin: "5px 0",
              transition: "0.3s",
              opacity: menuOpen ? 0 : 1
            }}></span>
            <span style={{
              display: "block",
              width: "25px",
              height: "3px",
              background: "#fff",
              margin: "5px 0",
              transition: "0.3s",
              transform: menuOpen ? "rotate(-45deg) translate(7px, -6px)" : "none"
            }}></span>
          </button>
          
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