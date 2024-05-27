import React from 'react';
import { Link } from 'react-router-dom';
import '../style/RetailerPage.scss';

const RetailerPage = ({ profile, onLogout }) => {

  return (
    <div className="containerX">
      <nav className="navbar">
        <ul>
          <li>
            <Link to={`/Retailer-Home/${profile.retailerName}-add`}>Buy by Retailer</Link>
          </li>
          <li>
            <Link to={`/Retailer-Home/${profile.retailerName}-sales`}>Product Verification</Link>
          </li>
        </ul>
      </nav>
      <h1>Company Dashboard: {profile.retailerName}</h1>
      <h2>Welcome, {profile.username}!</h2>

      <div className="welcome-container">
        <h2>Welcome to the Dashboard! </h2>
        <p>Learn more about brokers by navigating through the menu.</p>
      </div>

      <button className="logout" onClick={onLogout}>
        Logout
      </button>
    </div>
  );
};

export default RetailerPage;