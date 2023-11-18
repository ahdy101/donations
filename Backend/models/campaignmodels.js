const db = require('../Backend/db/db');

async function createCampaign(campaignName, description) {
  try {
    const query = `
      INSERT INTO Campaigns (campaign_name, description)
      VALUES ($1, $2)
      RETURNING campaign_id, campaign_name, description;
    `;
    const values = [campaignName, description];

    const result = await db.query(query, values);
    return result.rows[0];
  } catch (error) {
    throw error;
  }
}

async function getCampaigns() {
  try {
    const query = `
      SELECT campaign_id, campaign_name, description
      FROM Campaigns;
    `;

    const result = await db.query(query);
    return result.rows;
  } catch (error) {
    throw error;
  }
}

async function getCampaignById(campaignId) {
  try {
    const query = `
      SELECT campaign_id, campaign_name, description
      FROM Campaigns
      WHERE campaign_id = $1;
    `;
    const values = [campaignId];

    const result = await db.query(query, values);
    return result.rows[0];
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createCampaign,
  getCampaigns,
  getCampaignById,
};
