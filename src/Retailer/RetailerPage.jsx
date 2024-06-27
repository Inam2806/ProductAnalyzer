import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../style/RetailerPage.scss';
import '../style/CommonRetailer.scss';

const RetailerPage = ({ profile, onLogout }) => {
  const [showSettings, setShowSettings] = useState(false);

  const handleMouseEnter = () => {
    setShowSettings(true);
  };

  const handleMouseLeave = () => {
    setShowSettings(false);
  };

  return (
    <div className="containerXX">
      <div
        className="settings-container"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <i className="fa fa-gear" />
        {showSettings && (
          <div className="settings-dropdown">
            <Link className="hidden-profile" to={`/Retailer-Home/Profile`}>
              Profile
            </Link>
            <Link className="hidden-logout" onClick={onLogout}>
              Logout
            </Link>
          </div>
        )}
      </div>

      <nav className="navbarXX">
        <ul>
          <li>
            <Link to={`/Retailer-Home/Add`}>Buy by Retailer</Link>
          </li>
          <li>
            <Link to={`/Retailer-Home/Verification`}>Product Verification</Link>
          </li>
          <li>
            <Link to={`/Retailer-Home/Sales`}>Product Sales</Link>
          </li>
        </ul>
      </nav>

      <h1>Company Dashboard: {profile.retailer_name}</h1>
      <h2>Welcome, {profile.username}!</h2>

      <div className="welcome-container">
        <h2>Welcome to the Dashboard! </h2>
        <p>Learn more about brokers by navigating through the menu.</p>
      </div>

      <button className="logoutRetailer" onClick={onLogout}>
        Logout
      </button>
    </div>
  );
};

export default RetailerPage;
