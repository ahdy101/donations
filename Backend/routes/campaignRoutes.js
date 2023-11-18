// routes/campaignRoutes.js
const express = require('express');
const router = express.Router();
const { createCampaign, getCampaigns, getCampaignById } = require('../controllers/campaign');

// Route for creating a campaign
router.post('/create', createCampaign);

// Route for getting all campaigns
router.get('/all', getCampaigns);

// Route for getting a specific campaign by ID
router.get('/:campaignId', getCampaignById);

module.exports = router;
