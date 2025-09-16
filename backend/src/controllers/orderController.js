const Order = require('../models/Order');
const Cart = require('../models/Cart');
const User = require('../models/User');
const Product = require('../models/Product');

// Create order from cart
const createOrder = async (req, res) => {
  try {
    const { shippingAddressId } = req.body;

    // Get user details
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Get user's cart
    const cart = await Cart.findOne({ userId: req.user.userId })
      .populate('items.productId', 'name salePrice inStock');

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Cart is empty'
      });
    }

    // Validate all products are in stock
    for (const item of cart.items) {
      if (!item.productId.inStock) {
        return res.status(400).json({
          success: false,
          message: `Product ${item.productId.name} is out of stock`
        });
      }
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
    const subtotal = cart.items.reduce((total, item) => {
      return total + (item.productId.salePrice * item.quantity);
    }, 0);

    const shipping = subtotal > 1000 ? 0 : 100;
    const total = subtotal + shipping;

    // Create order items
    const orderItems = cart.items.map(item => ({
      productId: item.productId._id,
      productName: item.productId.name,
      quantity: item.quantity,
      selectedSize: item.selectedSize,
      price: item.productId.salePrice
    }));

    // Create order
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
      items: orderItems,
      subtotal,
      shipping,
      total
    });

    await order.save();

    // Clear cart after successful order
    cart.items = [];
    await cart.save();

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      order
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create order',
      error: error.message
    });
  }
};

// Get user's orders
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.userId })
      .sort({ createdAt: -1 })
      .populate('items.productId', 'name images');

    res.json({
      success: true,
      orders
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to get orders',
      error: error.message
    });
  }
};

// Get specific order
const getOrder = async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await Order.findOne({ 
      _id: orderId, 
      userId: req.user.userId 
    }).populate('items.productId', 'name images');

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    res.json({
      success: true,
      order
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to get order',
      error: error.message
    });
  }
};

// Cancel order (only if pending)
const cancelOrder = async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await Order.findOne({ 
      _id: orderId, 
      userId: req.user.userId 
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    if (order.status !== 'pending') {
      return res.status(400).json({
        success: false,
        message: 'Order cannot be cancelled'
      });
    }

    order.status = 'cancelled';
    await order.save();

    res.json({
      success: true,
      message: 'Order cancelled successfully',
      order
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to cancel order',
      error: error.message
    });
  }
};

module.exports = {
  createOrder,
  getOrders,
  getOrder,
  cancelOrder
};