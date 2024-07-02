import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../style/BuyByRetailer.scss';
import { Link } from 'react-router-dom';
const BuyByRetailer = () => {
  const [products, setProducts] = useState([]);
  const [companyName, setCompanyName] = useState('');
  const [productCode, setProductCode] = useState('');
  const [message, setMessage] = useState('');
  useEffect(() => {
    fetchData();
});
const fetchData = async () => {
  try {
      const token = localStorage.getItem('token'); // Assuming you store the token in localStorage
      const config = {
          headers: { Authorization: `Bearer ${token}` }
      };

      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/products/addRetailerX`, {}, config);
      setProducts(response.data.data);
  } catch (error) {
      console.error('Error fetching data:', error);
  }
};

const handleSubmit = async (e) => {
  e.preventDefault();
  const token = localStorage.getItem('token'); // Get the token from local storage
  const config = {
      headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
      },
  };
  try {
      const response = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/api/auth/buybyretailer`,
          {  productCode },
          config
      );
      setMessage(response.data.message);
  } catch (error) {
      setMessage(error.response ? error.response.data.message : 'Error occurred');
  }
};


  return (
  <div className='RetailerMain'>
    <div className="RetailerXX">
       
       <nav className="navbarXX">
        <ul>
         
        <li>
            <Link to={`/Retailer-Home`}>Retailer Home</Link>
          </li>
          <li>
          <Link to={`/Retailer-Home/Verification`}>Product Verification</Link>
          </li>
          <li>
            <Link to={`/Retailer-Home/Sales`}>Product Sales</Link>
          </li>
        </ul>
      </nav>
      </div>
      <div className='Retailer-buy-sale'>
       <h2>Add Product</h2>
      <form  className='form-buy-sale' onSubmit={handleSubmit}>
        <div className="form-field">
          <label>Company Name:</label>
          <input type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
        </div>
        <div className="form-field">
          <label>Product Code:</label>
          <input type="text" value={productCode} onChange={(e) => setProductCode(e.target.value)} />
        </div>
        <button type="submit-buy-sale">Submit</button>
       
      </form>
 
      {message && <p className='message-buy-sale'>{message}</p>}
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