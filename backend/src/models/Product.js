const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  salePrice: {
    type: Number,
    required: true
  },
  actualPrice: {
    type: Number,
    required: true
  },
  higherPrice: {
    type: Number
  },
  collection: {
    type: String,
    required: true,
    enum: ['featured', 'sale', 'collection', 'new-arrival', 'all']
  },
  images: [{
    type: String
  }],
  sizes: [{
    type: String
  }],
  description: String,
  inStock: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Product', productSchema);