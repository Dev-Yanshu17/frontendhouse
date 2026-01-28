import React, { useEffect, useState, useRef } from "react";
import "./Home.css";
import {
  FaSearch,
  FaHome,
  FaShieldAlt,
  FaAward,
  FaMapMarkerAlt,
  FaSpinner,
  FaExclamationCircle,
  FaChevronRight,
  FaChevronLeft
} from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  /* ================= STATE ================= */
  const [currentSlide, setCurrentSlide] = useState(0);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [testimonials, setTestimonials] = useState([]);
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  const navigate = useNavigate();

  /* ================= RESPONSIVE ================= */
  const isMobile = window.innerWidth <= 768;
  const cardsPerView = isMobile ? 1 : 3;
  const CARD_WIDTH = 360;

  /* ================= HERO SLIDER DATA ================= */
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

  /* ================= FETCH PROPERTIES ================= */
  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/projects");

      const mapped = res.data.data.map((project) => ({
        id: project.id,
        title: project.projectName,
        location: project.location,
        image:
          project.images?.length > 0
            ? project.images[0]
            : require("../../images/slide1.jpg"),
        type: project.projectType
      }));

      setProperties(mapped);
    } catch {
      setError("Failed to load properties");
    } finally {
      setLoading(false);
    }
  };

  /* ================= HERO SLIDER CONTROLS ================= */
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

  /* ================= FETCH TESTIMONIALS ================= */
  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/testimonials");
      setTestimonials(res.data.data);
    } catch {
      console.error("Failed to load testimonials");
    }
  };

  /* ================= TESTIMONIAL AUTO SLIDE ================= */
  useEffect(() => {
    if (!testimonials.length) return;

    const interval = setInterval(() => {
      setTestimonialIndex((prev) => {
        const maxIndex = testimonials.length - cardsPerView;
        return prev >= maxIndex ? 0 : prev + 1;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [testimonials, cardsPerView]);

  /* ================= JSX ================= */
  return (
    <div className="home-page">

      {/* ================= HERO ================= */}
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

      {/* ================= PROPERTIES ================= */}
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

      {/* ================= TESTIMONIALS ================= */}
      <section className="testimonials-section">
        <div className="container">
          <div className="section-header">
            <h2>What Our Clients Say</h2>
            <p className="section-subtitle">Real feedback from happy customers</p>
          </div>

          <div className="testimonial-viewport">
            <div className="testimonial-track-wrapper">
              <div
                className="testimonial-track"
                style={{
                  transform: `translateX(-${testimonialIndex * CARD_WIDTH}px)`
                }}
              >
                {testimonials.map((item) => (
                  <div className="testimonial-card" key={item._id}>
                    <p className="testimonial-text">“{item.message}”</p>

                    <div className="testimonial-author">
                      <div className="author-avatar">
                        {item.name
                          .split(" ")
                          .map((w) => w[0])
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
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="cta-section">
        <div className="container">
          <h2>Ready to Find Your Dream Home?</h2>
          <p>Talk to our experts for personalized property guidance</p>
          <button onClick={() => navigate("/contact")}>Contact Us </button>
        </div>
      </section>

    </div>
  );
};

export default Home;
