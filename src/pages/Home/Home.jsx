import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import Navbar from "../../components/Navbar/Navbar";

const Home = () => {
  const navigate = useNavigate();

  const handleViewProperty = (id) => {
    navigate(`/property/${id}`);
  };

  return (
    <div className="home-container">
      {/* <Navbar /> */}

      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="hero-content">
          <p className="welcome">WELCOME TO DREAMDWELLO</p>
          <h1>
            Invest Today in <br /> Your Dream Home
          </h1>
          <p className="sub-text">
            Explore luxury homes, modern apartments, and premium real estate
            collections curated to match your lifestyle.
          </p>

          <div className="hero-buttons">
            <button
              className="btn-primary"
              onClick={() => navigate("/Properties")}
            >
              View Property
            </button>
            <button
              className="btn-outline"
              onClick={() => navigate("/Contact")}
            >
              Contact Now
            </button>
          </div>
        </div>

        {/* SEARCH BAR */}
        <div className="search-bar">
          
          <select>
             <option>Sell or rent</option>
            <option>Sell</option>
            <option>Rent</option>
          </select>
          <select>
            <option>Property Type</option>
            <option>Row-House</option>
            <option>Banglow</option>
            <option>Flates</option>
          </select>
          <select>
            <option>Location</option>
            <option>Surat</option>
            <option>Ahmaabad</option>
            <option>Vadodara</option>
          </select>
          <select>
            <option>Amenities</option>
          </select>
          <button className="btn-search">Search</button>
        </div>
      </section>

      {/* PROPERTY TYPES */}
      <section className="types-section">
        <h2>Explore Property Types</h2>
        <div className="type-grid">
          {[
            { label: "Row-Houses" },
            { label: "Flats" },
            { label: "Bungalow" },
          ].map((t, i) => (
            <div key={i} className="type-card">
              <div className="icon-circle"></div>
              <h3>{t.label}</h3>
              <p>22+ Properties</p>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED PROPERTIES */}
      <section className="featured-section">
        <h2>Featured Properties</h2>
        <div className="featured-grid">
          {[1, 2, 3].map((i) => (
            <div className="property-card" key={i}>
              <img
                src="https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800"
                alt="Property"
              />
              <div className="details">
                <span className="tag">Rent</span>
                <h3>Luxury Family House</h3>
                <p>New York, USA</p>

                <div className="icons-row">
                  <span>🛏 6 Bedroom</span>
                  <span>🛁 6 Bathroom</span>
                </div>

                <div className="card-footer">
                  <h4>$160,000</h4>
                  <button
                    className="btn-primary-small"
                    onClick={() => handleViewProperty(i)}
                  >
                    View Property
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
