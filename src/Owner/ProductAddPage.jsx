import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../style/ProductAddPage.scss';
import NewProductModal from './AddnewProduct.jsx';

const ProductAddPage = ({ companyName }) => {
    const [products, setProducts] = useState([]);
    const [newProductCode, setNewProductCode] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        fetchData();
    });

    const fetchData = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/products/addX', { companyName: companyName });
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
            if (newProductCode.trim() !== "") {
                const code = newProductCode.trim();
    
                const response = await axios.post("http://localhost:5000/api/products/add", {
                    companyName: companyName,
                    productCode: code,
                });
    
               
                if (response.status === 200) {
                    
                    setErrorMessage("Product added successfully");
                   
                } 
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                if (error.response.data.message === 'Product code already exists') {
                    setErrorMessage(error.response.data.message);
                } else if (error.response.data.message === 'Product name and size combination does not exist. Do not add again.') {
                    setErrorMessage(error.response.data.message);
                }
            } else {
                console.error('Error adding product:', error);
                setErrorMessage('Failed to add product. Please try again.');
            }
        }
    };
    
    return (
        <div className='productaddX'>
            <nav className='centered-nav'>

            <ul>
          <li>
          <Link to={`/Owner-Home/${companyName}-sales`} className="product-button">Product Sales</Link>
          </li>
          
          <li>
          <Link to="/Owner-Home" className="Home-button">Home</Link>
          </li>

        </ul>
      </nav>
          <h2>Add {companyName} Product</h2>
          <button className="new-product-modal-button" onClick={openModal}>Add New Product</button>
          {isModalOpen && <NewProductModal closeModal={closeModal} companyName={companyName} />}
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
