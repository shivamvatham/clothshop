const express = require('express');
const productController = require('../controllers/productController');
const authController = require('../controllers/authController');
const adminAuthController = require('../controllers/adminAuthController');
const addressController = require('../controllers/addressController');
const cartController = require('../controllers/cartController');
const orderController = require('../controllers/orderController');
const buyNowController = require('../controllers/buyNowController');
const { auth, adminAuth } = require('../middleware/auth');
const { validateUserRegistration, validateUserLogin } = require('../middleware/userMiddleware');
const { validateAdminLogin } = require('../middleware/adminMiddleware');
const { validateAddress } = require('../middleware/addressMiddleware');
const { validateCartItem, validateCartUpdate } = require('../middleware/cartMiddleware');
const { validateBuyNow } = require('../middleware/buyNowMiddleware');
const { validateOrder } = require('../middleware/orderMiddleware');
const { validateProduct } = require('../middleware/productMiddleware');
const { handleValidationErrors } = require('../middleware/validationHandler');
const { addCurrencyToResponse } = require('../middleware/responseMiddleware');

const router = express.Router();

// User Authentication routes
router.post('/auth/register', validateUserRegistration, handleValidationErrors, authController.register);
router.post('/auth/login', validateUserLogin, handleValidationErrors, authController.login);
router.get('/auth/profile', auth, authController.getProfile);

// Admin Authentication routes
router.post('/admin/auth/login', validateAdminLogin, handleValidationErrors, adminAuthController.loginAdmin);
router.get('/admin/auth/profile', adminAuth, adminAuthController.getAdminProfile);

// Address Management routes
router.get('/addresses', auth, addressController.getAddresses);
router.post('/addresses', auth, validateAddress, handleValidationErrors, addressController.addAddress);
router.put('/addresses/:addressId', auth, validateAddress, handleValidationErrors, addressController.updateAddress);
router.delete('/addresses/:addressId', auth, addressController.deleteAddress);
router.put('/addresses/:addressId/set-default', auth, addressController.setDefaultAddress);

// Cart Management routes
router.get('/cart', auth, cartController.getCart);
router.post('/cart/add', auth, validateCartItem, handleValidationErrors, cartController.addToCart);
router.put('/cart/item/:itemId', auth, validateCartUpdate, handleValidationErrors, cartController.updateCartItem);
router.delete('/cart/item/:itemId', auth, cartController.removeFromCart);
router.delete('/cart/clear', auth, cartController.clearCart);

// Order Management routes
router.post('/orders', auth, validateOrder, handleValidationErrors, orderController.createOrder);
router.get('/orders', auth, orderController.getOrders);
router.get('/orders/:orderId', auth, orderController.getOrder);
router.put('/orders/:orderId/cancel', auth, orderController.cancelOrder);

// Buy Now route (direct purchase)
router.post('/buy-now', auth, validateBuyNow, handleValidationErrors, buyNowController.buyNow);

// Public Product routes (for users to browse)
router.get('/products', addCurrencyToResponse, productController.getProducts);
router.get('/products/category/:category', addCurrencyToResponse, productController.getProductsByCollection);
router.get('/products/:id', addCurrencyToResponse, productController.getProduct);

// Admin Product Management routes
router.post('/admin/products', adminAuth, productController.upload.array('images', 5), validateProduct, handleValidationErrors, productController.createProduct);
router.put('/admin/products/:id', adminAuth, productController.upload.array('images', 5), validateProduct, handleValidationErrors, productController.updateProduct);
router.delete('/admin/products/:id', adminAuth, productController.deleteProduct);

module.exports = router;