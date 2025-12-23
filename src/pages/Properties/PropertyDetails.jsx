import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./PropertyDetails.css";

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [activeImg, setActiveImg] = useState(0);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/properties/${id}`)
      .then((res) => setProperty(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  if (!property) return <p className="loading">Loading...</p>;

  return (
    <div className="property-details-container">
      <div className="property-images">

        {/* FIXED IMAGE CONTAINER */}
        <div className="main-image-wrapper">
          <img
            src={property.images[activeImg]}
            alt={property.projectName}
            className="main-image"
          />
        </div>

        <div className="thumbnails">
          {property.images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Thumbnail ${index}`}
              className={`thumb ${activeImg === index ? "active" : ""}`}
              onClick={() => setActiveImg(index)}
            />
          ))}
        </div>
      </div>

      <div className="property-info">
        <h1>{property.projectName}</h1>
        <p><strong>Location:</strong> {property.location}</p>

        {property.bedrooms && <p><strong>Bedrooms:</strong> {property.bedrooms}</p>}
        {property.bathrooms && <p><strong>Bathrooms:</strong> {property.bathrooms}</p>}
        {property.area && <p><strong>Area:</strong> {property.area} sq.ft</p>}
        {property.description && (
          <p><strong>Description:</strong> {property.description}</p>
        )}

        {property.amenities?.length > 0 && (
          <div className="amenities">
            <strong>Amenities:</strong>
            <ul>
              {property.amenities.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyDetails;
