const fs = require('fs');
const path = require('path');
const { Product } = require('./src/db'); // replace with the path to your models

// Read the JSON file
const rawData = fs.readFileSync(path.resolve(__dirname, 'script', 'poblacion.json')); // replace 'your_file.json' with your file name
const products = JSON.parse(rawData);

// Function to populate the database
const populateDatabase = async () => {
  try {
    for (let product of products) {
      await Product.create(product);
    }
    console.log('Database populated successfully');
  } catch (error) {
    console.error('Error populating database:', error);
  }
};

// Call the function
populateDatabase()
