const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Add to cart
router.post('/add', async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    if (product.stock < quantity) {
      return res.status(400).json({ message: 'Insufficient stock' });
    }
    
    const cart = req.session.cart || [];
    const existingItem = cart.find(item => item.productId === productId);
    
    if (existingItem) {
      existingItem.quantity += parseInt(quantity);
    } else {
      cart.push({
        productId,
        quantity: parseInt(quantity),
        price: product.price,
        name: product.name
      });
    }
    
    req.session.cart = cart;
    res.json({ message: 'Item added to cart', cart });
  } catch (err) {
    console.error('Error adding to cart:', err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// View cart
router.get('/', (req, res) => {
  const cart = req.session.cart || [];
  res.render('cart', { cart });
});

module.exports = router;