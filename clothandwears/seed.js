const mongoose = require('mongoose');
const Product = require('./models/Product');
const connectDB = require('./config/db');

require('dotenv').config();

const seedProducts = async () => {
  await connectDB();
  await Product.deleteMany({});

  const products = [
    { name: 'T-Shirt', price: 20, description: 'Cotton T-Shirt', stock: 100, image: '' },
    { name: 'Jeans', price: 50, description: 'Blue Denim Jeans', stock: 50, image: '' },
  ];

  await Product.insertMany(products);
  console.log('Products seeded');
  mongoose.connection.close();
};

seedProducts();