const { body } = require('express-validator');

// Buy Now validation
const validateBuyNow = [
  body('productId')
    .isMongoId()
    .withMessage('Valid product ID is required'),
  
  body('quantity')
    .optional()
    .isInt({ min: 1, max: 10 })
    .withMessage('Quantity must be between 1 and 10'),
  
  body('selectedSize')
    .optional()
    .trim()
    .isLength({ min: 1, max: 10 })
    .withMessage('Selected size must be 1-10 characters'),
  
  body('shippingAddressId')
    .optional()
    .isMongoId()
    .withMessage('Valid shipping address ID is required')
];

module.exports = {
  validateBuyNow
};