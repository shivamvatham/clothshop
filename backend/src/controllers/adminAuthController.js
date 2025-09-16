const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

// Generate JWT Token for admin
const generateAdminToken = (adminId) => {
  return jwt.sign({ adminId, type: 'admin' }, process.env.JWT_SECRET || 'your-secret-key', {
    expiresIn: '24h'
  });
};

// Register Admin
const registerAdmin = async (req, res) => {
  try {
    const { username, email, password, name } = req.body;

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({
      $or: [{ username }, { email }]
    });

    if (existingAdmin) {
      return res.status(400).json({
        success: false,
        message: existingAdmin.username === username ? 'Username already exists' : 'Email already exists'
      });
    }

    // Create new admin
    const admin = new Admin({
      username,
      email,
      password,
      name
    });

    await admin.save();

    // Generate token
    const token = generateAdminToken(admin._id);

    // Return admin data (without password)
    const adminData = {
      id: admin._id,
      username: admin.username,
      email: admin.email,
      name: admin.name
    };

    res.status(201).json({
      success: true,
      message: 'Admin registered successfully',
      token,
      admin: adminData
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Admin registration failed',
      error: error.message
    });
  }
};

// Login Admin
const loginAdmin = async (req, res) => {
  try {
    const { identifier, password } = req.body; // identifier can be username or email

    // Find admin by username or email
    const admin = await Admin.findOne({
      $or: [
        { username: identifier },
        { email: identifier }
      ]
    });

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Check password
    const isPasswordValid = await admin.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Generate token
    const token = generateAdminToken(admin._id);

    // Return admin data (without password)
    const adminData = {
      id: admin._id,
      username: admin.username,
      email: admin.email,
      name: admin.name
    };

    res.json({
      success: true,
      message: 'Admin login successful',
      token,
      admin: adminData
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Admin login failed',
      error: error.message
    });
  }
};

// Get Admin Profile
const getAdminProfile = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin.adminId).select('-password');
    
    if (!admin) {
      return res.status(404).json({
        success: false,
        message: 'Admin not found'
      });
    }

    res.json({
      success: true,
      admin
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to get admin profile',
      error: error.message
    });
  }
};

module.exports = {
  registerAdmin,
  loginAdmin,
  getAdminProfile
};