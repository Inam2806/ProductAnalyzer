import React, { useState } from 'react';
import axios from 'axios';
import '../style/Login_Register.scss';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [companyCode, setCompanyCode] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/auth/login`, {
        username,
        password,
        companyCode
      });
      const token = response.data.token;
      if (token) {
        onLogin(token);
        localStorage.setItem('token', token);
        console.log('Login successful:', response.data);
      } else {
        setError('Invalid token');
      }
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <div className="container_login_register">
      <h1>Owner Dashboard</h1>
      <form className="form-container" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="login-input"
        />
        <div className="password-container">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
          />
          <button
            type="button"
            className={`eye-button ${showPassword ? "active" : ""}`}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
        </div>
        <input
          type="text"
          placeholder="Company Code"
          value={companyCode}
          onChange={(e) => setCompanyCode(e.target.value)}
          className="login-input"
        />
        <button className="login-register" type="submit">Login</button>
        {error && <p className="error-message">{error}</p>}
      </form>
      <p>Don't have an account? <a href="/register" className="login-register-link">Register</a></p>
    </div>
  );
};

export default Login;
