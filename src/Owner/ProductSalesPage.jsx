
  import React, { useState, useEffect } from 'react';
  import { Link } from 'react-router-dom';
  import axios from 'axios';
  import '../style/ProductSalesPage.scss';

  const useFetchProducts = (companyName) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
      const fetchData = async () => {
        setLoading(true);
        try {
          const response = await axios.post('http://localhost:5000/api/products/addX', { companyName });
          setProducts(response.data.data);
        } catch (error) {
          setError(error);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }, [companyName]);

    return { products, loading, error };
  };

  const ProductSalesPage = ({ companyName }) => {
    const { products, loading, error } = useFetchProducts(companyName);

    if (loading) {
      return <div>Loading...</div>;
    }

    if (error) {
      return <div>Error: {error.message}</div>;
    }

    const calculateTotalMakingCost = (product) => product.makingCost * product.status_1;
    const calculateTotalProfit = (product) => product.profit * product.status_1;

    return (
      <div className="ProductSalesPage">
        <nav className="centered-nav">
          <ul>
            <li>
              <Link to={`/Owner-Home/${companyName}-add`} className="product-button">
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
        <h2>{companyName} Product Sales</h2>
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
                <td className="profit">{calculateTotalProfit(product)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  export default ProductSalesPage;