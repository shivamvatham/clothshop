const validateProduct = (req, res, next) => {
  const { name, salePrice, actualPrice, collection } = req.body;
  
  if (!name || !salePrice || !actualPrice || !collection) {
    return res.status(400).json({
      success: false,
      message: 'Name, sale price, actual price, and collection are required'
    });
  }
  
  if (isNaN(salePrice) || isNaN(actualPrice) || salePrice < 0 || actualPrice < 0) {
    return res.status(400).json({
      success: false,
      message: 'Prices must be valid positive numbers'
    });
  }
  
  next();
};

module.exports = { validateProduct };