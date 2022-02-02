const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// fund model
const FundSchema = new Schema({
  user: { type: String, require: true },
  assumed_name: { type: String, require: true },
  legal_name: { type: String, require: true },
  legal_formation: { type: String, require: true },
  description: { type: String },
  mission_statement: { type: String },
  website: { type: String },
  sics_codes: { type: String },
  number_employees: { type: String },
  primary_address: { type: String },
  other_addresses: { type: String },
  operating_countries: { type: String },
  operating_currencies: { type: String },
  fund_type: { type: String },
  fund_number: { type: String },
});

module.exports = mongoose.model("Fund", FundSchema);
