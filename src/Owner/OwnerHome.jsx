import React, { useState, useEffect } from 'react';
import Login from './Login';
import OwnerPage from './OwnerPage';
import axios from 'axios';
import '../style/Owner.scss';

const OwnerHome = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const [token, setToken] = useState(null); // State to store the token
  const [profile, setProfile] = useState(null); // State to store the user profile

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/auth/profile', {
          headers: {
            Authorization: `Bearer ${token}` // Include the token in the request headers
          }
        });
        setProfile(response.data.profile);
      } catch (error) {
        console.error('Profile retrieval failed:', error);
        // Handle profile retrieval error
      }
    };

    if (isLoggedIn && token) {
      fetchProfile();
    }
  }, [isLoggedIn, token]);

  const handleLogin = (token) => {
    if (token) { // Check if the token is valid
      setToken(token); // Store the token
      setIsLoggedIn(true);
      localStorage.setItem('token', token); // Store the token in local storage
      console.log('Token:', token); // Log the token to the console
    } else {
      console.error('Invalid token');
    }
  };

  const handleLogout = () => {
    setToken(null);
    setIsLoggedIn(false);
    localStorage.removeItem('token');
    console.log('Logged out');
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setToken(token);
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div className="container">
      
      {isLoggedIn? (
        profile? (
          <OwnerPage 
            className="owner-page" 
            profile={profile} 
            isLoggedIn={isLoggedIn} 
            onLogout={handleLogout} 
          /> 
          
        ) : (
          <button className="logout" onClick={handleLogout}>Logout</button>
        )
      ) : (
        <Login onLogin={handleLogin} /> 
        
      )}
  
    </div>
  );
};

export default OwnerHome;