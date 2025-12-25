import React, { useEffect, useState } from "react";
import "./ScrollUpButton.css";

const ScrollUpButton = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShow(true);
      } else {
        setShow(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    show && (
      <button className="scroll-up-btn" onClick={scrollToTop}>
        ↑
      </button>
    )
  );
};

export default ScrollUpButton;
