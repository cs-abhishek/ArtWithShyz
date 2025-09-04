const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  items: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
      default: 1
    },
    customization: {
      notes: String,
      specifications: mongoose.Schema.Types.Mixed
    },
    addedAt: {
      type: Date,
      default: Date.now
    }
  }],
  subtotal: {
    type: Number,
    default: 0
  },
  itemCount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Calculate subtotal and item count
cartSchema.methods.calculateTotals = async function() {
  await this.populate('items.product');
  
  let subtotal = 0;
  let itemCount = 0;
  
  this.items.forEach(item => {
    if (item.product && item.product.price) {
      subtotal += item.product.price * item.quantity;
      itemCount += item.quantity;
    }
  });
  
  this.subtotal = subtotal;
  this.itemCount = itemCount;
  
  return { subtotal, itemCount };
};

// Add item to cart
cartSchema.methods.addItem = function(productId, quantity = 1, customization = {}) {
  const existingItem = this.items.find(item => 
    item.product.toString() === productId.toString()
  );
  
  if (existingItem) {
    existingItem.quantity += quantity;
    existingItem.customization = { ...existingItem.customization, ...customization };
  } else {
    this.items.push({
      product: productId,
      quantity,
      customization
    });
  }
};

// Remove item from cart
cartSchema.methods.removeItem = function(productId) {
  this.items = this.items.filter(item => 
    item.product.toString() !== productId.toString()
  );
};

// Update item quantity
cartSchema.methods.updateItemQuantity = function(productId, quantity) {
  const item = this.items.find(item => 
    item.product.toString() === productId.toString()
  );
  
  if (item) {
    item.quantity = quantity;
  }
};

// Clear cart
cartSchema.methods.clearCart = function() {
  this.items = [];
  this.subtotal = 0;
  this.itemCount = 0;
};

module.exports = mongoose.model('Cart', cartSchema);
