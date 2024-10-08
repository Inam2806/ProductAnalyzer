import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../style/ProductAddPage.scss';
import NewProductModal from './AddnewProduct.jsx';
import InfoModal from './InfoModal.jsx'; // Import InfoModal

const ProductAddPage = () => {
    const [products, setProducts] = useState([]);
    const [newProductCode, setNewProductCode] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isInfoModalOpen, setIsInfoModalOpen] = useState(false); // State for InfoModal
    const [errorMessage, setErrorMessage] = useState('');
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        fetchData();
        fetchProfile();
    }, []);

    const fetchData = async () => {
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/products/addSaleX`, {}, config);
            setProducts(response.data.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const fetchProfile = async () => {
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/auth/profile`, config); // Fetch profile
            setProfile(response.data.profile); // Set the profile data in state
        } catch (error) {
            console.error('Error fetching profile:', error);
        }
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const openInfoModal = () => {
        setIsInfoModalOpen(true); // Open InfoModal
    };

    const closeInfoModal = () => {
        setIsInfoModalOpen(false); // Close InfoModal
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

                // Assuming the response contains the newly added product details
                const newProduct = {
                    productName: response.data.productName, // Make sure to adjust these fields according to your response structure
                    imageUrl: response.data.imageUrl,
                    status_0: response.data.status_0, // Adjust this as per your API response
                    size: response.data.size // Adjust this as per your API response
                };

                setProducts((prevProducts) => [...prevProducts, newProduct]); // Update the products state directly
                setErrorMessage(response.data.message); // Use the message from the response
                setNewProductCode(''); // Clear the input field after adding a product
            } else {
                setErrorMessage('Product code cannot be empty.'); // Set error message if product code is empty
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
                    {profile && profile.mainOwner === 1 && (
                        <li>
                            <Link to={`/Owner-Home/Sale`} className="product-button">Product Sales</Link>
                        </li>
                    )}
                    <li>
                        <Link to="/Owner-Home" className="product-button">Home</Link>
                    </li>
                </ul>
            </nav>
        
            <div className="product-form-container">
                <h2>Add Product</h2>
                <button className="new-product-modal-button" onClick={openModal}>Add New Product</button>
                {isModalOpen && <NewProductModal closeModal={closeModal} />}
                
                {/* Info Modal Button */}
                <button className="info-modal-button" onClick={openInfoModal}>Info</button>
                {isInfoModalOpen && <InfoModal closeModal={closeInfoModal} />}

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
                    product.productName && product.imageUrl ? ( // Check if product has valid data
                        <div className="product-card" key={`${product.productName}-${index}`}>
                            <img src={product.imageUrl} alt={product.productName} className="product-image" />
                            <div className="product-details">
                                <div className="product-name">{product.productName}</div>
                                <div className="product-count">Count: {product.status_0}</div>
                                <div className="product-size">Size: {product.size}</div>
                            </div>
                        </div>
                    ) : null // Render nothing for invalid products
                ))}
            </div>
        </div>
    );
}

export default ProductAddPage;
