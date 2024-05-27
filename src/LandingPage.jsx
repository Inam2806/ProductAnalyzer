import React from 'react';
import { useNavigate } from 'react-router-dom';
import './style/LandPage.scss';


function LandingPage() {
  const navigate = useNavigate();

  const handleOwnerClick = () => {
    navigate('/Owner-Home'); 
  };

  return (
    <div>
    <div className="landing-page">
      <h1 className="landing-title">Welcome to our website</h1>
      <p className="landing-description">
        Explore our platform and discover how we can help you grow your business!
      </p>
      <div className="button-container">
        <button className="owner-button" onClick={handleOwnerClick}>OWNER</button>
        <button className="retailer-button" onClick={() => navigate('/Retailer-Home')}>RETAILER</button>
        <button className="consumer-button" onClick={() => navigate('/consumer')}>CONSUMER</button>
      </div>
      <div className="additional-content">
        <h2>Why Choose Us?</h2>
        <p>Here are some reasons why you should choose our platform:</p>
        <ul>
          <li>Advanced analytics to optimize your business strategies</li>
          <li>Seamless integration with leading eCommerce platforms</li>
          <li>Exceptional customer support to guide you every step of the way</li>
        </ul>
        <p>Ready to get started? Click on one of the buttons above!</p>
      </div>
      
      
        
      
    </div>
  
   </div>
  );
}

export default LandingPage;
