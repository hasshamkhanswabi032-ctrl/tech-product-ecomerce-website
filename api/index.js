// ShopX Server Version 1.0.1 - Vercel Sync Update
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./_server/routes/userRoutes");
const productRoutes = require("./_server/routes/productRoutes");
const orderRoutes = require("./_server/routes/orderRoutes");

require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Security headers for Google OAuth
app.use((req, res, next) => {
    res.setHeader("Cross-Origin-Opener-Policy", "unsafe-none");
    res.setHeader("Cross-Origin-Embedder-Policy", "unsafe-none");
    next();
});

// Routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

// Database connection
const mongoURI = process.env.MONGO_URI || "mongodb+srv://hassham:comsats@cluster0.iciocgr.mongodb.net/hassham?appName=Cluster0";

mongoose.connect(mongoURI, { tls: true, serverSelectionTimeoutMS: 5000 })
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

// Start server
// Start server
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}

module.exports = app;
