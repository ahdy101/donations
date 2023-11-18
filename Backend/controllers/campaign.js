// controllers/campaign.js
const campaignModels = require('../models/campaignmodels');

async function createCampaign(req, res) {
  const { campaignName, description } = req.body;

  try {
    const newCampaign = await campaignModels.createCampaign(campaignName, description);
    res.status(201).json({ message: 'Campaign created successfully', campaign: newCampaign });
  } catch (error) {
    console.error('Error creating campaign:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function getCampaigns(req, res) {
  try {
    const campaigns = await campaignModels.getCampaigns();
    res.status(200).json(campaigns);
  } catch (error) {
    console.error('Error getting campaigns:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function getCampaignById(req, res) {
  const campaignId = req.params.campaignId;

  try {
    const campaign = await campaignModels.getCampaignById(campaignId);

    if (!campaign) {
      res.status(404).json({ message: 'Campaign not found' });
    } else {
      res.status(200).json(campaign);
    }
  } catch (error) {
    console.error('Error getting campaign by ID:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = {
  createCampaign,
  getCampaigns,
  getCampaignById,
};
