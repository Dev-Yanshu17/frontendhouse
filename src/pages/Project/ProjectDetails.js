import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";
import "./ProjectDetails.css";

/* Icons Import */
import {
  FaMapMarkerAlt,
  FaHome,
  FaBuilding,
  FaCamera,
  FaSwimmingPool,
  FaDumbbell,
  FaChild,
  FaWifi,
  FaParking,
  FaTree,
  FaSun,
  FaSnowflake,
  FaFire,
  FaWater,
  FaShower,
  FaFireExtinguisher,
  FaFirstAid,
  FaTools,
  FaCar,
  FaBicycle,
  FaWalking,
  FaDog,
  FaUmbrellaBeach,
  FaFilm,
  FaChair,
  FaVolumeUp,
  FaCheckCircle,
  FaSpinner,
  FaStar,
  FaArrowLeft,
  FaPhone,
  FaCalendarAlt,
  FaUsers,
  FaRoad,
  FaBroadcastTower,
  FaSatelliteDish,
  FaTableTennis,
  FaBasketballBall,
  FaVolleyballBall,
  FaChess,
  FaLeaf,
  FaCoffee,
  FaHotel,
  FaMountain,
  FaBook,
  FaUtensils,
  FaRecycle,
  FaTrash,
  FaWind,
  FaThermometer,
  FaTint,
  FaBed,
  FaBath,
  FaRulerCombined,
  FaVectorSquare,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
  FaExpand
} from "react-icons/fa";

/* Gi Icons */
import {
  GiGate,
  GiMeditation,
  GiTennisCourt,
  GiFootprint,
  GiTempleGate,
  GiCampingTent,
  GiSecurityGate,
  GiPathDistance,
  GiBinoculars,
  GiTreehouse,
  GiCastle,
  GiStreetLight,
  GiRoad,
  GiHouse,
  GiModernCity,
  GiWaterTank,
  GiWaterDrop,
  GiWateringCan,
  GiTreeRoots,
  GiFlowerEmblem,
  GiFlowers,
  GiFountain,
  GiFireplace,
  GiFireRing,
  GiFirstAidKit,
  GiToolbox,
  GiTrashCan,
  GiTowerFlag,
  GiTabletopPlayers,
  GiBasketballBall,
  GiVolleyballBall,
  GiChessRook,
  GiCarKey,
  GiBicycle,
  GiRunningShoe,
  GiDogHouse,
  GiCat,
  GiBeachBall,
  GiExitDoor,
  GiWaterDivinerStick,
  GiFilmProjector,
  GiPopcorn,
  GiTicket,
  GiTheater
} from "react-icons/gi";

/* Md Icons */
import {
  MdSecurity,
  MdSportsSoccer,
  MdOutlineRestaurant,
  MdOutlineStorefront,
  MdOutlineLandscape,
  MdOutlineLocalFireDepartment,
  MdOutlineWater,
  MdOutlineElectricBolt,
  MdOutlineToys,
  MdOutlineSpa,
  MdOutlinePool,
  MdOutlineHouse,
  MdOutlineApartment,
  MdOutlineVilla,
  MdOutlinePark,
  MdOutlineGrass,
  MdOutlineForest,
  MdOutlineMedicalServices,
  MdOutlineConstruction,
  MdOutlineDelete,
  MdOutlineSatelliteAlt,
  MdOutlineSportsTennis,
  MdOutlineSportsBasketball,
  MdOutlineSportsVolleyball,
  MdOutlineSports,
  MdOutlineDirectionsCar,
  MdOutlineDirectionsBike,
  MdOutlineDirectionsWalk,
  MdOutlinePets,
  MdOutlineBeachAccess,
  MdOutlineExitToApp,
  MdOutlineZoomOutMap
} from "react-icons/md";

/* Io Icons */
import {
  IoIosFitness,
  IoMdFootball,
  IoMdCar,
  IoMdHome,
  IoMdBusiness,
  IoMdWater,
  IoMdSnow,
  IoMdFlame,
  IoMdMedkit,
  IoMdConstruct,
  IoMdTrash,
  IoMdRadio,
  IoMdTennisball,
  IoMdBasketball,
  IoMdAmericanFootball,
  IoMdBicycle,
  IoMdWalk,
  IoMdPaw,
  IoMdUmbrella,
  IoMdExit
} from "react-icons/io";

/* Icon Map for Amenities */
const iconMap = {
  // Infrastructure & Roads
  "Road": <GiRoad />,
  "Street Light": <GiStreetLight />,
  "Internal Roads": <FaRoad />,
  "Wide Roads": <GiRoad />,
  "Concrete Road": <GiRoad />,
  "Tar Road": <GiRoad />,
  "Asphalt Road": <GiRoad />,
  "Street Lighting": <GiStreetLight />,
  "LED Street Lights": <FaSun />,
  "Parking": <FaParking />,
  "Covered Parking": <FaParking />,
  "Car Parking": <IoMdCar />,
  "Bike Parking": <FaBicycle />,
  "Visitor Parking": <MdOutlineDirectionsCar />,
  "Underground Parking": <MdOutlineDirectionsCar />,

  // Drainage & Sewage
  "Drainage System": <GiWaterDrop />,
  "Underground Drainage": <GiWaterDrop />,
  "Sewage System": <GiWaterTank />,
  "Storm Water Drain": <GiWaterDrop />,
  "Water Drainage": <GiWaterDrop />,

  // Club & Community
  "Club House": <GiTennisCourt />,
  "Community Hall": <MdOutlineHouse />,
  "Community Center": <MdOutlineHouse />,
  "Party Hall": <MdOutlineHouse />,
  "Banquet Hall": <MdOutlineHouse />,
  "Common Area": <MdOutlineHouse />,
  "Meeting Room": <MdOutlineHouse />,

  // Movie Theater & Cinema
  "Movie Theater": <GiTheater />,
  "Cinema Hall": <GiTheater />,
  "Movie Screen": <GiFilmProjector />,
  "Popcorn & Snacks": <GiPopcorn />,
  "Movie Tickets": <GiTicket />,
  "Film Show": <FaFilm />,
  "Comfortable Seating": <FaChair />,
  "Surround Sound": <FaVolumeUp />,

  // Security
  "Security": <MdSecurity />,
  "24×7 Security": <MdSecurity />,
  "24×7 Security guard With CCTV": <MdSecurity />,
  "Security Gate": <GiSecurityGate />,
  "Entry Gate": <GiGate />,
  "Main Gate": <GiGate />,
  "Gated Community": <GiGate />,
  "CCTV": <FaCamera />,
  "CCTV Surveillance": <FaCamera />,
  "Security Guard": <MdSecurity />,

  // Children Play Area
"Children Play Area": <MdOutlineToys />,
"Childrens Play Area": <MdOutlineToys />,
"Children's Play Area": <MdOutlineToys />,
"Kids Play Area": <MdOutlineToys />,
"Kids Zone": <FaChild />,
"Play Area": <FaChild />,
"Playground": <FaChild />,



  // Internet & Connectivity
  "WiFi": <FaWifi />,
  "High Speed Internet": <FaWifi />,
  "Broadband": <FaBroadcastTower />,
  "Satellite TV": <FaSatelliteDish />,
  "DTH Connection": <FaSatelliteDish />,

  // Water & Utilities
  "Water Supply": <MdOutlineWater />,
  "24×7 Water Supply": <MdOutlineWater />,
  "RO Water": <GiWaterDrop />,
  "Water Tank": <GiWaterTank />,
  "Overhead Tank": <GiWaterTank />,
  "Underground Tank": <GiWaterTank />,
  "Water Purifier": <GiWateringCan />,
  "Rain Water Harvesting": <GiWateringCan />,

  // Power
  "Power Backup": <MdOutlineElectricBolt />,
  "Electricity": <MdOutlineElectricBolt />,
  "24×7 Power": <MdOutlineElectricBolt />,
  "Generator": <MdOutlineElectricBolt />,
  "Inverter": <MdOutlineElectricBolt />,
  "Solar Power": <FaSun />,
  "Solar Panel": <FaSun />,

  // Recreation & Sports
  "Swimming Pool": <MdOutlinePool />,
  "Pool": <MdOutlinePool />,
  "Kids Pool": <MdOutlinePool />,
  "Gym": <FaDumbbell />,
  "Fitness Center": <IoIosFitness />,
  "Health Club": <IoIosFitness />,
  "Yoga Studio": <GiMeditation />,
  "Yoga Meditation Centre": <MdOutlineSpa />,
  "Meditation Area": <GiMeditation />,
  "Spa": <MdOutlineSpa />,

  // Indoor Games
  "Indoor Games": <MdSportsSoccer />,
  "Table Tennis": <FaTableTennis />,
  "Carrom": <GiTabletopPlayers />,
  "Chess": <FaChess />,

  // Outdoor Games
  "Outdoor Games": <GiTennisCourt />,
  "Tennis Court": <GiTennisCourt />,
  "Basketball Court": <FaBasketballBall />,
  "Volleyball Court": <FaVolleyballBall />,
  "Football Ground": <IoMdFootball />,
  "Cricket Pitch": <IoMdFootball />,
  "Sports Complex": <MdSportsSoccer />,
  " ": <GiCastle />,

  // Green Areas & Gardens
  "Garden": <FaLeaf />,
  "Landscape Garden": <MdOutlineLandscape />,
  "Green Park": <FaTree />,
  "Park": <GiTreehouse />,
  "Central Park": <MdOutlinePark />,
  "Children Park": <GiCastle />,
  "Walking Park": <MdOutlineGrass />,
  "Green Area": <GiTreeRoots />,
  "Flower Garden": <GiFlowerEmblem />,

  // Tracks & Paths
  "Jogging Track": <GiFootprint />,
  "Jogging And Cycle Track": <GiPathDistance />,
  "Walking Track": <GiFootprint />,
  "Cycle Track": <GiPathDistance />,

  // Library & Education
  "Library": <FaBook />,
  "Reading Room": <FaBook />,
  "Study Room": <FaBook />,

  // Food & Dining
  "Restaurant": <FaUtensils />,
  "Restaurant And Mini Store": <MdOutlineRestaurant />,
  "Cafeteria": <FaCoffee />,
  "Coffee Shop": <FaCoffee />,

  // Shopping
  "Mini Store": <MdOutlineStorefront />,
  "Convenience Store": <MdOutlineStorefront />,
  "Grocery Store": <MdOutlineStorefront />,
  "Medical Store": <MdOutlineMedicalServices />,

  // Views & Scenery
  "Selfie Point": <FaCamera />,
  "Sunset Point": <FaSun />,
  "Mountain View": <FaMountain />,
  "View Point": <GiBinoculars />,
  "Lake View": <GiWaterDrop />,

  // Camping & Adventure
  "Night Camping Tent": <GiCampingTent />,
  "Camping Area": <GiCampingTent />,
  "Bonfire": <GiFireRing />,
  "BBQ Area": <GiFireplace />,

  // Spiritual
  "Temple": <GiTempleGate />,
  "Prayer Room": <GiTempleGate />,

  // Accommodation
  "Resort": <FaHotel />,
  "Hotel": <FaHotel />,

  // Fire & Safety
  "Fire Safety": <MdOutlineLocalFireDepartment />,
  "Fire Extinguisher": <FaFireExtinguisher />,
  "Fire Alarm": <GiFireRing />,
  "Fire Exit": <GiExitDoor />,
  "First Aid": <FaFirstAid />,
  "Medical Room": <MdOutlineMedicalServices />,

  // Maintenance
  "Maintenance": <FaTools />,
  "Housekeeping": <IoMdConstruct />,

  // Waste Management
  "Waste Management": <FaTrash />,
  "Garbage Collection": <GiTrashCan />,
  "Segregated Waste": <FaRecycle />,

  // Pet Friendly
  "Pet Friendly": <FaDog />,
  "Pet Park": <GiDogHouse />,

  // Beach & Water
  "Beach Access": <FaUmbrellaBeach />,
  "Private Beach": <GiBeachBall />,

  // AC & Cooling
  "Central AC": <FaSnowflake />,
  "Air Conditioning": <FaSnowflake />,
  "Heating": <FaFire />,

  // Power & Utilities
  "Underground Electric Line": <MdOutlineElectricBolt />,
  "Underground Electricity": <MdOutlineElectricBolt />,
  "Underground Power Line": <MdOutlineElectricBolt />,

  // Open Theater
  "Open Theater": <GiTheater />,
  "Open Air Theater": <GiTheater />,
  "Open Air Cinema": <GiFilmProjector />,
  "Outdoor Theater": <GiTheater />,


  // Default
  "DEFAULT": <FaStar />
};

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showGalleryModal, setShowGalleryModal] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
   const [showModal, setShowModal] = useState(false);
  const [currentImage, setCurrentImage] = useState("");

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
            <h2> Gallery</h2>
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

         {/* FLOOR PLANS */}
      {project.floorPlans?.length > 0 && (
        <div className="floorplan-section">
          <h2>Floor Plans</h2>

          <div className="floorplan-grid">
            {project.floorPlans.map((plan, i) => (
              <div
                key={i}
                className="floorplan-card"
                onClick={() => {
                  setCurrentImage(plan.image);
                  setShowModal(true);
                }}
              >
                <img src={plan.image} alt={plan.title} />
                <div className="floorplan-overlay">
                  <FaExpand />
                </div>
                <div className="floorplan-info">
                  <h4>{plan.title}</h4>
                  <p>{plan.size}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODAL */}
      {showModal && (
        <div className="floorplan-modal">
          <button onClick={() => setShowModal(false)}>
            <FaTimes />
          </button>
          <img src={currentImage} alt="Floor Plan" />
        </div>
      )}
{/* ================= MAP CARD ================= */}
{project.latitude && project.longitude && (
  <div className="map-section" data-aos="fade-up">
    <h2>Project Location</h2>

    <div className="map-card">
      {/* MAP EMBED (DESTINATION ONLY) */}
      <iframe
        title="Project Location Map"
        src={`https://www.google.com/maps?q=${project.latitude},${project.longitude}&z=15&output=embed`}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>

      {/* MAP ACTION */}
      <div className="map-actions">
        <button
          className="map-btn"
          onClick={() =>
            window.open(
              `https://www.google.com/maps/dir/?api=1&origin=current+location&destination=${project.latitude},${project.longitude}&travelmode=driving`,
              "_blank"
            )
          }
        >
          📍 Get Directions
        </button>
      </div>
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
                <FaArrowLeft /> Back to Projects
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
