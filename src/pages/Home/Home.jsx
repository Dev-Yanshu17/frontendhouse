import React, { useEffect, useState } from "react";
import "./Home.css";
import {
  FaSearch,
  FaHome,
  FaShieldAlt,
  FaAward,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaSpinner,
  FaExclamationCircle,
  FaChevronRight,
  FaChevronLeft
} from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
const [testimonials, setTestimonials] = useState([]);
const [testimonialIndex, setTestimonialIndex] = useState(0);




  const navigate = useNavigate();

  /* ================= SLIDER DATA ================= */
  const slides = [
    {
      id: "slide1",
      title: "Find your dream home today.",
      subtitle: "Luxury Properties • Prime Locations • Trusted Developers"
    },
    {
      id: "slide2",
      title: "Premium Real Estate",
      subtitle: "Exclusive Listings • Best Deals • Professional Service"
    },
    {
      id: "slide3",
      title: "Live in Luxury",
      subtitle: "Modern Designs • Premium Amenities • Sustainable Living"
    }
  ];

  /* ================= WHY CHOOSE US ================= */
  const features = [
    { icon: <FaShieldAlt />, title: "Trusted Developers", desc: "Verified and reputable builders" },
    { icon: <FaAward />, title: "Transparent Pricing", desc: "No hidden charges, clear costs" },
    { icon: <FaHome />, title: "Legal Verified", desc: "100% legal documentation" },
    { icon: <FaSearch />, title: "Virtual Tours", desc: "3D viewings available" }
  ];

  /* ================= FETCH PROJECTS ================= */
  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await axios.get("http://localhost:5000/api/projects");

      const mapped = res.data.data.map((project) => ({
        id: project.id, // IMPORTANT: same id used in route
        title: project.projectName,
        location: project.location,
        image:
          project.images && project.images.length > 0
            ? project.images[0]
            : require("../../images/slide1.jpg"),
        type: project.projectType
      }));

      setProperties(mapped);
    } catch (err) {
      setError("Failed to load properties");
    } finally {
      setLoading(false);
    }
  };

  /* ================= SLIDER CONTROLS ================= */
  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  useEffect(() => {
    const timer = setInterval(handleNextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
  fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/testimonials");
      setTestimonials(res.data.data);
    } catch (error) {
      console.error("Failed to load testimonials");
    }
  };

  
const handleNextTestimonial = () => {
  if (testimonialIndex < testimonials.length - 3) {
    setTestimonialIndex(prev => prev + 1);
  }
};

const handlePrevTestimonial = () => {
  if (testimonialIndex > 0) {
    setTestimonialIndex(prev => prev - 1);
  }
};




  return (
    <div className="home-page">

      {/* ================= HERO SLIDER ================= */}
      <section className="hero-wrapper">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`hero-slide ${slide.id} ${index === currentSlide ? "active" : ""}`}
          >
            <div className="hero-content">
              <h1>{slide.title}</h1>
              <p>{slide.subtitle}</p>
            </div>
          </div>
        ))}

        <button className="slider-btn prev-btn" onClick={handlePrevSlide}>
          <FaChevronLeft />
        </button>
        <button className="slider-btn next-btn" onClick={handleNextSlide}>
          <FaChevronRight />
        </button>
      </section>

      {/* ================= FEATURED PROPERTIES ================= */}
      <section className="property-section">
        <div className="container">
          <div className="section-header">
            <h2>Featured Properties</h2>
            <p>Discover premium projects from trusted developers</p>
          </div>

          {loading && (
            <div className="loading-container">
              <FaSpinner className="spinner" />
              <p>Loading properties...</p>
            </div>
          )}

          {error && (
            <div className="error-container">
              <FaExclamationCircle />
              <p>{error}</p>
            </div>
          )}

          {!loading && !error && (
            <div className="property-grid">
              {properties.map((property) => (
                <div className="property-card" key={property.id}>
                  <div className="property-badge">{property.type}</div>

                  <div className="property-image">
                    <img src={property.image} alt={property.title} />
                  </div>

                  <div className="property-content">
                    <h3>{property.title}</h3>
                    <p className="property-location">
                      <FaMapMarkerAlt /> {property.location}
                    </p>

                    {/* ✅ FIXED NAVIGATION */}
                    <button
                      className="property-btn"
                      onClick={() => navigate(`/property/${property.id}`)}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ================= WHY CHOOSE US ================= */}
      {/* <section className="why-choose-us">
        <div className="container">
          <div className="section-header">
            <h2>Why Choose DreamDwello</h2>
            <p>We make your property journey seamless and trustworthy</p>
          </div>

          <div className="features-grid">
            {features.map((feature, index) => (
              <div className="feature-card" key={index}>
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section> */}

{/* ================= TESTIMONIALS ================= */}
<section className="testimonials-section">
  <div className="container">
    <div className="section-header">
      <h2>What Our Clients Say</h2>
      <p className="section-subtitle">Real feedback from happy customers</p>
    </div>

    <div className="testimonial-viewport">

      <button
        className="testimonial-nav left"
        onClick={handlePrevTestimonial}
        disabled={testimonialIndex === 0}
      >
        ‹
      </button>

      <div className="testimonial-track-wrapper">
        <div
          className="testimonial-track"
          style={{
            transform: `translateX(-${testimonialIndex * 360}px)`
          }}
        >
          {testimonials.map((item) => (
            <div className="testimonial-card" key={item._id}>
              <p className="testimonial-text">
                “{item.message}”
              </p>

              <div className="testimonial-author">
                <div className="author-avatar">
                  {item.name
                    .split(" ")
                    .map(w => w[0])
                    .join("")}
                </div>

                <div className="author-info">
                  <h4>{item.name}</h4>
                  <p>{item.designation}, {item.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        className="testimonial-nav right"
        onClick={handleNextTestimonial}
        disabled={testimonialIndex >= testimonials.length - 3}
      >
        ›
      </button>

    </div>
  </div>
</section>





      {/* ================= CTA SECTION ================= */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Find Your Dream Home?</h2>
            <p>Talk to our experts for personalized property guidance</p>

            <div className="cta-buttons">
              
              <button onClick={() => navigate("/contact")}>Contact Us →</button>
              {/* <button className="cta-btn secondary">
                <FaEnvelope /> Send Email
              </button> */}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;