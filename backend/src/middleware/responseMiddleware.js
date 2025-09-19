const { CURRENCY_SYMBOL } = require('../config/constants');

const addCurrencyToResponse = (req, res, next) => {
  const originalJson = res.json;
  
  res.json = function(data) {
    if (data && typeof data === 'object' && data.success !== false) {
      data.currency = CURRENCY_SYMBOL;
    }
    return originalJson.call(this, data);
  };
  
  next();
};

module.exports = { addCurrencyToResponse };