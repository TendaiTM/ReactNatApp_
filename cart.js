const express = require("express");
const path =  require('path');
const mysql = require("mysql");
const dotenv = require("dotenv");

dotenv.config({ path:'./.env'});

const app = express();

// Create a connection to the database
const db = mysql.createConnection({
   host: process.env.DATABASE_HOST,
    user:  process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to database');
});

// Add an item to the cart
exports.addToCart = (userId, itemId, quantity) => {
  const query = `INSERT INTO carts (user_id, item_id, quantity) VALUES (?,?,?) ON DUPLICATE KEY UPDATE quantity = quantity + VALUES(quantity)`;
  const values = [userId, itemId, quantity];
  db.query(query, values, (err, results) => {
    if (err) {
      console.error('Error adding item to cart:', err);
      return;
    }
    console.log(`Item added to cart with ID: ${results.insertId}`);
  });
};

// Remove an item from the cart
exports.removeFromCart = (userId, itemId) => {
  const query = `DELETE FROM carts WHERE user_id =? AND item_id =?`;
  const values = [userId, itemId];
  db.query(query, values, (err, results) => {
    if (err) {
      console.error('Error removing item from cart:', err);
      return;
    }
    console.log(`Item removed from cart with ID: ${itemId}`);
  });
};

// Add the following code to the cart.js file
router.post('/add-to-cart', (req, res) => {
  const product_id = req.body.product_id;
  // Find the product by id and check if it exists
  Product.findOne({
    where: {
      id: product_id,
    },
  }).then((product) => {
    if (!product) {
      return res.status(404).send('Product not found');
    }

    // Add the product to the cart
    //...

    return res.status(200).send('Product added to cart');
  })
.catch((err) => {
    console.log(err);
    return res.status(500).send('An error occurred while adding product to cart');
  });
});

module.exports = router;

// Define routes
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// Start the server
app.listen(5000, () => {
  console.log('Server started on port 5000');
});