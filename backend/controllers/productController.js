const Product = require("../models/Product");

// Controller to add a new product
exports.addProduct = async (req, res) => {
  const { imageUrl, productType, productName, description, distributorName, distributorEmail, quantity, price } = req.body;

  // Validate the incoming data
  if (!imageUrl || !productType || !productName || !description || !distributorName || !distributorEmail || quantity < 0 || price < 0) {
    return res.status(400).json({ error: "All fields are required and must be valid." });
  }

  try {
    const newProduct = new Product({
      imageUrl,
      productType,
      productName,
      description,
      distributorName,
      distributorEmail,
      quantity,
      price,
    });

    // Save the product to the database
    await newProduct.save();
    res.status(201).json({ message: "Product added successfully!", product: newProduct });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while adding the product." });
  }
};

// Controller to get products by distributor email
exports.getProductsByDistributorEmail = async (req, res) => {
  const { distributorEmail } = req.query;

  try {
    const products = await Product.find({ distributorEmail });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching products." });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching products." });
  }
};

// Controller to get a product by its ID
exports.getProductById = async (req, res) => {
  const { productId } = req.params;

  try {
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ error: "Product not found." });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching the product." });
  }
};


exports.getDistributorByProductId = async (req, res) => {
  const { productId } = req.params;

  try {
    // Find the product by ID and populate the distributor fields
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ error: "Product not found." });
    }

    // Assuming distributor information is stored directly in the product schema
    const distributorInfo = {
      name: product.distributorName,
      email: product.distributorEmail,
      img:product.imageUrl,
      productName:product.productName,
    };

    // Check if distributor information is available
    if (!distributorInfo.name || !distributorInfo.email) {
      return res.status(404).json({ error: "Distributor information not found." });
    }

    res.status(200).json(distributorInfo);
  } catch (error) {
    console.error("Error fetching distributor info:", error);
    res.status(500).json({ error: "An error occurred while fetching distributor information." });
  }
};