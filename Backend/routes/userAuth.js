// routes/userAuth.js

const express = require('express');
const router = express.Router();
const { authenticateUser, loginUser, checkUserCredentials, registerUser } = require('../controllers/auth');

// Route for user login
router.post('/login', loginUser);

// Route for user registration
router.post('/register', registerUser);

// Route for user authentication (protected route example)
router.post('/authenticate', authenticateUser);

// Route for checking user credentials (example, you might not expose this in a real application)
router.post('/checkCredentials', checkUserCredentials);

module.exports = router;
