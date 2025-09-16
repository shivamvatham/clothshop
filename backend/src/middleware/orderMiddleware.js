const { body } = require('express-validator');

// Order creation validation
const validateOrder = [
  body('shippingAddressId')
    .optional()
    .isMongoId()
    .withMessage('Valid shipping address ID is required')
];

module.exports = {
  validateOrder
};