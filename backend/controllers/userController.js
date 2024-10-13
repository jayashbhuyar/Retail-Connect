const User = require("../models/User");

// Get all retailers
exports.getAllRetailers = async (req, res) => {
  try {
    const retailers = await User.find({ role: "retailer" });
    res.status(200).json(retailers);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching retailers." });
  }
};

// Get all distributors
exports.getAllDistributors = async (req, res) => {
  try {
    const distributors = await User.find({ role: "distributor" });
    res.status(200).json(distributors);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching distributors." });
  }
};
