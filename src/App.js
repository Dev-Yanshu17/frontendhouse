import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

// Pages
import Home from "./pages/Home/Home";
import Properties from "./pages/Properties/Properties";
import Services from "./pages/Services/Services";
import ServiceDetail from "./pages/Services/ServiceDetail";
import Contact from "./pages/Contact/Contact";
import About from "./pages/AboutUs/AboutUs";
import Inquiry from "./pages/Inquiry/Inquiry";
//import Login from "./pages/AdminLogin/AdminLogin";

// Components
import Navbar from "./components/Navbar/Navbar";
import Header from "./components/Footer/Header";
import ScrollToTop from "./ScrollToTop";


function App() {
  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  return (
    <BrowserRouter>
    {/* This fixes your scrolling issue */}
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/properties" element={<Properties />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/:id" element={<ServiceDetail />} />
        <Route path="/inquiry/:serviceName" element={<Inquiry />} />
        <Route path="/contact" element={<Contact />} />
        {/* <Route path="/login" element={<Login />} /> */}
        <Route path="/about" element={<About />} />
      </Routes>
      <Header />
    </BrowserRouter>
  );
}

export default App;