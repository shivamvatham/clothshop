const mongoose = require('mongoose');
const Admin = require('../models/Admin');
const readline = require('readline');
require('dotenv').config();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const askQuestion = (question) => {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
};

const createAdmin = async () => {
  try {
    // Connect to database
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB\n');

    console.log('=== Create New Admin ===');
    
    // Get admin details from user input
    const username = await askQuestion('Enter username: ');
    const email = await askQuestion('Enter email: ');
    const password = await askQuestion('Enter password: ');
    const name = await askQuestion('Enter full name: ');

    const adminData = { username, email, password, name };

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({
      $or: [{ username: adminData.username }, { email: adminData.email }]
    });

    if (existingAdmin) {
      console.log('\nError: Admin already exists with this username or email');
      rl.close();
      process.exit(1);
    }

    // Create admin
    const admin = new Admin(adminData);
    await admin.save();

    console.log('\n✅ Admin created successfully:');
    console.log(`Username: ${admin.username}`);
    console.log(`Email: ${admin.email}`);
    console.log(`Name: ${admin.name}`);
    
    rl.close();
    process.exit(0);

  } catch (error) {
    console.error('\nError creating admin:', error.message);
    rl.close();
    process.exit(1);
  }
};

createAdmin();