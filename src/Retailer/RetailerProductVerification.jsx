import React, { useState } from 'react';
import axios from 'axios';
import '../style/RetailerProductVerification.scss'; // Import your SCSS file
import { Link } from 'react-router-dom';
const RetailerProductVerification = () => {
  const [companyName, setCompanyName] = useState('');
  const [productCode, setProductCode] = useState('');
  const [verificationResult, setVerificationResult] = useState('');

  const handleVerification = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/products/verifyproduct', {
        companyName,
        productCode
      });
      setVerificationResult(response.data.message);
    } catch (error) {
      console.error('Error verifying product:', error);
      setVerificationResult('Failed to verify product');
    }
  };

  return (
    <div className="product-verification-container">
      <nav className="navbarXX">
        <ul>
          <li>
            <Link to={`/Retailer-Home`}>Retailer Home</Link>
          </li>
          <li>
          <Link to={`/Retailer-Home/Add`}>Buy by Retailer</Link>
          </li>
          <li>
            <Link to={`/Retailer-Home/Sales`}>Product Sales</Link>
          </li>
        </ul>
      </nav>
      <h2 className="product-verification-title">Retailer Product Verification</h2>
      <label className="product-verification-label">
        Company Name:
        <input
          className="product-verification-input"
          type="text"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />
      </label>
      <label className="product-verification-label">
        Product Code:
        <input
          className="product-verification-input"
          type="text"
          value={productCode}
          onChange={(e) => setProductCode(e.target.value)}
        />
      </label>
      <button className="product-verification-button" onClick={handleVerification}>Verify Product</button>
      {verificationResult && <p className="product-verification-result">Verification Result: {verificationResult}</p>}
    </div>
  );
};

export default RetailerProductVerification;

