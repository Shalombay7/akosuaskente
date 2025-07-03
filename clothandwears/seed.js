const mongoose = require('mongoose');
const Product = require('./models/Product');
const connectDB = require('./config/db');
require('dotenv').config();

const seedProducts = async () => {
  try {
    await connectDB();
    console.log('Connected to MongoDB:', mongoose.connection.name);
    await Product.deleteMany({});
    const products = [
      { 
        name: 'T-Shirt', 
        price: 20, 
        description: 'Comfortable cotton T-shirt, perfect for casual wear', 
        stock: 100, 
        image: 'https://via.placeholder.com/150?text=T-Shirt' 
      },
      { 
        name: 'Jeans', 
        price: 50, 
        description: 'Stylish blue denim jeans, slim fit', 
        stock: 50, 
        image: 'https://via.placeholder.com/150?text=Jeans' 
      },
      { 
        name: 'Sneakers', 
        price: 80, 
        description: 'Trendy white sneakers, great for all-day comfort', 
        stock: 30, 
        image: 'https://via.placeholder.com/150?text=Sneakers' 
      },
      { 
        name: 'Jacket', 
        price: 120, 
        description: 'Warm leather jacket, ideal for cool weather', 
        stock: 20, 
        image: 'https://via.placeholder.com/150?text=Jacket' 
      },
      { 
        name: 'Dress', 
        price: 60, 
        description: 'Elegant floral dress, perfect for summer events', 
        stock: 40, 
        image: 'https://via.placeholder.com/150?text=Dress' 
      },
      { 
        name: 'Sweater', 
        price: 45, 
        description: 'Cozy knit sweater, available in multiple colors', 
        stock: 60, 
        image: 'https://via.placeholder.com/150?text=Sweater' 
      },
      { 
        name: 'Shorts', 
        price: 30, 
        description: 'Casual cargo shorts, great for warm days', 
        stock: 70, 
        image: 'https://via.placeholder.com/150?text=Shorts' 
      },
      { 
        name: 'Hat', 
        price: 25, 
        description: 'Stylish baseball cap, adjustable fit', 
        stock: 80, 
        image: 'https://via.placeholder.com/150?text=Hat' 
      }
    ];
    await Product.insertMany(products);
    const seededProducts = await Product.find();
    console.log('Products seeded:', seededProducts);
    mongoose.connection.close();
  } catch (err) {
    console.error('Seeding error:', err);
    mongoose.connection.close();
  }
};

seedProducts();