import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from './Footer';
import OwnerPage from './Owner/OwnerPage';
import LandingPage from './LandingPage';
import ProductAddPage from './Owner/ProductAddPage';
import ProductSalesPage from './Owner/ProductSalesPage';
import About from './About';
import Contact from './Contact';
import RetailerSale from './Retailer/RetailerSale';
import Register from './Owner/Registration';
import RetailerRegistration from './Retailer/RetailerRegistration';
import OwnerHome from './Owner/OwnerHome';
import RetailerHome from './Retailer/RetailerHome';
import BuyByRetailer from './Retailer/BuyByRetailer';
import ProfileRetailer from './Retailer/ProfileRetailer';
import RetailerProductVerification from './Retailer/RetailerProductVerification';
import ConsumerX from './consumer/Consumer';

import NavBar from './Navbar';

function App() {
 
 
  const [navbarCollapsed, setNavbarCollapsed] = useState(true); // State to manage navbar collapse

  const handleToggleNavbar = () => {
    setNavbarCollapsed(!navbarCollapsed); // Toggle navbar collapse state
  };


  return (
    <Router>
     <NavBar onToggle={handleToggleNavbar} /> 
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/ownerpage" element={<OwnerPage />} />
       
        <Route path='/register' element={<Register />} />
    
        <Route path="/Owner-Home" element={<OwnerHome />} />
        <Route path='/Retailer-Home' element={<RetailerHome />} />
        <Route path='/Retailer-Registration' element={<RetailerRegistration />} />
        <Route path={`/Owner-Home/Add`} element={<ProductAddPage  />} />
        <Route path={`/Owner-Home/Sale`} element={<ProductSalesPage  />} />
       
        <Route path={"/Retailer-Home/Add"} element={<BuyByRetailer />} />
        <Route path={`/Retailer-Home/Verification`}  element={<RetailerProductVerification />}/>
        <Route  path={`/Retailer-Home/Sales`} element={<RetailerSale  />}/>
        <Route  path={`/Retailer-Home/Profile`}  element={<ProfileRetailer />} />
        
        <Route path="/consumer" element={<ConsumerX />} />
        <Route path="/about" element={<About />} />
        
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer/>
    </Router>
    
  );
}

export default App;
