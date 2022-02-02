// Set user info from request
exports.setUserInfo = function setUserInfo(request) {
  return {
    _id: request._id,
    profile: request.profile,
    email: request.email,
    role: request.role,
    verified: request.verified,
  };
};

exports.compareIds = function (id1, id2) {
  if (!id1 || !id2) return false;
  return id1.toString() === id2.toString();
};

exports.sleep = function (ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
