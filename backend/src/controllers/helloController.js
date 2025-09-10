const Product = require('../models/Product');

const getHello = async (req, res) => {
  try {
    const products = await Product.find();
    res.json({
      message: 'Hello World!',
      timestamp: new Date().toISOString(),
      status: 'success',
      products: products,
      totalProducts: products.length
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching products',
      error: error.message
    });
  }
};

module.exports = {
  getHello
};