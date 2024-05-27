import React, { useState } from 'react';
import axios from 'axios';
import '../style/Login_Register.scss'; 

const Registration = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [companyCode, setCompanyCode] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        username,
        email,
        password,
        companyCode
      });

      console.log('Registration successful:', response.data);
      
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
      <form className="form-container" onSubmit={handleSubmit}>
        <h2>Registration</h2>
        <p>You can use company code <strong>NIKE0dbjwcjaj13j2492</strong> to register through this page.</p>
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
          placeholder="Company Code"
          value={companyCode}
          onChange={(e) => setCompanyCode(e.target.value)}
        />
        <button  className='login-register' type="submit">Register</button>
        {error && <p className="error-message">{error}</p>}
      </form>
      <p>Already have an account? <a href="/Owner-Home" className="login-register-link">Login</a></p>
    </div>
  );
};

export default Registration;
