import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Correct named import

const ProtectedRoute = ({ element, requiredRole }) => {
  const token = localStorage.getItem('token'); // Get token from localStorage
  if (!token) {
    // If no token is found, redirect to login page (or another page)
    return <Navigate to="/" />;
  }

  try {
    // Decode the token to get the user data
    const decodedToken = jwtDecode(token);
    const { role } = decodedToken; // Extract the role from the decoded token

    // If the role doesn't match the required role, redirect to appropriate page
    if (requiredRole && role !== requiredRole) {
      return <Navigate to="/" />; // Adjust the redirect as needed
    }

    // If the token exists and role matches, render the protected route
    return element;
  } catch (error) {
    // If token decoding fails, redirect to login page
    return <Navigate to="/" />;
  }
};

export default ProtectedRoute;
