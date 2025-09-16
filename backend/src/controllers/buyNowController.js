const Order = require('../models/Order');
const User = require('../models/User');
const Product = require('../models/Product');

// Buy Now - Direct purchase without cart
const buyNow = async (req, res) => {
  try {
    const { productId, quantity = 1, selectedSize, shippingAddressId } = req.body;

    // Get user details
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Get product details
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    if (!product.inStock) {
      return res.status(400).json({
        success: false,
        message: 'Product is out of stock'
      });
    }

    // Get shipping address
    let shippingAddress;
    if (shippingAddressId) {
      shippingAddress = user.addresses.id(shippingAddressId);
      if (!shippingAddress) {
        return res.status(404).json({
          success: false,
          message: 'Shipping address not found'
        });
      }
    } else {
      // Use default address
      shippingAddress = user.addresses.find(addr => addr.isDefault);
      if (!shippingAddress) {
        return res.status(400).json({
          success: false,
          message: 'No default shipping address found'
        });
      }
    }

    // Calculate pricing
    const subtotal = product.salePrice * quantity;
    const shipping = subtotal > 1000 ? 0 : 100;
    const total = subtotal + shipping;

    // Create order directly
    const order = new Order({
      userId: req.user.userId,
      customerInfo: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone
      },
      shippingAddress: {
        addressLine1: shippingAddress.addressLine1,
        addressLine2: shippingAddress.addressLine2,
        city: shippingAddress.city,
        state: shippingAddress.state,
        pincode: shippingAddress.pincode,
        country: shippingAddress.country
      },
      items: [{
        productId: product._id,
        productName: product.name,
        quantity,
        selectedSize,
        price: product.salePrice
      }],
      subtotal,
      shipping,
      total
    });

    await order.save();

    res.status(201).json({
      success: true,
      message: 'Order placed successfully',
      order
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to place order',
      error: error.message
    });
  }
};

module.exports = {
  buyNow
};