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
    res.status(500).render('error', { title: 'Server Error', error: err.message });
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
    res.status(500).render('error', { title: 'Server Error', error: err.message });
  }
});

// Seed database
router.get('/seed', async (req, res) => {
  try {
    await Product.deleteMany({});
    const products = [
      { name: 'T-Shirt', price: 20, description: 'Comfortable cotton T-shirt', stock: 100, image: 'https://via.placeholder.com/150?text=T-Shirt' },
      { name: 'Jeans', price: 50, description: 'Stylish blue denim jeans', stock: 50, image: 'https://via.placeholder.com/150?text=Jeans' },
      { name: 'Sneakers', price: 80, description: 'Trendy white sneakers', stock: 30, image: 'https://via.placeholder.com/150?text=Sneakers' },
      { name: 'Jacket', price: 120, description: 'Warm leather jacket', stock: 20, image: 'https://via.placeholder.com/150?text=Jacket' },
      { name: 'Dress', price: 60, description: 'Elegant floral dress', stock: 40, image: 'https://via.placeholder.com/150?text=Dress' },
      { name: 'Sweater', price: 45, description: 'Cozy knit sweater', stock: 60, image: 'https://via.placeholder.com/150?text=Sweater' },
      { name: 'Shorts', price: 30, description: 'Casual cargo shorts', stock: 70, image: 'https://via.placeholder.com/150?text=Shorts' },
      { name: 'Hat', price: 25, description: 'Stylish baseball cap', stock: 80, image: 'https://via.placeholder.com/150?text=Hat' }
    ];
    await Product.insertMany(products);
    res.send('Database seeded');
  } catch (err) {
    console.error('Error seeding database:', err);
    res.status(500).render('error', { title: 'Server Error', error: err.message });
  }
});

module.exports = router;