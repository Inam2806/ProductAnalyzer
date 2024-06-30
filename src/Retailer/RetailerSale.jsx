import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../style/RetailerSale.scss';
import { Link } from 'react-router-dom';

const RetailerSale = () => {
  const [products, setProducts] = useState([]);
  const [companyName, setCompanyName] = useState('');
  const [productCode, setProductCode] = useState('');
  const [message, setMessage] = useState('');
  const [sortDirection, setSortDirection] = useState('asc'); // 'asc' or 'desc'
  const [sortedProducts, setSortedProducts] = useState([]);

  useEffect(() => {
    fetchData();
  });

  useEffect(() => {
    setSortedProducts([...products]); 
  }, [products]);

  const fetchData = async () => {
    try {
        const token = localStorage.getItem('token'); 
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
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await axios.post(
        'http://localhost:5000/api/auth/retailerSale',
        { companyName, productCode },
        config
      );
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  const sortByCount = () => {
    const direction = sortDirection === 'asc' ? 1 : -1;
    const sorted = [...sortedProducts].sort((a, b) => {
      return direction * (a.countX - b.countX);
    });
    setSortedProducts(sorted);
    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
  };

  return (
    <div className='RetailerMain'>
      <div className='RetailerXX'>
        <nav className="navbarXX">
          <ul>
            <li>
              <Link to={`/Retailer-Home`}>Retailer Home</Link>
            </li>
            <li>
              <Link to={`/Retailer-Home/Add`}>Buy by Retailer</Link>
            </li>
            <li>
              <Link to={`/Retailer-Home/Verification`}>Product Verification</Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className='Retailer-buy-sale'>
        <h2>Retailer Sales</h2>
        <form className='form-buy-sale' onSubmit={handleSubmit}>
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
      <div className="product-table-container">
        <table className="product-table">
          <thead>
            <tr>
              <th>Sign No</th>
              <th>Image</th>
              <th>Name</th>
              <th onClick={sortByCount} style={{ cursor: 'pointer' }}>
              TotalSale <span>{sortDirection === 'asc' ? '▲' : '▼'}</span>
              </th>
              <th>Size</th>
            </tr>
          </thead>
          <tbody>
{sortedProducts.map((product, index) => (
  <tr key={`${product.productName}-${index}`}>
    <td>{index + 1}</td>
    <td>
      <img src={product.imageUrl} alt={product.productName} className="product-image" />
    </td>
    <td>{product.productName}</td>
    <td>{product.TotalSale}</td>
    <td>{product.size}</td>
     {/* New column displaying sequential numbers */}
  </tr>
))}
</tbody>

        </table>
      </div>
    </div>
  );
};

export default RetailerSale;
