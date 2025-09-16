const { body } = require('express-validator');

// Cart item validation
const validateCartItem = [
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
    .withMessage('Selected size must be 1-10 characters')
];

// Cart update validation
const validateCartUpdate = [
  body('quantity')
    .isInt({ min: 1, max: 10 })
    .withMessage('Quantity must be between 1 and 10')
];

module.exports = {
  validateCartItem,
  validateCartUpdate
};