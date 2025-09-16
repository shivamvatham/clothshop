const { body } = require('express-validator');

// User registration validation
const validateUserRegistration = [
  body('firstName')
    .trim()
    .isLength({ min: 2, max: 30 })
    .withMessage('First name must be 2-30 characters'),
  
  body('lastName')
    .trim()
    .isLength({ min: 2, max: 30 })
    .withMessage('Last name must be 2-30 characters'),
  
  body('phone')
    .isMobilePhone('en-IN')
    .withMessage('Please enter a valid Indian phone number'),
  
  body('email')
    .optional()
    .isEmail()
    .withMessage('Please enter a valid email address'),
  
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
];

// User login validation
const validateUserLogin = [
  body('identifier')
    .notEmpty()
    .withMessage('Phone number or email is required'),
  
  body('password')
    .notEmpty()
    .withMessage('Password is required')
];

module.exports = {
  validateUserRegistration,
  validateUserLogin
};