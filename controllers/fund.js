const Fund = require("../models/Fund");

// createFund creates new fund record for user
/**
 * request fund params
 * @param {MongooseID} user
 * @param {String} assumed_name
 * @param {String} legal_name
 * @param {String} legal_formation
 * @param {String} description
 * @param {String} mission_statement
 * @param {String} website
 * @param {Array} primary_industry
 * @param {String} number_employees
 * @param {String} primary_address
 * @param {Array} other_addresses
 * @param {Array} operating_countries
 * @param {Array} operating_currencies
 * @param {String} fund_type
 * @param {String} fund_number
 */
exports.createFund = async (req, res) => {
  try {
    let newFund = new Fund(req.body);

    const fund = await newFund.save();

    res.status(200).json({ message: "Fund created successfully!", fund });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
