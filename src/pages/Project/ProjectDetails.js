import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";
import "./ProjectDetails.css";

/* Icons Import */
import { 
  FaMapMarkerAlt, FaHome, FaBuilding, FaCamera, FaDumbbell, FaChild, FaWifi, FaParking, 
  FaTree, FaSun, FaSnowflake, FaFire, FaWater, FaShower, FaFireExtinguisher, FaFirstAid, 
  FaTools, FaCar, FaBicycle, FaWalking, FaDog, FaUmbrellaBeach, FaFilm, FaChair, FaVolumeUp, 
  FaStar, FaArrowLeft, FaTimes, FaChevronLeft, FaChevronRight, FaExpand, FaHotel, FaBook, FaUtensils, FaTrash 
} from "react-icons/fa";

import { GiRoad, GiStreetLight, GiGate, GiSecurityGate, GiFootprint, GiTennisCourt, GiBinoculars, GiTreehouse, GiCastle, GiCampingTent, GiFireRing, GiFireplace, GiDogHouse, GiWaterDrop, GiWaterTank, GiWateringCan, GiTreeRoots, GiFlowerEmblem, GiTheater, GiFilmProjector, GiPopcorn, GiTicket, GiTabletopPlayers } from "react-icons/gi";

import { MdSecurity, MdOutlinePool, MdOutlineHouse, MdOutlineWater, MdOutlineElectricBolt, MdOutlineToys, MdOutlineSpa, MdOutlineRestaurant, MdOutlineStorefront, MdOutlinePark, MdOutlineGrass, MdOutlineMedicalServices, MdOutlineDirectionsCar } from "react-icons/md";

import { IoIosFitness, IoMdFootball, IoMdCar } from "react-icons/io";

/* Icon Map for Amenities */
const iconMap = {
  "Road": <GiRoad />, "Street Light": <GiStreetLight />, "Parking": <FaParking />, "Car Parking": <IoMdCar />,
  "Bike Parking": <FaBicycle />, "WiFi": <FaWifi />, "Swimming Pool": <MdOutlinePool />, "Gym": <FaDumbbell />,
  "Children Play Area": <FaChild />, "Yoga Studio": <GiFootprint />, "Club House": <GiTennisCourt />, 
  "Movie Theater": <GiTheater />, "Cinema Hall": <GiTheater />, "Popcorn & Snacks": <GiPopcorn />, 
  "Table Tennis": <GiTabletopPlayers />, "Chess": <FaStar />, "Garden": <FaTree />, "Temple": <GiCastle />, 
  "Resort": <FaHotel />, "Restaurant": <FaUtensils />, "Medical Room": <MdOutlineMedicalServices />, 
  "Waste Management": <FaTrash />, "DEFAULT": <FaStar />
};

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showGalleryModal, setShowGalleryModal] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    fetchProject();
    AOS.init({ duration: 1000 });
  }, [id]);

  const fetchProject = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`http://localhost:5000/api/projects/${id}`);
      setProject(res.data.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load project details");
    } finally {
      setLoading(false);
    }
  };

  const getAmenityIcon = (amenity) => {
    if (iconMap[amenity]) return iconMap[amenity];
    const amenityLower = amenity.toLowerCase();
    for (const [key, icon] of Object.entries(iconMap)) {
      if (amenityLower.includes(key.toLowerCase())) return icon;
    }
    return iconMap.DEFAULT;
  };

  const openGalleryModal = (index) => {
    setCurrentImageIndex(index);
    setShowGalleryModal(true);
    document.body.style.overflow = "hidden";
  };

  const closeGalleryModal = () => {
    setShowGalleryModal(false);
    document.body.style.overflow = "auto";
  };

  const goToPreviousImage = () => {
    setCurrentImageIndex(prev => prev === 0 ? project.images.length - 1 : prev - 1);
  };

  const goToNextImage = () => {
    setCurrentImageIndex(prev => prev === project.images.length - 1 ? 0 : prev + 1);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!showGalleryModal) return;
      if (e.key === "Escape") closeGalleryModal();
      else if (e.key === "ArrowLeft") goToPreviousImage();
      else if (e.key === "ArrowRight") goToNextImage();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showGalleryModal]);

  if (loading) return <div className="loading-container"><p>Loading project details...</p></div>;
  if (error || !project) return (
    <div className="error-container">
      <h2>Project Not Found</h2>
      <p>{error || "The requested project could not be found."}</p>
      <button className="back-nav-btn" onClick={() => navigate("/projects")}>
        <FaArrowLeft /> Back to Projects
      </button>
    </div>
  );

  return (
    <div className="project-details-container">
      {/* Back Button */}
      {/* <button className="back-nav-btn" onClick={() => navigate("/projects")}>
        <FaArrowLeft /> Back to Projects
      </button> */}

      <div className="project-content-wrapper">
        {/* Hero Image */}
        {project.images && project.images[0] && (
          <div className="project-hero" onClick={() => openGalleryModal(0)}>
            <img src={project.images[0]} alt={project.projectName} className="hero-image" />
            <div className="hero-overlay">
              <h1 className="project-title">{project.projectName}</h1>
            </div>
          </div>
        )}

        {/* Project Details */}
        <div className="details-section">
          <h2>Project Details</h2>
          <div className="details-grid">
            <div className="detail-card"><FaBuilding /> <p>{project.projectType}</p></div>
            <div className="detail-card"><FaMapMarkerAlt /> <p>{project.location}</p></div>
            <div className="detail-card"><FaHome /> <p>{project.totalHouse} Houses</p></div>
          </div>
        </div>

        {/* Gallery */}
        {project.images && project.images.length > 1 && (
          <div className="gallery-section">
            {/* <h2><FaCamera /> Gallery</h2> */}
            <div className="gallery-grid">
              {project.images.slice(1, Math.min(5, project.images.length)).map((img, index) => (
                <div className="gallery-item" key={index} onClick={() => openGalleryModal(index + 1)}>
                  <img src={img} alt={`Image ${index + 2}`} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Amenities */}
        {project.amenities && project.amenities.length > 0 && (
          <div className="amenities-section">
            <h2>Amenities</h2>
            <div className="amenities-grid">
              {project.amenities.map((amenity, index) => (
                <div className="amenity-item" key={index}>
                  <div className="amenity-icon">{getAmenityIcon(amenity)}</div>
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        {/* CTA Section */}
       <div className="cta-section" data-aos="fade-up">
  <div className="cta-content">
    <h3>Interested in this Project?</h3>
    <p>Contact us today for site visits, pricing details, and special offers</p>
    <div className="cta-buttons">
      <button className="cta-btn secondary" onClick={() => navigate("/projects")}>
         Back to Projects
      </button>
    </div>
  </div>
</div>
 
      </div>

      {/* Fullscreen Modal */}
      {showGalleryModal && project.images && (
        <div className="fullscreen-gallery-modal">
          <div className="gallery-modal-header">
            <button className="gallery-close-btn" onClick={closeGalleryModal}><FaTimes /></button>
            <span>{currentImageIndex + 1} / {project.images.length}</span>
          </div>
          <div className="gallery-modal-main">
            <button className="nav-arrow left-arrow" onClick={goToPreviousImage}><FaChevronLeft /></button>
            <img src={project.images[currentImageIndex]} alt={`Image ${currentImageIndex + 1}`} className="main-image" />
            <button className="nav-arrow right-arrow" onClick={goToNextImage}><FaChevronRight /></button>
          </div>
          <div className="thumbnail-strip">
            {project.images.map((img, idx) => (
              <div key={idx} className={`thumbnail-container ${idx === currentImageIndex ? 'active' : ''}`} onClick={() => setCurrentImageIndex(idx)}>
                <img src={img} alt={`Thumbnail ${idx + 1}`} className="thumbnail-image" />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDetails;
