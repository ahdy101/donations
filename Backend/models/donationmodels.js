const db = require('../Backend/db/db');

async function createDonation(userId, donationDate, donationType, amount, itemName, description, campaignName) {
  try {
    const query = `
      INSERT INTO Donations (user_id, donation_date, donation_type, amount, item_name, description, campaign_name)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING donation_id, user_id, donation_date, donation_type, amount, item_name, description, campaign_name;
    `;
    const values = [userId, donationDate, donationType, amount, itemName, description, campaignName];

    const result = await db.query(query, values);
    return result.rows[0];
  } catch (error) {
    throw error;
  }
}

async function getDonationsByUserId(userId) {
  try {
    const query = `
      SELECT donation_id, user_id, donation_date, donation_type, amount, item_name, description, campaign_name
      FROM Donations
      WHERE user_id = $1;
    `;
    const values = [userId];

    const result = await db.query(query, values);
    return result.rows;
  } catch (error) {
    throw error;
  }
}

async function getAllDonations() {
  try {
    const query = `
      SELECT donation_id, user_id, donation_date, donation_type, amount, item_name, description, campaign_name
      FROM Donations;
    `;

    const result = await db.query(query);
    return result.rows;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createDonation,
  getDonationsByUserId,
  getAllDonations,
};
