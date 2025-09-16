const { body } = require('express-validator');

// Address validation
const validateAddress = [
  body('addressLine1')
    .trim()
    .isLength({ min: 5, max: 100 })
    .withMessage('Address line 1 must be 5-100 characters'),
  
  body('addressLine2')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Address line 2 must be less than 100 characters'),
  
  body('city')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('City must be 2-50 characters'),
  
  body('state')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('State must be 2-50 characters'),
  
  body('pincode')
    .isPostalCode('IN')
    .withMessage('Please enter a valid Indian pincode'),
  
  body('type')
    .optional()
    .isIn(['home', 'work', 'other'])
    .withMessage('Address type must be home, work, or other')
];

module.exports = {
  validateAddress
};