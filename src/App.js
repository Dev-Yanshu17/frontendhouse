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
import Appointment from "./pages/Appointment/Appointment";
import FAQ from "./pages/FAQ/FAQ";

// ================= COMPONENTS =================
import Navbar from "./components/Navbar/Navbar";
import Header from "./components/Footer/Header";

// ================= SCROLL UTILITIES =================
import ScrollToTop from "./ScrollToTop"; 
import ScrollUpButton from "./components/ScrollUpButton/ScrollUpButton";

function App() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <BrowserRouter>
      {/* Scroll to top on route change */}
      <ScrollToTop />

      {/* Navbar */}
      <Navbar />

      {/* Floating bottom-right scroll button */}
      <ScrollUpButton />

      {/* App Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/properties" element={<Properties />} />
        <Route path="/property/:id" element={<PropertyDetails />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/:id" element={<ServiceDetail />} />
        <Route path="/appointment" element={<Appointment />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/faq" element={<FAQ />} />
      </Routes>

      {/* Footer */}
      <Header />
    </BrowserRouter>
  );
}

export default App;
