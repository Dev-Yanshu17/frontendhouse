import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./PropertyDetails.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix default marker icon issue in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [mainImage, setMainImage] = useState("");

  // Fetch property data from backend
  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/properties/${id}`);
        setProperty(res.data);
        setMainImage(res.data.images[0]);
      } catch (err) {
        console.log(err);
      }
    };
    fetchProperty();
  }, [id]);

  if (!property) return <p>Loading...</p>;

  return (
    <div className="property-details-container">
      <div className="images-section">
        <img src={mainImage} alt={property.projectName} className="main-image" />
        <div className="thumbnail-images">
          {property.images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Thumbnail ${index}`}
              className={mainImage === img ? "active" : ""}
              onClick={() => setMainImage(img)}
            />
          ))}
        </div>
      </div>

      <div className="info-section">
        <h1>{property.projectName}</h1>
        <p>
          <strong>Location:</strong> {property.location}
        </p>
        <p>
          <strong>Price:</strong> ₹ {property.price}
        </p>
        <p>
          <strong>Bedrooms:</strong> {property.bedrooms}
        </p>
        <p>
          <strong>Area:</strong> {property.area} sq.ft
        </p>
      </div>

      <h2>📍 Property Location</h2>
      <div className="map-sticky-wrapper">
        <MapContainer
          center={[property.coordinates.lat, property.coordinates.lng]}
          zoom={16}
          scrollWheelZoom={false}
          className="leaflet-map"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
          <Marker
            position={[property.coordinates.lat, property.coordinates.lng]}
          >
            <Popup>{property.projectName}</Popup>
          </Marker>
        </MapContainer>

        <a
          href={`https://www.google.com/maps/dir/?api=1&destination=${property.coordinates.lat},${property.coordinates.lng}`}
          target="_blank"
          rel="noopener noreferrer"
          className="direction-button"
        >
          📍 Get Accurate Directions
        </a>
      </div>
    </div>
  );
};

export default PropertyDetails;
