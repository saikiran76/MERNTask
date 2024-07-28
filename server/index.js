import { app } from './app.js'
import mongoose from 'mongoose';
import { Product } from './models/product.js';
import axios from 'axios';

const port = 4000;

const seedDatabase = async () => {
  try {
      const { data } = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
      const products = data.map(product => ({
          ...product,
          dateOfSale: new Date(product.dateOfSale), // Ensure date is properly formatted
      }));

      await Product.deleteMany({}); // Clear the collection before seeding
      await Product.insertMany(products);
      console.log('Database seeded!');
  } catch (error) {
      console.error('Error seeding database:', error);
  }
};

const start = async () => {
  try {
      await mongoose.connect('mongodb://localhost:27017/productsDB');

      await seedDatabase();
      console.log('Connected to MongoDB and DB seeded');
  } catch (err) {
      console.log(err);
  }

  app.listen(port, () => {
      console.log(`Backend service is started at ${port}`);
  });
};

start();