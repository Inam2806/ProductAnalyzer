const countSchema_Retailer = new mongoose.Schema({
    productName: String,
    size: String,
    countX: { type: Number, default: 0 },
    price: Number,
    Productprofit: { type: Number, default: 0 },
    imageUrl: String, // new field for image URL
});

// Create a function to generate count model
const createCountModelr = (retailerName) => {
    return mongoose.model(retailerName + '_Count', countSchema_Retailer);
};
app.post('/api/auth/buybyretailer', async (req, res) => {
    const { retailerName,companyName, productCode } = req.body;
  
    try {
      // Check if company name exists in the database
      const company = await Company.findOne({ company_name: companyName });
    // Get or create the count model based on companyName
    const Countr= createCountModelr(retailerName);
      if (company) {
        // Create product and count models
        const ProductModel = createProductModel(companyName);
        const CountModel = createCountModel(companyName);
  
        // Get size and product name from product code
        const lowerCaseProductCode = productCode.toLowerCase();
        const size = lowerCaseProductCode.substring(0, 3).toUpperCase().replace(/^0/, '').replace(/^0/, '');
        const productName = lowerCaseProductCode.substring(17);
       
        // Check if product code exists in the product model
        const product = await ProductModel.findOne({ productCode: productCode });
  
        if (product) {
          if (product.status === 0) {
            // Update product status and count
            await ProductModel.updateOne({ productCode: productCode }, { status: 1 });
            await CountModel.updateOne(
              { productName, size },
              { $inc: { status_1: 1 } }
            );
             // Update count model
             await Countr.updateOne(
                { productName: productName, size: size },
                { $inc: { status_0: 1 } }
            );
  
            res.status(200).json({ message: 'Product add successfully' });
          } else {
            res.status(400).json({ message: 'Product is already updated.' });
          }
        } else {
          res.status(404).json({ message: 'Product code not found.' });
        }
      } else {
        res.status(404).json({ message: 'Company name not found.' });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });