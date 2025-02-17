import React from 'react';
import { Routes, Route } from 'react-router-dom';
import OwnerPage from './Owner/OwnerPage';
import ProductAddPage from './Owner/ProductAddPage';
import ProductSalesPage from './Owner/ProductSalesPage';
import Register from './Owner/Registration';
import OwnerHome from './Owner/OwnerHome';
import ProtectedRoute from './ProtectedRoute'; // Import the ProtectedRoute component

const OwnerRoutes = () => {
  return (
    <Routes>
      <Route path="/Ownerpage" element={<OwnerPage />} />
      <Route path='/Register' element={<Register />} />
      <Route path="/Owner-Home" element={<OwnerHome />} />
      
      {/* Protect these routes with the 'owner' role */}
      <Route
        path="/Owner-Home/Add"
        element={<ProtectedRoute element={<ProductAddPage />} requiredRole="owner" />}
      />
      <Route
        path="/Owner-Home/Sale"
        element={<ProtectedRoute element={<ProductSalesPage />} requiredRole="owner" />}
      />
    </Routes>
  );
};

export default OwnerRoutes;
