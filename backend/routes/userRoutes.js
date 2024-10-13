const express = require("express");
const { getAllRetailers, getAllDistributors } = require("../controllers/userController");
// const { addProduct } = require("../controllers/productController");
const router = express.Router();

// Get all retailers
router.get("/retailers", getAllRetailers);
router.get("/distributors", getAllDistributors);
// router.post("/add", addProduct);

module.exports = router;