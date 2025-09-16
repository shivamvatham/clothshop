const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/database');
const apiRoutes = require('./routes/api');
const errorHandler = require('./middleware/errorHandler');

// Connect to MongoDB
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json({ limit: '3mb' }));
app.use(express.urlencoded({ extended: true, limit: '3mb' }));

// Serve static files (uploaded images)
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api', apiRoutes);

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'Cloth Shop API is running!' });
});

// Global error handler
app.use(errorHandler);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on http://0.0.0.0:${PORT}`);
});