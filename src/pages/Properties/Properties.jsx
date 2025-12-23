import React, { useEffect, useState } from "react";
import axios from "axios";
import PropertyCard from "../../components/PropertyCard/PropertyCard";
import "./Properties.css";

const Properties = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/properties")
      .then((res) => setProperties(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="properties-page">
      <h2 className="page-title">Available Properties</h2>

      <div className="properties-grid">
        {properties.length > 0 ? (
          properties.map((property) => (
            <PropertyCard key={property._id} property={property} />
          ))
        ) : (
          <p>No properties found</p>
        )}
      </div>
    </div>
  );
};

export default Properties;
