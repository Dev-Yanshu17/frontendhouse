import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";
import "./Project.css";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import {
  FaMapMarkerAlt,
  FaHome,
  FaArrowRight
} from "react-icons/fa";

const Project = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 800, once: true });

    const fetchProjects = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/projects");
        setProjects(res.data.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading)
    return (
      <div className="loading-container">
        <p>Loading projects...</p>
      </div>
    );

  return (
    <div className="project-container">
      <div className="project-header">
        <h1>Find Your Dream Home Today</h1>
        <p>
          Explore our premium collection of residential projects
        </p>
      </div>

      <div className="projects-grid">
        {projects.map((project) => (
          <div
            className="project-card"
            key={project.id}
            data-aos="fade-up"
          >
            {/* IMAGE SLIDER */}
            <div className="project-image-container">
              <Swiper
                modules={[Navigation, Pagination]}
                navigation
                pagination={{ clickable: true }}
                className="project-swiper"
              >
                {project.images?.map((img, index) => (
                  <SwiperSlide key={index}>
                    <img
                      src={img}
                      alt={project.projectName}
                      className="project-image"
                      onClick={() =>
                        navigate(`/property/${project.id}`)
                      }
                    />
                  </SwiperSlide>
                ))}
              </Swiper>

              <div className="project-badge">
                {project.projectType}
              </div>
            </div>

            <div className="project-content">
              <h3 className="project-name">
                {project.projectName}
              </h3>

              <div className="project-info">
                <div className="info-item">
                  <FaMapMarkerAlt />
                  <span>{project.location}</span>
                </div>

                <div className="info-item">
                  <FaHome />
                  <span>{project.totalHouse} Units</span>
                </div>
              </div>

              <button
                className="view-details-btn"
                onClick={() =>
                  navigate(`/property/${project.id}`)
                }
              >
                View Details 
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Project;
