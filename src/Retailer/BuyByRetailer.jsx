import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../style/BuyByRetailer.scss';
import { Link } from 'react-router-dom';
const BuyByRetailer = ({ retailerName }) => {
  const [products, setProducts] = useState([]);
  const [companyName, setCompanyName] = useState('');
  const [productCode, setProductCode] = useState('');
  const [message, setMessage] = useState('');
  useEffect(() => {
    fetchData();
});
const fetchData = async () => {
  try {
      const response = await axios.post('http://localhost:5000/api/products/addRetailerX', { retailerName: retailerName });
      setProducts(response.data.data);
  } catch (error) {
      console.error('Error fetching data:', error);
  }
};
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('retailerToken'); // Get the token from local storage
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
      },
    };
    try {
      const response = await axios.post(
        'http://localhost:5000/api/auth/buybyretailer',
        { retailerName, companyName, productCode },
        config
      );
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };


  return (
  <div>
    <div className="RetailerProductAdd">
       
       <nav className="navbar">
        <ul>
         
        <li>
            <Link to={`/Retailer-Home`}>Retailer Home</Link>
          </li>
          <li>
            <Link to='/Retailer-Home'>Retailer Home</Link>
          </li>
        </ul>
      </nav>
      </div>
      <div className='buy-by-retailerX'>

      
    <div className="buy-by-retailer">
      <h2>Buy by Retailer</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <label>Company Name:</label>
          <input type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
        </div>
        <div className="form-field">
          <label>Product Code:</label>
          <input type="text" value={productCode} onChange={(e) => setProductCode(e.target.value)} />
        </div>
        <button type="submit">Submit</button>
        {message && <p className='message'>{message}</p>}
      </form>
      </div>
    </div>
      <div className="product-cards-container">
            {products.map((product, index) => (
              <div className="product-card" key={`${product.productName}-${index}`}>
                <img src={product.imageUrl} alt={product.productName} className="product-image" />
                <div className="product-details">
                  <div className="product-name">{product.productName}</div>
                  <div className="product-count">Count: {product.countX}</div>
                  <div className="product-size">Size: {product.size}</div>
                </div>
              </div>
            ))}
          </div>
    </div>
  );
}

export default BuyByRetailer;