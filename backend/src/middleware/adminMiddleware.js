const { body } = require('express-validator');

// Admin login validation
const validateAdminLogin = [
  body('identifier')
    .notEmpty()
    .withMessage('Username or email is required'),
  
  body('password')
    .notEmpty()
    .withMessage('Password is required')
];

module.exports = {
  validateAdminLogin
};