const Product = require('../models/Product');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = 'uploads/products/';
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'product-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  }
});

// Create product
const createProduct = async (req, res) => {
  try {
    const { name, salePrice, actualPrice, higherPrice, collection, sizes, description } = req.body;
    
    // Handle uploaded images
    const images = req.files ? req.files.map(file => `/uploads/products/${file.filename}`) : [];
    
    // Parse sizes if it's a string
    const parsedSizes = typeof sizes === 'string' ? JSON.parse(sizes) : sizes;
    
    const product = new Product({
      name,
      salePrice: Number(salePrice),
      actualPrice: Number(actualPrice),
      higherPrice: higherPrice ? Number(higherPrice) : undefined,
      collection,
      images,
      sizes: parsedSizes || [],
      description
    });
    
    await product.save();
    
    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: product
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error creating product',
      error: error.message
    });
  }
};

// Get all products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    
    res.json({
      success: true,
      data: products,
      total: products.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching products',
      error: error.message
    });
  }
};

// Get single product
const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }
    
    res.json({
      success: true,
      data: product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching product',
      error: error.message
    });
  }
};

// Get products by collection
const getProductsByCollection = async (req, res) => {
  try {
    const { collection } = req.params;
    const products = await Product.find({ collection }).sort({ createdAt: -1 });
    
    res.json({
      success: true,
      data: products,
      total: products.length,
      collection
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching products by collection',
      error: error.message
    });
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProduct,
  getProductsByCollection,
  upload
};