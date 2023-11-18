// routes/donationRoutes.js
const express = require('express');
const router = express.Router();
const { createDonation, getDonationsByUserId, getAllDonations } = require('../controllers/donation');

// Route for creating a donation
router.post('/donate', createDonation);

// Route for getting user-specific donations
router.get('/donations/user/:userId', getDonationsByUserId);

// Route for getting all donations
router.get('/donations/all', getAllDonations);

module.exports = router;
