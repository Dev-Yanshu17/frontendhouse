import React from "react";
import { useNavigate } from "react-router-dom";
import "./PropertyCard.css";

const PropertyCard = ({ property }) => {
  const navigate = useNavigate();

  return (
    <div
      className="property-card"
      onClick={() => navigate(`/property/${property._id}`)}
    >
      <img
        src={property.images?.[0]}
        alt={property.projectName}
        className="property-image"
      />

      <div className="property-info">
        <h3>{property.projectName}</h3>
        <p>{property.location}</p>

      </div>
    </div>
  );
};

export default PropertyCard;
