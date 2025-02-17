import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../style/Login_Register.scss';

const Registration = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [retailerCode, setRetailerCode] = useState('');
  const [error, setError] = useState('');
    const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/Retailer-Home'); // Redirect logged-in users
    }
  }, [navigate]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/auth/RetailerRegister`, {
        username,
        email,
        password,
        retailerCode
      });

      console.log('Registration successful:', response.data);
      navigate('/Retailer-Home'); 
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setError(error.response.data.message);
      } else {
        setError('Registration failed');
      }
    }
  };

  return (
    <div className="container_login_register">
       <h1>Retailer Dashboard</h1>
      <form className="form-container" onSubmit={handleSubmit}>
        <h2>Registration </h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="text"
          placeholder="Retailer Code"
          value={retailerCode}
          onChange={(e) => setRetailerCode(e.target.value)}
        />
        <button  className='login-register' type="submit">Register</button>
        {error && <p className="error-message">{error}</p>}
      </form>
      <p>Already have an account? <a href="/Retailer-Home" className="login-register-link">Login</a></p>
    </div>
  );
};

export default Registration;
