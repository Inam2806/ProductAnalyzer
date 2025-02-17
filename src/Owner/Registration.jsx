import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../style/Login_Register.scss';

const Registration = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [companyCode, setCompanyCode] = useState('');
  const [error, setError] = useState('');
  
  const navigate = useNavigate();

  // Check if user is already logged in
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/Owner-Home'); // Redirect logged-in users
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/auth/register`, {
        username,
        email,
        password,
        companyCode,
      });

      console.log('Registration successful:', response.data);
      
      navigate('/Owner-Home'); // Redirect to login after registration

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
      <h1>Owner Dashboard</h1>
      <div className="test-credentials">
        <p>You can use the company code <strong>NIKE0dbjwcjaj13j2492</strong> to register through this page.</p>
        <p className="disclaimer">
          Disclaimer: These credentials are provided for demonstration purposes only. 
          Do not use personal or sensitive data.
        </p>
      </div>
      <form className="form-container" onSubmit={handleSubmit}>
        <h2>Registration</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="login-input"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="login-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="login-input"
        />
        <input
          type="text"
          placeholder="Company Code"
          value={companyCode}
          onChange={(e) => setCompanyCode(e.target.value)}
          className="login-input"
        />
        <button className="login-register" type="submit">Register</button>
        {error && <p className="error-message">{error}</p>}
      </form>
      <p>Already have an account? <a href="/Owner-Home" className="login-register-link">Login</a></p>
    </div>
  );
};

export default Registration;
