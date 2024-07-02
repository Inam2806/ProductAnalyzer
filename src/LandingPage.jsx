import React from 'react';
import { useNavigate } from 'react-router-dom';
import './style/LandPage.scss';

function LandingPage() {
  const navigate = useNavigate();

  const handleOwnerClick = () => {
    navigate('/Owner-Home'); 
  };

  return (
    <div className="landing-page">
      <h1 className="landing-title">Welcome to Our Amazing Platform</h1>
      <p className="landing-description">
        Dive into a world of opportunities and watch your business soar!
      </p>
      <div className="button-container">
        <button className="owner-button" onClick={handleOwnerClick}>OWNER</button>
        <button className="retailer-button" onClick={() => navigate('/Retailer-Home')}>RETAILER</button>
        <button className="consumer-button" onClick={() => navigate('/consumer')}>CONSUMER</button>
      </div>
      <div className="additional-content">
        <h2>Why Choose Us?</h2>
        <p>Here's why our platform stands out:</p>
        <ul>
          <li>Advanced analytics to supercharge your strategies</li>
          <li>Seamless integration with top eCommerce platforms</li>
          <li>Exceptional support to guide you every step</li>
        </ul>
        <p>Ready to embark on this journey? Click one of the buttons above!</p>
      </div>
    </div>
  );
}

export default LandingPage;
