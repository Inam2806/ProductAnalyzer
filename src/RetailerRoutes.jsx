import React from 'react';
import { Routes, Route } from 'react-router-dom';
import RetailerHome from './Retailer/RetailerHome';
import RetailerRegistration from './Retailer/RetailerRegistration';
import BuyByRetailer from './Retailer/BuyByRetailer';
import ProfileRetailer from './Retailer/ProfileRetailer';
import RetailerProductVerification from './Retailer/RetailerProductVerification';
import RetailerSale from './Retailer/RetailerSale';
import ProtectedRoute from './ProtectedRoute'; // Import the ProtectedRoute component

const RetailerRoutes = () => {
  return (
    <Routes>
      <Route path='/Retailer-Home' element={<RetailerHome />} />
      <Route path='/Retailer-Registration' element={<RetailerRegistration />} />
      
      {/* Protect retailer-specific routes */}
      <Route 
        path='/Retailer-Home/Add' 
        element={<ProtectedRoute element={<BuyByRetailer />} requiredRole="retailer" />} 
      />
      <Route 
        path='/Retailer-Home/Verification' 
        element={<ProtectedRoute element={<RetailerProductVerification />} requiredRole="retailer" />} 
      />
      <Route 
        path='/Retailer-Home/Sales' 
        element={<ProtectedRoute element={<RetailerSale />} requiredRole="retailer" />} 
      />
      <Route 
        path='/Retailer-Home/Profile' 
        element={<ProtectedRoute element={<ProfileRetailer />} requiredRole="retailer" />} 
      />
    </Routes>
  );
};

export default RetailerRoutes;
