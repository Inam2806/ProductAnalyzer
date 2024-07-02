import React, { useState, useEffect } from 'react';
import RetailerLogin from './RetailerLogin';
import RetailerPage from './RetailerPage';
import axios from 'axios';

const RetailerHome = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (isLoggedIn && token) {
        try {
          const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/auth/Retailerprofile`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setProfile(response.data.profile);
        } catch (error) {
          console.error('Profile retrieval failed:', error);
          handleLogout();
        }
      }
    };

    fetchProfile();
  }, [isLoggedIn, token]);

  const handleLogin = (newToken) => {
    if (newToken) {
      setToken(newToken);
      setIsLoggedIn(true);
      localStorage.setItem('token', newToken);
      console.log('Token:', newToken);
    } else {
      console.error('Invalid token');
    }
  };

  const handleLogout = () => {
    setToken(null);
    setIsLoggedIn(false);
    setProfile(null);
    localStorage.removeItem('token');
    console.log('Logged out');
  };

  return (
    <div className="container">
      {isLoggedIn ? (
        profile ? (
          <RetailerPage className="owner-page" profile={profile} onLogout={handleLogout} />
        ) : (
          <p><button className="logout" onClick={handleLogout}>Logout</button></p>
        )
      ) : (
        <RetailerLogin onLogin={handleLogin} />
      )}
    </div>
  );
};

export default RetailerHome;
