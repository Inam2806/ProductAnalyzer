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
      const token = localStorage.getItem('token');
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
  
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/products/addnewproduct`,
        { productName, size, makingCost, profit, imageUrl },
        config
      );
  
      if (response.data.success) {
        setMessage('Product added successfully!');
        closeModal(); // Close modal only on success
      }
    } catch (error) {
      // Handle 400 Bad Request separately
      if (error.response) {
        if (error.response.status === 400 && error.response.data.message === "Product is already added.") {
          setMessage("Product is already added."); // Show correct message
        } else {
          setMessage(error.response.data.message || "Error adding product. Please try again later.");
        }
      } else {
        setMessage("Error adding product. Please try again later.");
      }
      console.error("Error adding product:", error);
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
