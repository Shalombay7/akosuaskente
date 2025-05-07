const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Add to cart (simplified, stored in session)
router.post('/add', async (req, res) => {
  const { productId, quantity } = req.body;
  if (!req.session.cart) req.session.cart = [];
  
  const product = await Product.findById(productId);
  if (!product) return res.status(404).send('Product not found');

  req.session.cart.push({ productId, quantity: parseInt(quantity), price: product.price });
  res.redirect('/cart');
});

// View cart
router.get('/', (req, res) => {
  const cart = req.session.cart || [];
  res.render('cart', { cart });
});

module.exports = router;