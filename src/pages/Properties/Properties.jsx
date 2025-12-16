import React, { useState } from "react";
import "./Properties.css";
import Navbar from "../../components/Navbar/Navbar";
import PropertyCard from "../../components/PropertyCard/PropertyCard";
import SearchBar from "../../components/SearchBar/SearchBar";

const Properties = () => {
  const properties = [
    {
      id: 1,
      title: "Modern 3 BHK House",
      location: "Ahmedabad, Gujarat",
      price: 8500000,
      bedrooms: 3,
      area: 1500,
      image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800",
    },
    {
      id: 2,
      title: "Luxury Villa with Pool",
      location: "Surat, Gujarat",
      price: 14500000,
      bedrooms: 4,
      area: 2200,
      image: "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?w=800",
    },
    {
      id: 3,
      title: "2 BHK Affordable Flat",
      location: "Rajkot, Gujarat",
      price: 4500000,
      bedrooms: 2,
      area: 950,
      image: "https://images.unsplash.com/photo-1599423300746-b62533397364?w=800",
    },
  ];

  const [filtered, setFiltered] = useState(properties);

  const handleSearch = (criteria) => {
    // Example filtering logic
    setFiltered(properties);
  };

  return (
    <div className="properties-page">
      {/* <Navbar /> */}
      <section className="properties-hero">
        <h1>Browse Properties</h1>
        <p>Find your perfect home from thousands of listings.</p>
        <SearchBar onSearch={handleSearch} />
      </section>

      <section className="properties-grid-section">
        <div className="properties-grid">
          {filtered.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Properties;
