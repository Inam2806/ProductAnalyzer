import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from './Footer';
import LandingPage from './LandingPage';
import About from './About';
import Contact from './Contact';
import NavBar from './Navbar';
import OwnerRoutes from './OwnerRoutes';
import RetailerRoutes from './RetailerRoutes'; // Import RetailerRoutes
import Consumer from './consumer/Consumer.jsx';
function App() {
  const [navbarCollapsed, setNavbarCollapsed] = useState(true); // State to manage navbar collapse

  const handleToggleNavbar = () => {
    setNavbarCollapsed(!navbarCollapsed); // Toggle navbar collapse state
  };

  return (
    <Router>
      <NavBar onToggle={handleToggleNavbar} /> 
      <OwnerRoutes />
      <RetailerRoutes /> 
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/consumer" element={<Consumer />} />

      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
