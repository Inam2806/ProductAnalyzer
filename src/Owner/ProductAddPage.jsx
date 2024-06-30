import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../style/ProductAddPage.scss';
import NewProductModal from './AddnewProduct.jsx';

const ProductAddPage = () => {
    const [products, setProducts] = useState([]);
    const [newProductCode, setNewProductCode] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        fetchData();
    });

    const fetchData = async () => {
        try {
          const token = localStorage.getItem('token'); // Assuming you store the token in localStorage
          const config = {
              headers: { Authorization: `Bearer ${token}` }
          };
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/products/addSaleX`, {}, config);
            setProducts(response.data.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };
    const addProduct = async () => {
      try {
          const token = localStorage.getItem('token');
          const config = {
              headers: { Authorization: `Bearer ${token}` }
          };
  
          if (newProductCode.trim() !== "") {
              const code = newProductCode.trim();
  
              const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/products/add`, {
                  productCode: code,
              }, config);
  
              setErrorMessage(response.data.message); // Directly use the message from the response
          }
      } catch (error) {
          if (error.response) {
              setErrorMessage(error.response.data.message); // Use the message from the response
          } else {
              setErrorMessage('Failed to add product. Please try again.'); // Default message for unexpected errors
          }
      }
  };
  
    
    return (
        <div className='productaddX'>
            <nav className='centered-nav-Owner'>

            <ul>
          <li>
          <Link to={`/Owner-Home/Sale`} className="product-button">Product Sales</Link>
          </li>
          
          <li>
          <Link to="/Owner-Home" className="product-button">Home</Link>
          </li>

        </ul>
      </nav>
        
        <div className="product-form-container">
        <h2>Add  Product</h2>
          <button className="new-product-modal-button" onClick={openModal}>Add New Product</button>
          {isModalOpen && <NewProductModal closeModal={closeModal}  />}
        
          <div className="product-form">
            <label><h2>Product Code:</h2></label>
            <input
              type="text"
              value={newProductCode}
              onChange={(e) => setNewProductCode(e.target.value)}
              placeholder="Enter product code"
            />
            <button onClick={addProduct}>Add Product</button>
            </div>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
          </div>
        
          <div className="product-cards-container">
            {products.map((product, index) => (
              <div className="product-card" key={`${product.productName}-${index}`}>
                <img src={product.imageUrl} alt={product.productName} className="product-image" />
                <div className="product-details">
                  <div className="product-name">{product.productName}</div>
                  <div className="product-count">Count: {product.status_0}</div>
                  <div className="product-size">Size: {product.size}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
}

export default ProductAddPage;
