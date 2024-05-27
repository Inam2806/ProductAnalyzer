import React, { useState } from 'react';
import axios from 'axios';

const BuyByRetailer = () => {
  const [companyName, setCompanyName] = useState('');
  const [productCode, setProductCode] = useState('');
  const [message, setMessage] = useState('');

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'companyName') {
      setCompanyName(value);
    } else if (name === 'productCode') {
      setProductCode(value);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/buybyretailer', { companyName, productCode });
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Error occurred while buying by retailer.');
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Buy By Retailer</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Company Name:
          <input type="text" name="companyName" value={companyName} onChange={handleInputChange} />
        </label>
        <label>
          Product Code:
          <input type="text" name="productCode" value={productCode} onChange={handleInputChange} />
        </label>
        <button type="submit">Buy</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default BuyByRetailer;