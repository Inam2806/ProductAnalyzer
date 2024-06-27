import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
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
  const [companyNames, setCompanyNames] = useState([]);
 
  const [navbarCollapsed, setNavbarCollapsed] = useState(true); // State to manage navbar collapse

  const handleToggleNavbar = () => {
    setNavbarCollapsed(!navbarCollapsed); // Toggle navbar collapse state
  };
  useEffect(() => {
    async function fetchCompanyNames() {
      try {
        const response = await axios.get('http://localhost:5000/api/auth/company/all');
        setCompanyNames(response.data.company_names);
      } catch (error) {
        console.error(error);
      }
    }


    fetchCompanyNames();
  
  }, []);

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
        {companyNames.map(companyName => (
          <Route
            key={companyName}
            path={`/Owner-Home/${companyName}-add`}
            element={<ProductAddPage companyName={companyName} />}
          />
        ))}
        {companyNames.map(companyName => (
          <Route
            key={companyName}
            path={`/Owner-Home/${companyName}-sales`}
            element={<ProductSalesPage companyName={companyName} />}
          />
        ))}
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
