const db = require('../Backend/db/db');
const bcrypt = require('bcrypt');

// Create a new user
async function createUser(username, email, password, userRole) {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = 'INSERT INTO users (username, email, password_hash, userRole) VALUES ($1, $2, $3, $4) RETURNING user_id, username, email, userRole';
    const values = [username, email, hashedPassword, userRole];

    const result = await db.query(query, values);
    return result.rows[0];
  } catch (error) {
    throw error;
  }
}

// Get user by email
async function getUserByEmail(email) {
  try {
    const query = 'SELECT user_id, username, email, userRole FROM users WHERE email = $1';
    const values = [email];

    const result = await db.query(query, values);
    return result.rows[0];
  } catch (error) {
    throw error;
  }
}

module.exports = { createUser, getUserByEmail };
