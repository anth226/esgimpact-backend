const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// company model
const CompanySchema = new Schema({
  user: { type: String, require: true },
  assumed_name: { type: String, require: true },
  legal_name: { type: String, require: true },
  legal_formation: { type: String, require: true },
  description: { type: String },
  mission_statement: { type: String },
  company_website: { type: String },
  primary_industry: { type: String },
  secondary_industries: {type: Array,default: [  ]},
  primary_products: { type: String },
  number_employees: { type: String },
  primary_address: { type: String },
  other_addresses: { type: String },
  operating_countries: { type: String },
  operating_currencies: { type: String },
  ttm_revenue: { type: Number },
  ttm_revenue_currency: { type: String },
  net_positive: { type: String },
});

module.exports = mongoose.model("Company", CompanySchema);
