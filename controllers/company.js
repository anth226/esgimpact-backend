const Company = require("../models/Company");

// createCompany creates new company record for user
/**
 * request company params
 * @param {MongooseID} user
 * @param {String} assumed_name
 * @param {String} legal_name
 * @param {String} legal_formation
 * @param {String} description
 * @param {String} mission_statement
 * @param {String} company_website
 * @param {Array} sics_codes
 * @param {String} primary_products
 * @param {String} number_employees
 * @param {String} primary_address
 * @param {Array} other_addresses
 * @param {Array} operating_countries
 * @param {Array} operating_currencies
 * @param {String} ttm_revenue
 * @param {String} ttm_revenue_currency
 * @param {String} net_positive
 */
exports.createCompany = async (req, res) => {
  try {
    let newCompany = new Company(req.body);

    let company = await newCompany.save();

    res.status(200).json({ message: "Company created successfully!", company });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
