const express = require('express');
const router = express.Router();
// API endpoint to verify a product

  

router.get('/api/products/verify_product', async (req, res) => {
    const { companyName, productCode } = req.body;
    try {
        // Get the model based on companyName
        const Product = createProductModel(companyName);

        // Check if the product with the given code exists in the collection
        const existingProduct = await Product.findOne({ productCode });

        if (existingProduct) {
            if (existingProduct.companyName === companyName) {
                res.status(200).json({ message: 'Verify product' });
            } else {
                res.status(200).json({ message: 'Fake product' });
            }
        } else {
            res.status(200).json({ message: 'Fake product' }); // If product not found, show fake product
        }
    } catch (error) {
        console.error('Error verifying product:', error);
        res.status(500).json({ error: 'Failed to verify product' });
    }
});

module.exports = router;