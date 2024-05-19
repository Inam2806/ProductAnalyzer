        // index.js
        const express = require('express');
        const mongoose = require('mongoose');
        const bcrypt = require('bcrypt');
        const jwt = require('jsonwebtoken');
        require('dotenv').config();
        const cors = require('cors');
        const app = express();
        const PORT = process.env.PORT || 5000;
        const bodyParser = require('body-parser');
        // Apply express.json() middleware to parse JSON request bodies
        app.use(express.json());
        app.use(cors());
        const retailerRouter = require('./Retailer');
        app.use(retailerRouter);
        mongoose.connect(process.env.MONGODB_URI)
            .then(() => console.log('Connected to MongoDB'))
            .catch(err => console.error('Failed to connect to MongoDB:', err));

        const Registration = mongoose.model('Registration', new mongoose.Schema({
            username: String,
            email: String,
            password: String, // Note: You can remove this field if you're not storing passwords
            companyCode: String,
            registrationDate: { type: Date, default: Date.now }
        }));

        const Company = mongoose.model('Company', new mongoose.Schema({
            company_name: String,
            company_code: String
        }));
// Route to get all company names
app.get('/api/auth/company/all', async (req, res) => {
    try {
      const companies = await Company.find({}, 'company_name');
      if (!companies) {
        return res.status(404).json({ message: "No companies found" });
      }
      const companyNames = companies.map(company => company.company_name);
      res.json({ company_names: companyNames });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  });
    // Endpoint to handle user registration
    app.post('/api/auth/register', async (req, res) => {
        try {
        const { username, email, password, companyCode } = req.body;
        // Validation for username  
        if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(username)) {
            return res.status(400).json({ message: "Username must contain at least one letter and one number, and be at least 6 characters long" });
        }
        // Validation for password
        if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}/.test(password)) {
            return res.status(400).json({ message: "Password must contain at least one lowercase letter, one uppercase letter, one digit, one special character, and be at least 8 characters long" });
        }
    
        // Check if username or email is already taken
        const existingUser = await Registration.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            if (existingUser.username === username) {
            return res.status(400).json({ message: "Username is already taken" });
            }
            if (existingUser.email === email) {
            return res.status(400).json({ message: "Email is already taken" });
            }
        }
    
        // Verify company code from MongoDB
        const company = await Company.findOne({ company_code: companyCode }).lean(); // Use lean() to optimize query performance
        if (!company) {
            return res.status(400).json({ message: "Invalid company code" });
        }
    
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
    
        // Save registration data to Registration collection
        const registration = new Registration({ username, email, password: hashedPassword, companyCode });
        await registration.save();
    
      
    
        return res.status(201).json({ message: "User registered successfully" });
    
        } catch (error) {
        console.error('Registration failed: ', error);
        return res.status(500).json({ message: "Registration failed", error: error.message });
        }
    });

        // Endpoint to handle user login
        app.post('/api/auth/login', async (req, res) => {
        try {
            const { username, password, companyCode } = req.body;

            // Find user by username
            const registration = await Registration.findOne({ username });
            if (!registration) {
                return res.status(400).json({ message: "Username/password combination is wrong" });
            }

            // Verify company code
            if (registration.companyCode !== companyCode) {
                return res.status(400).json({ message: "Companycode is wrong" });
            }

            // Compare passwords
            const passwordMatch = await bcrypt.compare(password, registration.password);
            if (!passwordMatch) {
                return res.status(400).json({ message: "Username/password/companycode combination is wrong" });
            }

            // Generate JWT token
            const payload = { userId: registration._id, username: registration.username }; // Customize payload as needed
            const token = jwt.sign(payload, process.env.OWNER_JWT_SECRET, { expiresIn: '30d' });

            return res.status(200).json({ message: "Login successful", token });
        } catch (error) {
            console.error('Login failed:', error);
            return res.status(500).json({ message: "Login failed", error: error.message });
        }
        });
        function authenticateOwnerToken(req, res, next) {
            const authHeader = req.headers['authorization'];
            const token = authHeader && authHeader.split(' ')[1];
            if (token == null) {
                return res.sendStatus(401);
            }
            jwt.verify(token, process.env.OWNER_JWT_SECRET, (err, user) => {
                if (err) {
                    return res.sendStatus(403);
                }
                req.user = user;
                next();
            });
        }
    // Endpoint to handle user profile retrieval
    app.get('/api/auth/profile', authenticateOwnerToken, async (req, res) => {
        try {
            const { userId } = req.user;

            // Find user by userId
            const registration = await Registration.findById(userId).lean(); // Use lean() to optimize query performance
            if (!registration) {
                return res.status(400).json({ message: "User not found" });
            }

            // Find company by company code
            const company = await Company.findOne({ company_code: registration.companyCode }).lean(); // Use lean() to optimize query performance
            if (!company) {
                return res.status(400).json({ message: "Company not found" });
            }

            // Return user profile with company name
            const profile = {
                userId: registration._id,
                username: registration.username,
                email: registration.email,
                companyCode: registration.companyCode,
                companyName: company.company_name
            };

            return res.status(200).json({ message: "Profile retrieved successfully", profile });
        } catch (error) {
            console.error('Profile retrieval failed:', error);
            return res.status(500).json({ message: "Profile retrieval failed", error: error.message });
        }
    });


app.use(bodyParser.json());
// Schema for product collection
const productSchema = new mongoose.Schema({
    productCode: String,
    productName: String,
    size: String,
    price: Number,
    status: { type: Number, default: 0 }
});



// Create a function to generate product model
const createProductModel = (companyName) => {
    return mongoose.model(companyName, productSchema);
};
// Schema for count collectionconst 
const countSchema = new mongoose.Schema({
    productName: String,
    size: String,
    status_0: { type: Number, default: 0 },
    status_1: { type: Number, default: 0 },
    status_2: { type: Number, default: 0 },
    status_3: { type: Number, default: 0 },
    makingCost:{ type: Number, default: 0 },
    profit: { type: Number, default: 0 },
    imageUrl: String, // new field for image URL
});

// Create a function to generate count model
const createCountModel = (companyName) => {
    return mongoose.model(companyName + 'Count', countSchema);
};

app.post('/api/products/addnewproduct', async (req, res) => {
    const { companyName, productName, size,makingCost,profit , imageUrl } = req.body; // include imageUrl in req.body

    try {
        // Convert productName and size to lowercase
        const lowerCaseProductName = productName.toLowerCase();
        const UpperCaseSize = size.toUpperCase();

        // Create count model instance
        const CountModel = createCountModel(companyName);
        const newProduct = new CountModel({
            productName: lowerCaseProductName,
            size: UpperCaseSize,
            makingCost,
            profit,
            imageUrl, // include imageUrl in newProduct
        });

        // Save the product
        await newProduct.save();
        res.json({ success: true, message: 'Product added successfully!' });
    } catch (error) {
        console.error('Error adding product:', error);
        res.status(500).json({ success: false, message: 'Failed to add product.' });
    }
});


// API endpoint to fetch data from companyNameCount
app.post('/api/products/addX', async (req, res) => {
    const { companyName } = req.body;

    try {
        // Create count model instance
        const CountModel = createCountModel(companyName);

        // Fetch data from companyNameCount collection
        const countData = await CountModel.find({});

        // Extract relevant information
        const productData = countData.map(item => {
            return {
                productName: item.productName,
                size: item.size,
                makingCost: item.makingCost,
                profit: item.profit,
                imageUrl: item.imageUrl,
                status_0: item.status_0,
                status_1: item.status_1,
                status_2: item.status_2,
                status_3: item.status_3,
                Productprofit:item.Productprofit,
               
            };
        });

        res.status(200).json({ success: true, data: productData });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch data.' });
    }
});

app.post('/api/products/add', async (req, res) => {
    const { companyName, productCode } = req.body;
    try {
        // Convert productCode to lowercase
        const lowerCaseProductCode = productCode.toLowerCase();

        // Parse the lowercase product code to extract size, price, and product code
        const size = lowerCaseProductCode.substring(0, 3).toUpperCase().replace(/^0/, '').replace(/^0/, '');
        const price = parseInt(lowerCaseProductCode.substring(3, 7));
        const productCodePart = lowerCaseProductCode.substring(0);
        const productName = lowerCaseProductCode.substring(17);

        // Get or create the product model based on companyName
        const Product = createProductModel(companyName);

        // Get or create the count model based on companyName
        const Count = createCountModel(companyName);

        // Check if the product name and size combination already exists in the count model
        let existingCount = await Count.findOne({ productName: productName, size: size });

        if (existingCount) {
            // Check if the product code already exists in the product collection
            let existingProduct = await Product.findOne({ productCode: productCodePart });

            if (!existingProduct) {
                // Add the product to the product model
                await Product.create({
                    productCode: productCodePart,
                    size: size,
                    price: price,
                    productName: productName
                });

                // Update count model
                await Count.updateOne(
                    { productName: productName, size: size },
                    { $inc: { status_0: 1 } }
                );

                // Return success message if the product was added successfully
                return res.status(200).json({ message: 'Product added successfully' });
            } else {
                return res.status(400).json({ message: 'Product code already exists' });
            }
        } else {
            return res.status(400).json({ message: 'Product name and size combination does not exist. Do not add again.' });
        }
    } catch (error) {
        console.error('Error adding product:', error);
        return res.status(500).json({ error: 'Failed to add product' });
    }
});




function authenticateRetailerToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) {
        return res.sendStatus(401);
    }
    jwt.verify(token, process.env.RETAILER_JWT_SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }
        req.user = user;
        next();
    });
}














//Retailer part
const RetailerRegistration = mongoose.model('RetailerRegistration', new mongoose.Schema({
    username: String,
    email: String,
    password: String, // Note: You can remove this field if you're not storing passwords
    retailerCode: String,
    registrationDate: { type: Date, default: Date.now }
}));
const Retailer = mongoose.model('Retailer', new mongoose.Schema({
    retailer_name: String,
    retailer_code: String
}));    


// Route to get all retailer names
app.get('/api/auth/retailer/all', async (req, res) => {
    try {
      const retailers = await Retailer.find({}, 'retailer_name');
      if (!retailers) {
        return res.status(404).json({ message: "No retailers found" });
      }
      const retailerNames = retailers.map(retailer => retailer.retailer_name);
      res.json({ retailer_names: retailerNames });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  });
  
// Endpoint to handle retailer registration
app.post('/api/auth/RetailerRegister', async (req, res) => {
    try {
        const { username, email, password, retailerCode } = req.body;

        // Validation for username  
        if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(username)) {
            return res.status(400).json({ message: "Username must contain at least one letter and one number, and be at least 6 characters long" });
        }

        // Validation for password
        if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}/.test(password)) {
            return res.status(400).json({ message: "Password must contain at least one lowercase letter, one uppercase letter, one digit, one special character, and be at least 8 characters long" });
        }

        // Check if username or email is already taken
        const retailerexistingUser = await RetailerRegistration.findOne({ $or: [{ username }, { email }] });
        if (retailerexistingUser) {
            if (retailerexistingUser.username === username) {
                return res.status(400).json({ message: "Username is already taken" });
            }
            if (retailerexistingUser.email === email) {
                return res.status(400).json({ message: "Email is already taken" });
            }
        }

        // Verify retailer code from MongoDB
        const retailer = await Retailer.findOne({ retailer_code: retailerCode }).lean(); // Use lean() to optimize query performance
        if (!retailer) {
            return res.status(400).json({ message: "Invalid retailer code" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save registration data to Registration collection
        const registration = new RetailerRegistration({ username, email, password: hashedPassword, retailerCode });
        await registration.save();

        return res.status(201).json({ message: "Retailer registered successfully" });

    } catch (error) {
        console.error('Retailer registration failed: ', error);
        return res.status(500).json({ message: "Retailer registration failed", error: error.message });
    }
});
   
   // Endpoint to handle user login
   app.post('/api/auth/RetailerLogin', async (req, res) => {
    try {
        const { username, password, retailerCode } = req.body;

        // Find user by username
        const registration = await RetailerRegistration.findOne({ username });
        if (!registration) {
            return res.status(400).json({ message: "Username/password combination is wrong" });
        }

        // Verify company code
        if (registration.retailerCode !== retailerCode) {
            return res.status(400).json({ message: "Username/password/retailerCode combination is wrong" });
        }

        // Compare passwords
        const passwordMatch = await bcrypt.compare(password, registration.password);
        if (!passwordMatch) {
            return res.status(400).json({ message: "Username/password/retailerCode combination is wrong" });
        }

        // Generate JWT token
        const payload = { userId: registration._id, username: registration.username }; // Customize payload as needed
        const token = jwt.sign(payload, process.env.RETAILER_JWT_SECRET, { expiresIn: '30d' });

        return res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        console.error('Login failed:', error);
        return res.status(500).json({ message: "Login failed", error: error.message });
    }
    });
     // Endpoint to handle user profile retrieval
     app.get('/api/auth/Retailerprofile', authenticateRetailerToken, async (req, res) => {
        try {
            const { userId } = req.user;

            // Find user by userId
            const registration = await RetailerRegistration.findById(userId).lean(); // Use lean() to optimize query performance
            if (!registration) {
                return res.status(400).json({ message: "User not found" });
            }

            // Find retailer by retailer code
            const retailer = await Retailer.findOne({ retailer_code: registration.retailerCode }).lean(); // Use lean() to optimize query performance
            if (!retailer) {
                return res.status(400).json({ message: "retailer not found" });
            }

            // Return user profile with retailer name
            const profile = {
                userId: registration._id,
                username: registration.username,
                email: registration.email,
                retailerCode: registration.retailerCode,
                retailerName: retailer.retailer_name
            };

            return res.status(200).json({ message: "Profile retrieved successfully", profile });
        } catch (error) {
            console.error('Profile retrieval failed:', error);
            return res.status(500).json({ message: "Profile retrieval failed", error: error.message });
        }
    });
    const countSchemaRetailer = new mongoose.Schema({
        productName: String,
        size: String,
        countX: { type: Number, default: 0 },
        price: Number,
        Productprofit: { type: Number, default: 0 },
        imageUrl: String, // new field for image URL
    });
    
    // Create a function to generate count model

    
          const createCountModelRetailer = (retailerName) => {
        return mongoose.model(retailerName + '_Count', countSchemaRetailer);
    };
    app.post('/api/auth/buybyretailer', async (req, res) => {
        const { retailerName,companyName, productCode } = req.body;
      
        try {
          // Check if company name exists in the database
          const company = await Company.findOne({ company_name: companyName });
        // Get or create the count model based on companyName
        
          if (company) {
            // Create product and count models
            const ProductModel = createProductModel(companyName);
            const CountModel = createCountModel(companyName);
            const CountModelr= createCountModelRetailer(retailerName);
            // Get size and product name from product code
            const lowerCaseProductCode = productCode.toLowerCase();
            const size = lowerCaseProductCode.substring(0, 3).toUpperCase().replace(/^0/, '').replace(/^0/, '');
            const productName = lowerCaseProductCode.substring(17);
           
            // Check if product code exists in the product model
            const product = await ProductModel.findOne({ productCode: productCode });
            let existingCount = await CountModel.findOne({ productName: productName, size: size });
            if (product) {
              if (product.status === 0) {
                // Update product status and count
                await ProductModel.updateOne({ productCode: productCode }, { status: 1 });
                await CountModel.updateOne(
                  { productName, size },
                  { $inc: { status_1: 1 } }
                );
                await CountModelr.create(
                    { productName, size },
                    { $inc: { countX: 1 } },
                    
                  
                    {imageUrl: existingCount.imageUrl}
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
        
app.get('/', (req, res) => {
    res.send('Welcome to the authentication API!');
});
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
