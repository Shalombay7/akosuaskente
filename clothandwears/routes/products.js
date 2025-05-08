const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    const cart = req.session.cart || [];
    res.render('index', { products, cart, query: '' });
  } catch (err) {
    console.error('Error in products route:', err);
    res.status(500).send('Server Error');
  }
});

// Search products
router.get('/search', async (req, res) => {
  try {
    const query = req.query.query || '';
    const products = await Product.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } }
      ]
    });
    const cart = req.session.cart || [];
    res.render('index', { products, cart, query });
  } catch (err) {
    console.error('Error in search route:', err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;