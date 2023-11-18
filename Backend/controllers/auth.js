const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { createUser, getUserByEmail } = require('../models/usermodels'); // Import the createUser and getUserByEmail functions
const secretKey = process.env.JWT_SECRET || 'default-secret-key';
const saltRounds = 10;

async function hashPassword(password) {
  return await bcrypt.hash(password, saltRounds);
}

async function createUserAndHashPassword(username, password, role) {
  try {
    const hashedPassword = await hashPassword(password);
    const newUser = await createUser(username, hashedPassword, role);
    return newUser;
  } catch (error) {
    throw error;
  }
}

async function authenticateUser(req, res, next) {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new Error('No token provided');
    }

    const decoded = jwt.verify(token, secretKey);

    req.userData = decoded;
    next();
  } catch (error) {
    console.error('Authentication failed:', error.message);
    res.status(401).json({ message: 'Authentication failed', error: error.message });
  }
}

async function registerUser(req, res) {
  const { username, password, role } = req.body;

  try {
    const isUsernameTaken = await checkIfUsernameTaken(username);

    if (isUsernameTaken) {
      return res.status(400).json({ message: 'Username is already taken' });
    }

    let newUser;

    if (role === 'admin' && username === 'admin' && password === 'adminPassword') {
      // Special case for creating an admin user
      newUser = await createUserAndHashPassword(username, password, 'admin');
    } else if (role === 'organization') {
      // Logic for creating an organization user
      newUser = await createUserAndHashPassword(username, password, 'organization');
    } else {
      // Default case for creating a normal user
      newUser = await createUserAndHashPassword(username, password, 'user');
    }

    const token = jwt.sign({ username, role: newUser.userRole }, secretKey, { expiresIn: '1h' });
    res.status(201).json({ message: 'User registered successfully', token, role: newUser.userRole });
  } catch (error) {
    console.error('Error during user registration:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function loginUser(req, res) {
  const { username, password } = req.body;

  try {
    const user = await getUserByEmail(username);

    if (!user || !(await bcrypt.compare(password, user.password_hash))) {
      res.status(401).json({ message: 'Authentication failed' });
      return;
    }

    const token = jwt.sign({ username: user.username, role: user.userRole }, secretKey, { expiresIn: '1h' });
    res.status(200).json({ token, role: user.userRole });
  } catch (error) {
    console.error('Error during user login:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function checkIfUsernameTaken(username) {
  try {
    const user = await getUserByEmail(username);
    return user !== null; // Returns true if a user with the given username exists
  } catch (error) {
    // Handle any potential errors during the database query
    console.error('Error checking if username is taken:', error);
    throw error;
  }
}

module.exports = {
  authenticateUser,
  registerUser,
  loginUser,
};
