import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../style/ProductSalesPage.scss';

const ProductSalesPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalProfit, setTotalProfit] = useState(0);
  const [highestSaleProduct, setHighestSaleProduct] = useState(null);
  const [highestProfitProduct, setHighestProfitProduct] = useState(null);

  useEffect(() => {
    fetchData();
  }, []); // Empty dependency array ensures this effect runs only once after the initial render

  const fetchData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token'); // Assuming you store the token in localStorage
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/products/addSaleX`, {}, config);
      const { data, totalProfit, highestSaleProduct, highestProfitProduct } = response.data;

      setProducts(data);
      setTotalProfit(totalProfit);
      setHighestSaleProduct(highestSaleProduct);
      setHighestProfitProduct(highestProfitProduct);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const calculateTotalMakingCost = (product) => product.makingCost * product.status_1;

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <div>

<nav className="centered-nav-Owner">
        <ul>
          <li>
            <Link to={`/Owner-Home/Add`} className="product-button">
              Product Add
            </Link>
          </li>
          <li>
            <Link to="/Owner-Home" className="product-button">
              Home
            </Link>
          </li>
        </ul>
      </nav>
    <div className="ProductSalesPage">
      
      <h2>Product Sales</h2>

      <Slider {...settings} className="slider">
        <div className="slider-item">
          {totalProfit !== null && (
            <div>
              <h3>Total Profit:</h3>
              <p>{totalProfit}</p>
            </div>
          )}
        </div>
        <div className="slider-item">
          {highestSaleProduct && (
            <div>
              <h3>Highest Sale Product:</h3>
              <p>{highestSaleProduct.productName} (Size: {highestSaleProduct.size}, Profit: {highestSaleProduct.profit})</p>
            </div>
          )}
        </div>
        <div className="slider-item">
          {highestProfitProduct && (
            <div>
              <h3>Highest Profit Product:</h3>
              <p>{highestProfitProduct.productName} (Size: {highestProfitProduct.size}, Product Profit: {highestProfitProduct.productProfit})</p>
            </div>
          )}
        </div>
      </Slider>

      <table className="product-sales-table">
        <thead>
          <tr>
            <th className="product-size">Product Size</th>
            <th className="product-name">Product Name</th>
            <th className="add-count">Product Add</th>
            <th className="sales-count">Product Sale</th>
            <th className="making-cost">Total Making Cost</th>
            <th className="profit">Total Profit</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={`${product.productName}-${index}`}>
              <td className="product-name">{product.size}</td>
              <td className="product-name">{product.productName}</td>
              <td className="add-count">{product.status_0}</td>
              <td className="sales-count">{product.status_1}</td>
              <td className="making-cost">{calculateTotalMakingCost(product)}</td>
              <td className="profit">{product.profit * product.status_1}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default ProductSalesPage;
