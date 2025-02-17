import React from 'react';
import '../style/InfoModal.scss'; // Import your CSS styles for the modal

const InfoModal = ({ closeModal }) => {
    return (
        <div className="modal">
            <div className="modal-content info-modal">
                <h2>Product Code Format</h2>
                <p>To add a product code, use the following format:</p>
                <p><strong>Brand name, 3 digits for size, 4 digits for price, 10 random characters for code, followed by the product name.</strong></p>
                <p>Example: <strong>Nike-0XL3000wwesdfcvb2Short</strong></p>
                <ul>
                    <li>Brand: Nike</li>
                    <li>Size: XL</li>
                    <li>Price: 3000</li>
                    <li>Code: wwesdfcvb2</li>
                    <li>Product Name: Short</li>
                </ul>
                <span className="close" onClick={closeModal}>&times;</span>
            </div>
        </div>
    );
};

export default InfoModal;
