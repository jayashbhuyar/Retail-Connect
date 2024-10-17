const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const cors = require("cors"); // Optional: for handling CORS
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const networkRoutes = require("./routes/networkRoutes");
const orderRoutes = require("./routes/orderRoutes");
const adminRoutes = require("./routes/adminRoutes");
const feedbackRoutes = require("./routes/feedbackRoutes");
const newsRoutes = require("./routes/newsRoutes");
const invoiceRoutes = require("./routes/invoiceRoutes");

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON bodies

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/network", networkRoutes);
app.use("/api/orders", orderRoutes);
app.use("/admin", adminRoutes);
app.use("/api", feedbackRoutes);
app.use("/api/invoices", invoiceRoutes);
app.use("/api/news", newsRoutes);

// Export the app for serverless deployment (Vercel, etc.)
module.exports = app;
