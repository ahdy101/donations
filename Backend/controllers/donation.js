const donationModels = require('../models/donationmodels');

async function createDonation(req, res) {
  const { userId, donationDate, donationType, amount, itemName, description, campaignName } = req.body;

  try {
    const newDonation = await donationModels.createDonation(userId, donationDate, donationType, amount, itemName, description, campaignName);
    res.status(201).json({ message: 'Donation created successfully', donation: newDonation });
  } catch (error) {
    console.error('Error creating donation:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function getDonationsByUserId(req, res) {
  const userId = req.params.userId;

  try {
    const userDonations = await donationModels.getDonationsByUserId(userId);
    res.status(200).json(userDonations);
  } catch (error) {
    console.error('Error getting user donations:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function getAllDonations(req, res) {
  try {
    const allDonations = await donationModels.getAllDonations();
    res.status(200).json(allDonations);
  } catch (error) {
    console.error('Error getting all donations:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = {
  createDonation,
  getDonationsByUserId,
  getAllDonations,
};
