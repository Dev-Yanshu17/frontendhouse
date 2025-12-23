import React from "react";
import { useNavigate } from "react-router-dom";
import { 
  FaBed, FaBath, FaRulerCombined, FaSearch, FaPhoneAlt, 
  FaChevronRight, FaMapMarkerAlt, FaStar, FaHome, 
  FaShieldAlt, FaUsers, FaChartLine, FaClock, 
  FaAward, FaHandshake, FaCalendarAlt, FaUserCheck 
} from "react-icons/fa";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();

  const handleViewProperty = (id) => {
    navigate(`/property/${id}`);
  };

  const featuredProperties = [
    {
      id: 1,
      title: "Luxury Family Home",
      location: "Townsville, USA",
      price: "$1,600,000",
      beds: 5,
      baths: 4,
      sqft: "3,200",
      image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600&auto=format&fit=crop",
      tag: "For Sale",
      rating: 3.5
      
    },
    {
      id: 2,
      title: "Modern Downtown Loft",
      location: "Los Angeles, CA",
      price: "$2,200,000",
      beds: 3,
      baths: 2,
      sqft: "2,400",
      image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=600&auto=format&fit=crop",
      tag: "Premium",
      rating: 4.8,
      reviews: 38
    },
    {
      id: 3,
      title: "Beachfront Villa",
      location: "Miami, Florida",
      price: "$3,300,000",
      beds: 6,
      baths: 5,
      sqft: "4,800",
      image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=600&auto=format&fit=crop",
      tag: "Luxury",
      rating: 4.9,
      reviews: 56
    },
    {
      id: 4,
      title: "Penthouse Suite",
      location: "New York, USA",
      price: "$5,500,000",
      beds: 4,
      baths: 4,
      sqft: "3,800",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&auto=format&fit=crop",
      tag: "Exclusive",
      rating: 5.0,
      reviews: 29
    },
  ];

  const services = [
    {
      icon: <FaHome />,
      title: "Property Management",
      description: "Comprehensive property management services for owners and investors"
    },
    {
      icon: <FaShieldAlt />,
      title: "Legal Assistance",
      description: "Expert legal guidance throughout your real estate transaction"
    },
    {
      icon: <FaChartLine />,
      title: "Investment Consulting",
      description: "Strategic advice for maximizing your real estate investments"
    },
    {
      icon: <FaUsers />,
      title: "Personalized Service",
      description: "Dedicated agents providing personalized attention to your needs"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Home Buyer",
      content: "DreamDwello made our home buying experience seamless. Their team was professional and attentive to every detail.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&auto=format&fit=crop"
    },
    {
      name: "Michael Chen",
      role: "Property Investor",
      content: "Exceptional investment guidance. They helped me build a portfolio that's grown 35% in just two years.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop"
    },
    {
      name: "Elena Rodriguez",
      role: "First-time Seller",
      content: "Sold my property above asking price in just 2 weeks! Highly recommend their marketing expertise.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop"
    }
  ];

  const stats = [
    { value: "500+", label: "Properties Sold", icon: <FaHome /> },
    { value: "$1.2B", label: "Total Value", icon: <FaChartLine /> },
    { value: "98%", label: "Client Satisfaction", icon: <FaUserCheck /> },
    { value: "25+", label: "Years Experience", icon: <FaAward /> }
  ];

  return (
    <div className="home-container">
      {/* ================= HERO SECTION ================= */}
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Find Your <span className="highlight">Dream Home</span> Today
            </h1>
            <p className="hero-description">
              Discover premium properties tailored to your lifestyle. From modern apartments to luxury villas, 
              we help you find the perfect place to call home.
            </p>
            
            {/* Search Bar */}
            {/* <div className="search-container">
              <div className="search-bar">
                <FaSearch className="search-icon" />
                <input 
                  type="text" 
                  placeholder="Type here to search properties, locations, or keywords..." 
                  className="search-input"
                />
                <button className="search-button">Search</button>
              </div>
              <div className="quick-filters">
                <span className="filter-tag">Apartments</span>
                <span className="filter-tag">Villas</span>
                <span className="filter-tag">For Sale</span>
                <span className="filter-tag">For Rent</span>
                <span className="filter-tag">Luxury</span>
              </div>
            </div> */}
            
            <div className="hero-buttons">
              <button 
                className="btn-primary" 
                onClick={() => navigate("/Properties")}
              >
                Browse All Properties
              </button>
              <button 
                className="btn-secondary"
                onClick={() => navigate("/Contact")}
              >
                <FaPhoneAlt className="btn-icon" /> Get Free Consultation
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ================= STATS SECTION ================= */}
      {/* <section className="stats-section">
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div className="stat-card" key={index}>
              <div className="stat-icon">{stat.icon}</div>
              <div className="stat-content">
                <h3>{stat.value}</h3>
                <p>{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </section> */}

      {/* ================= FEATURED PROPERTIES ================= */}
      <section className="featured-section">
        <div className="section-header">
          <h2 className="section-title">Featured Properties</h2>
          <p className="section-subtitle">Handpicked selection of premium properties</p>
        </div>
        
        <div className="featured-grid">
          {featuredProperties.map((property) => (
            <div className="property-card" key={property.id}>
              <div className="property-image-container">
                <img src={property.image} alt={property.title} className="property-image" />
                <span className="property-tag">{property.tag}</span>
                <div className="property-rating">
                  <FaStar className="star-icon" />
                  <span>{property.rating}</span>
                  {/* <span className="review-count">({property.reviews})</span> */}
                </div>
              </div>
              
              <div className="property-content">
                <div className="property-price">{property.price}</div>
                <h3 className="property-title">{property.title}</h3>
                
                <div className="property-location">
                  <FaMapMarkerAlt className="location-icon" />
                  <span>{property.location}</span>
                </div>
                
                <div className="property-features">
                  <div className="feature-item">
                    <FaBed className="feature-icon" />
                    <span className="feature-text">{property.beds} Beds</span>
                  </div>
                  <div className="feature-item">
                    <FaBath className="feature-icon" />
                    <span className="feature-text">{property.baths} Baths</span>
                  </div>
                  <div className="feature-item">
                    <FaRulerCombined className="feature-icon" />
                    <span className="feature-text">{property.sqft} sqft</span>
                  </div>
                </div>
                
                <button 
                  className="btn-view-details"
                  onClick={() => handleViewProperty(property.id)}
                >
                  View Details <FaChevronRight />
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="view-all-container">
          <button 
            className="btn-view-all"
            onClick={() => navigate("/Properties")}
          >
            View All Properties <FaChevronRight />
          </button>
        </div>
      </section>

      
      {/* ================= PROCESS SECTION ================= */}
      <section className="process-section">
        <div className="section-header">
          <h2 className="section-title">Our Simple Process</h2>
          <p className="section-subtitle">Four easy steps to your dream property</p>
        </div>
        
        <div className="process-steps">
          <div className="process-step">
            <div className="step-number">1</div>
            <h3>Consultation</h3>
            <p>Free personalized consultation to understand your needs</p>
          </div>
          <div className="process-step">
            <div className="step-number">2</div>
            <h3>Property Search</h3>
            <p>Curated property matches based on your preferences</p>
          </div>
          <div className="process-step">
            <div className="step-number">3</div>
            <h3>Viewings</h3>
            <p>Schedule and attend property viewings at your convenience</p>
          </div>
          <div className="process-step">
            <div className="step-number">4</div>
            <h3>Closing</h3>
            <p>Comprehensive support through closing and beyond</p>
          </div>
        </div>
      </section>

      {/* ================= CTA SECTION ================= */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Start Your Journey?</h2>
          <p>Schedule a free consultation with our expert real estate agents</p>
          <div className="cta-buttons">
            <button className="btn-cta-primary" onClick={() => navigate("/Contact")}>
              <FaPhoneAlt /> Book Free Consultation
            </button>
            <button className="btn-cta-secondary" onClick={() => navigate("/Properties")}>
              Browse Properties
            </button>
          </div>
          <div className="cta-info">
            <FaClock className="cta-info-icon" />
            <span>Available 7 days a week | Response within 24 hours</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
