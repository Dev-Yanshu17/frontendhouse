import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

// ================= PAGES =================
import Home from "./pages/Home/Home";
import Properties from "./pages/Properties/Properties";
import PropertyDetails from "./pages/Properties/PropertyDetails";
import Services from "./pages/Services/Services";
import ServiceDetail from "./pages/Services/ServiceDetail";
import Contact from "./pages/Contact/Contact";
import About from "./pages/AboutUs/AboutUs";
import Inquiry from "./pages/Inquiry/Inquiry";

// ================= COMPONENTS =================
import Navbar from "./components/Navbar/Navbar";
import Header from "./components/Footer/Header";
import ScrollToTop from "./ScrollToTop";

function App() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/properties" element={<Properties />} />
        <Route path="/property/:id" element={<PropertyDetails />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/:id" element={<ServiceDetail />} />
        <Route path="/inquiry/:serviceName" element={<Inquiry />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
      </Routes>

      <Header />
    </BrowserRouter>
  );
}

export default App;
