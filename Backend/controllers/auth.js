const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const secretKey = 'your-secret-key'; // Replace with your actual secret key
const saltRounds = 10;

// Mock user data for demonstration purposes
const mockUser = {
  username: 'demo_user',
  password: '$2b$10$yKcbD6ZZV2ylwT96B3FiVe5JnlvVhAPgqWJ/8U5A1tSTmKlW5UMfS', // Hashed password
};

// Function to create a new user (replace this with your actual user creation logic)
async function createUser(username, password) {
  // Replace this with your actual user creation logic, including password hashing
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  // Store user data in your database or any other storage mechanism
  // For demonstration, we'll just return the hashed password
  return { username, password: hashedPassword };
}

// Authentication middleware function
async function authenticateUser(req, res, next) {
  try {
    // Get the token from the request headers
    const token = req.headers.authorization.split(' ')[1]; // Assuming token is in the 'Authorization' header

    // Verify the token
    const decoded = jwt.verify(token, secretKey);

    // You can optionally perform additional checks here, e.g., user role validation

    // Attach user information to the request for use in protected routes
    req.userData = decoded;

    // User is authenticated, proceed to the protected route
    next();
  } catch (error) {
    // Authentication failed; send an error response
    res.status(401).json({ message: 'Authentication failed' });
  }
}

// Function to check user credentials (replace this with your actual user retrieval logic)
async function checkUserCredentials(username, password) {
  // Replace this with your actual user retrieval logic
  if (username === mockUser.username && await bcrypt.compare(password, mockUser.password)) {
    return true;
  }
  return false;
}

// Register new user route
async function registerUser(req, res) {
  const { username, password } = req.body;

  try {
    // Check if the username is already taken (replace this with your actual logic)
    const isUsernameTaken = username === mockUser.username;

    if (isUsernameTaken) {
      res.status(400).json({ message: 'Username is already taken' });
    } else {
      // Create a new user
      const newUser = await createUser(username, password);

      // Generate JWT token upon successful registration
      const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });

      // Send success response with token
      res.status(201).json({ message: 'User registered successfully', token });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

// Login user route
async function loginUser(req, res) {
  const { username, password } = req.body;

  try {
    const isCredentialsValid = await checkUserCredentials(username, password);

    if (isCredentialsValid) {
      // Generate JWT token upon successful authentication
      const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });

      // Send success response with token
      res.status(200).json({ token });
    } else {
      res.status(401).json({ message: 'Authentication failed' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = {
  checkUserCredentials,
  authenticateUser,
  registerUser,
  loginUser,
};
