import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AboutUs.css";
import Navbar from "../../components/Navbar/Navbar";

const AboutUs = () => {
  const navigate = useNavigate();

  const [count, setCount] = useState(0);
  const counterRef = useRef(null);

  // ------------------------------
  // Counter Animation (1 → 12)
  // ------------------------------
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          let start = 0;
          const end = 12;
          const duration = 1000;
          const stepTime = Math.abs(Math.floor(duration / end));

          const counter = setInterval(() => {
            start++;
            setCount(start);
            if (start === end) clearInterval(counter);
          }, stepTime);

          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(counterRef.current);
  }, []);

  // TIMELINE DATA
  const timeline = [
    { year: "2013", event: "Company Founded" },
    { year: "2017", event: "10 Projects Completed" },
    { year: "2019", event: "Expanded Commercial Sector" },
    { year: "2024", event: "Award Winning Developer" },
    { year: "2025", event: "25+ Successful Projects" },
  ];

  // TEAM DATA
  const team = [
    {
      name: "John Builder",
      role: "Founder & CEO",
      img: "https://randomuser.me/api/portraits/men/11.jpg",
    },
    {
      name: "Priya Sharma",
      role: "Lead Architect",
      img: "https://randomuser.me/api/portraits/women/12.jpg",
    },
    {
      name: "Rahul Mehta",
      role: "Project Manager",
      img: "https://randomuser.me/api/portraits/men/14.jpg",
    },
  ];

  return (
    <div className="about-page">
      {/* <Navbar /> */}

      {/* HERO + MISSION */}
      <section className="mission-section">
        <div className="mission-image">
          <img
            src="https://images.unsplash.com/photo-1501594907352-04cda38ebc29"
            alt="mission"
          />

          {/* ========== Animated Counter ========== */}
          <div className="experience-badge" ref={counterRef}>
            <h2>{count}+</h2>
            <p>Years of Experience</p>
          </div>
        </div>

        <div className="mission-text">
          <p className="section-label"># OUR MISSION</p>
          <h1>
            Always provide superior construction services through excellence 
            in everything we do. Donnelly Construction is committed to adding 
            value for our clients through innovation, integrity, and performance.
          </h1>

          <p className="mission-desc">
            DREAMDWELLO is committed to providing the highest level of construction and 
            building maintenance services in the East Anglia region. We will ensure the 
            longevity of our company through repeat and referral business achieved by customer
            satisfaction by exceeding their expectations on every project we work on.
          </p>
        </div>
      </section>

      {/* VISION */}
      <section className="vision-section">
        <p className="section-label"># OUR VISION</p>
        <h2>To redefine modern living through innovation and trust.</h2>
        <p>
          Our vision is to build sustainable, future-ready communities that
          balance design, quality, and functionality — ensuring long-term value
          for residents and investors.
        </p>
      </section>

      {/* TIMELINE */}
      <section className="timeline-section">
        <h2 className="center">Our Journey</h2>

        <div className="timeline-horizontal">
          {timeline.map((item, i) => (
            <div key={i} className="timeline-card">
              <h3>{item.year}</h3>
              <p>{item.event}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TEAM */}
      {/* <section className="team-section">
        <h2 className="center">Meet Our Team</h2>

        <div className="team-cards">
          {team.map((t, i) => (
            <div className="team-card" key={i}>
              <img src={t.img} alt={t.name} />
              <h3>{t.name}</h3>
              <p>{t.role}</p>
            </div>
          ))}
        </div>
      </section> */}

      {/* CTA */}
      <section className="cta-section">
        <h2>Have a Project in Mind?</h2>
        <p>Talk to our experts and start building your dream today.</p>

        <button onClick={() => navigate("/contact")}>
          Contact Us →
        </button>
      </section>
    </div>
  );
};

export default AboutUs;
