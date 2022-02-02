const User = require("../models/User");
const setUserInfo = require("../utils").setUserInfo;

//= =======================================
// User Routes
//= =======================================
exports.viewProfile = async (req, res, next) => {
  const userId = req.params.userId;
  try {
    let user = await User.findById(userId);
    const userToReturn = setUserInfo(user);
    return res.status(200).json({ user: userToReturn });
  } catch (err) {
    return next(err);
  }
};

exports.getUserSession = async (req, res, next) => {
  try {
    let user = await User.findById(req.user._id);
    const userToReturn = setUserInfo(user);
    return res.status(200).json({ user: userToReturn });
  } catch (err) {
    return next(err);
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    let profile = req.body.profile;
    delete profile.email;
    delete profile.username;
    await User.findByIdAndUpdate(
      req.user._id,
      {
        profile,
      },
      {
        new: true,
      }
    );
    let user = await User.findById(req.user._id);
    res.send({ user });
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
};

exports.deleteProfile = (req, res, next) => {
  User.deleteOne({ _id: req.params.userId }).exec((err, user) => {
    if (err) {
      return next(err);
    }
    res.status(201).json({
      user,
    });
  });
};

exports.listUsers = async (req, res, next) => {
  try {
    let users = await User.find({}, "_id profile");
    return res.status(201).json({
      users,
    });
  } catch (err) {
    return next(err);
  }
};
