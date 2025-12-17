import React, { useState } from "react";
import axios from "axios";
import "./Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    // lastName: "",
    email: "",
    phone: "",
    // projectType: "",
    location: "",
    // subject: "",
    // message: "",
  });

  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMsg("");
    setErrorMsg("");

    try {
      const res = await axios.post("http://localhost:5000/api/contact", formData);
      setSuccessMsg(res.data.message);
      setFormData({
        firstName: "",
        // lastName: "",
        email: "",
        phone: "",
        // projectType: "",
        location: "",
        // subject: "",
        // message: "",
      });
    } catch (error) {
      setErrorMsg(error.response?.data?.error || "Server error");
    }
  };

  return (
    <div className="contact-wrapper">
      {/* ---------- HERO SECTION ---------- */}
      <section className="contact-hero">
        <h1>Contact Us</h1>
        <p>Crafting great spaces starts with a conversation. Let's connect.</p>
      </section>

      {/* ---------- MAIN CONTENT ---------- */}
      <div className="contact-container">
        
        {/* LEFT INFO CARD */}
        <div className="contact-info-box">
          <h2>Craft your architectural dream with us!</h2>
          <p>
           We’re here to guide you every step of the way. Whether you’re looking for your dream home or planning a new project, our team is ready to assist you.
          </p>

          <div classname="info-row-for">
            <div className="info-row">
            <span className="info-row span">📞</span>
            <p>+0253-4065472</p>
          </div>

          <div className="info-row">
            <span className="info-row span1">📧</span>
            <p>info@dreamdwello.com</p>
          </div>

          <div className="info-row">
            <span>📍</span>
            <div>
              Plot no.2, main street ,NYC, USA – 10044
            </div>
          </div>

          </div>

          

          <h3 className="hours-title">Opening Hours</h3>
          <p>Thu – Tue 10:00 AM – 07:00 PM</p>

          
        </div>

        {/* <div className="contact-table-box"> */}
           {/* RIGHT SIDE FORM */}
<div className="contact-form-card">
  <form className="contact-form" onSubmit={handleSubmit}>
    {successMsg && <p className="success-msg">{successMsg}</p>}
    {errorMsg && <p className="error-msg">{errorMsg}</p>}

    <div className="two-col">
      <input
        type="text"
        name="firstName"
        placeholder="First Name"
        value={formData.firstName}
        onChange={handleChange}
        required
      />

      {/* <input
        type="text"
        name="lastName"
        placeholder="Last Name"
        value={formData.lastName}
        onChange={handleChange}
        required
      /> */}
    </div>

    <div className="two-col">
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
        placeholder="Phone Number"
        value={formData.phone}
        onChange={handleChange}
        required
      />
    </div>

    <div className="two-col">
      {/* <select
        name="projectType"
        value={formData.projectType}
        onChange={handleChange}
        required
      >
        <option value="">Project Type</option>
        <option value="Row-House">Row-House</option>
        <option value="Bungalow">Bungalow</option>
        <option value="Flats">Flats</option>
      </select> */}

      <input
        type="text"
        name="location"
        placeholder="Project Location"
        value={formData.location}
        onChange={handleChange}
        required
      />
    </div>
    
    {/* <div className="subject">
      <input
      type="text"
      name="subject"
      placeholder="Subject"
      value={formData.subject}
      onChange={handleChange}
      required
    />
    </div> */}
 {/* <div className="subject1">
    <textarea
      name="message"
      placeholder="Message"
      value={formData.message}
      onChange={handleChange}
      required
    ></textarea>
 </div> */}
    
    

    

    <button type="submit">SUBMIT</button>
  </form>
</div>



        
        {/* </div> */}
      </div>
    </div>
  );
};

export default Contact;
