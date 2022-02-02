// Importing Node packages required for schema
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt-nodejs");
const ROLE_FUND = require("../constants").ROLE_FUND;
const ROLE_COMPANY = require("../constants").ROLE_COMPANY;
const ROLE_ADMIN = require("../constants").ROLE_ADMIN;

//= ===============================
// User Schema
//= ===============================
const UserSchema = new Schema(
  {
    email: {
      type: String,
      lowercase: true,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    profile: {
      first_name: { type: String, required: true },
      last_name: { type: String, required: true },
      position: { type: String, required: true },
      type: { type: String },
      domain: { type: String },
      picture: { type: String },
    },
    role: {
      type: String,
      enum: [ROLE_FUND, ROLE_COMPANY, ROLE_ADMIN],
      default: ROLE_FUND,
    },
    verified: { type: Boolean },
  },
  {
    timestamps: true,
  }
);

//= ===============================
// User ORM Methods
//= ===============================
// Pre-save of user to database, hash password if password is modified or new
UserSchema.pre("save", function (next) {
  const user = this,
    SALT_FACTOR = 5;

  if (!user.isModified("password")) return next();

  bcrypt.genSalt(SALT_FACTOR, (err, salt) => {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

// Method to compare password for login
UserSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) {
      return cb(err);
    }
    cb(null, isMatch);
  });
};

module.exports = mongoose.model("User", UserSchema);
