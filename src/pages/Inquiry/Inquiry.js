import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./Inquiry.css";

const Inquiry = () => {
  const { serviceName } = useParams();
  const decodedServiceName = decodeURIComponent(serviceName);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
  });

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validate phone input on change
    if (name === "phone") {
      // Allow only digits
      if (!/^\d*$/.test(value)) return;
      // Limit to 10 digits
      if (value.length > 10) return;
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Phone number validation
    const phoneRegex = /^[7-9]\d{9}$/;
    if (!phoneRegex.test(formData.phone)) {
      setError(
        "Phone number must be 10 digits and start with 9, 8, or 7."
      );
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/inquiry", {
        serviceName: decodedServiceName,
        ...formData,
      });

      setSuccess("Inquiry submitted successfully!");
      setFormData({
        name: "",
        email: "",
        phone: "",
        location: "",
      });
    } catch (err) {
      setError("Server error. Please try again.");
    }
  };

  return (
    <div className="inquiry-page">
      <div className="inquiry-card">
        <h2>Service Inquiry</h2>

        <p className="service-name">
          <strong>Service:</strong> {decodedServiceName}
        </p>

        {success && <p className="success">{success}</p>}
        {error && <p className="error">{error}</p>}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="phone"
            placeholder="Mobile Number"
            value={formData.phone}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            required
          />

          <button type="submit">Submit Inquiry</button>
        </form>
      </div>
    </div>
  );
};

export default Inquiry;
