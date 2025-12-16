import React from "react";
import "./PropertyCard.css";

const PropertyCard = ({ property }) => {
  return (
    <div className="property-card">
      <img src={property.image} alt={property.title} className="property-img" />
      <div className="property-info">
        <h3>{property.title}</h3>
        <p>{property.location}</p>
        <p>₹ {property.price.toLocaleString()}</p>
        <p>{property.bedrooms} Bedrooms | {property.area} sqft</p>
      </div>
    </div>
  );
};

export default PropertyCard;
