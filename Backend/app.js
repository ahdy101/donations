const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cors = require('cors');
const { pool } = require('../backend/db/db');
const userAuth = require('../Backend/routes/userAuth')


const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(morgan('tiny'));
app.use(express.json());

// Serve frontend files
// app.use(express.static(path.join(__dirname, 'Frontend')));

// Backend routes
app.use('/auth', userAuth);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error' });
});

// 404 middleware
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
