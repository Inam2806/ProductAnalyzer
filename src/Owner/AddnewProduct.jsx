import React, { useState } from 'react';
import axios from 'axios';
import '../style/Addnewproduct.scss';

const NewProductModal = ({ closeModal }) => {
  const [productName, setProductName] = useState('');
  const [size, setSize] = useState('');
  const [makingCost, setMakingCost] = useState('');
  const [profit, setProfit] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [message, setMessage] = useState('');

  const handleAddProduct = async () => {
    try {
      const token = localStorage.getItem('token'); // Assuming you store the token in localStorage
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/products/addnewproduct`, {
        productName,
        size,
        makingCost,
        profit,
        imageUrl, // Include imageUrl in the request
      }, config);
      if (response.data.success) {
        closeModal(); // Close modal after successful product addition
        setMessage('Product added successfully!'); // Set success message
      } else {
        // Handle error
        console.error('Failed to add product:', response.data.message);
        setMessage('Failed to add product. Please try again later.'); // Set error message
      }
    } catch (error) {
      // Handle error
      console.error('Error adding product:', error);
      setMessage('Error adding product. Please try again later.'); // Set error message
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={closeModal}>&times;</span>
        <label>Product Name:</label>
        <input
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          placeholder="Enter product name"
          maxLength="50"
        />
        <label>Size:</label>
        <input
          type="text"
          value={size}
          onChange={(e) => setSize(e.target.value)}
          placeholder="Enter product size"
          maxLength="50"
        />
        <label>Making Cost:</label>
        <input
          type="text"
          value={makingCost}
          onChange={(e) => setMakingCost(e.target.value)}
          placeholder="Enter making cost"
          maxLength="50"
        />
        <label>Profit:</label>
        <input
          type="text"
          value={profit}
          onChange={(e) => setProfit(e.target.value)}
          placeholder="Enter profit"
          maxLength="50"
        />
        <label>Image URL:</label>
        <input
          type="text"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="Enter image URL"
        />
        <button onClick={handleAddProduct}>Add Product</button>
        {message && <div className="message">{message}</div>}
      </div>
    </div>
  );
};

export default NewProductModal;
