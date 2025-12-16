import React from "react";
import "./Testimonials.css";

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Rohit Sharma",
      feedback: "I found my dream home thanks to this platform! Highly recommended.",
    },
    {
      id: 2,
      name: "Priya Patel",
      feedback: "Amazing service and professional team. The process was smooth and quick.",
    },
    {
      id: 3,
      name: "Amit Desai",
      feedback: "Great property listings and easy to use search feature.",
    },
  ];

  return (
    <div className="testimonials-container">
      {testimonials.map((t) => (
        <div className="testimonial-card" key={t.id}>
          <p>"{t.feedback}"</p>
          <h4>- {t.name}</h4>
        </div>
      ))}
    </div>
  );
};

export default Testimonials;
