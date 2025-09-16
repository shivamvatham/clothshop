const { body } = require('express-validator');

const validateProduct = [
  body('name')
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage('Product name must be 3-100 characters'),
  
  body('salePrice')
    .isFloat({ min: 1 })
    .withMessage('Sale price must be a positive number'),
  
  body('actualPrice')
    .isFloat({ min: 1 })
    .withMessage('Actual price must be a positive number'),
  
  body('higherPrice')
    .optional()
    .isFloat({ min: 1 })
    .withMessage('Higher price must be a positive number'),
  
  body('category')
    .isIn(['featured', 'sale', 'collection', 'new-arrival', 'all'])
    .withMessage('Category must be: featured, sale, collection, new-arrival, or all'),
  
  body('description')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Description must be less than 500 characters'),
  
  body('sizes')
    .optional()
    .custom((value) => {
      if (!value) return true; // Optional field
      try {
        const parsed = JSON.parse(value);
        if (!Array.isArray(parsed)) {
          throw new Error('Sizes must be an array');
        }
        return true;
      } catch (error) {
        throw new Error('Sizes must be a valid JSON array');
      }
    })
    .withMessage('Sizes must be a valid array')
];

module.exports = { validateProduct };