const express = require('express');
const router = express.Router();

const app = express();

// Define the routes for the /users endpoint
router.get('/', (req, res) => {
  res.send('Users homepage');
});

router.get('/profile', (req, res) => {
  res.send('User profile');
});

// Export the router object
module.exports = router;