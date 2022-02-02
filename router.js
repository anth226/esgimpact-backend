const express = require("express");
const passport = require("passport");

const AuthenticationController = require("./controllers/authentication");
const UserController = require("./controllers/user");
const CompanyController = require("./controllers/company");
const FundController = require("./controllers/fund");

const passportService = require("./config/passport");

// Middleware to require login/auth
const requireAuth = passport.authenticate("jwt", { session: false });

module.exports = function (app) {
  // Initializing route groups
  const apiRoutes = express.Router(),
    authRoutes = express.Router(),
    userRoutes = express.Router(),
    companyRoutes = express.Router(),
    fundRoutes = express.Router();

  //= ========================
  // Auth Routes
  //= ========================
  apiRoutes.use("/auth", authRoutes);
  // Participant Registration route
  authRoutes.post(
    "/register",
    AuthenticationController.participantRegister
  );
  // Login route
  authRoutes.post("/login", AuthenticationController.login);
  // Password reset request route (generate/send token)
  authRoutes.post("/forgot-password", AuthenticationController.forgotPassword);
  // Password reset route (change password using token)
  authRoutes.post(
    "/reset-password/:token",
    AuthenticationController.verifyToken
  );
  // Password reset route (change password using security question)
  authRoutes.post(
    "/reset-password-security",
    AuthenticationController.resetPasswordSecurity
  );
  // Verify route
  authRoutes.post("/verify", AuthenticationController.confirmEmail);
  // Resend verification route
  authRoutes.post("/resend", AuthenticationController.resendVerification);

  //= ========================
  // User Routes
  //= ========================
  apiRoutes.use("/user", userRoutes);
  // View user profile route
  userRoutes.get("/:userId", UserController.viewProfile);
  // delete user route
  userRoutes.delete("/:userId", requireAuth, UserController.deleteProfile);
  // Update user profile route
  userRoutes.post("/", requireAuth, UserController.updateProfile);
  // All user route
  userRoutes.get("/simple-user/list", requireAuth, UserController.listUsers);

  // Test protected route
  apiRoutes.get("/protected", requireAuth, UserController.getUserSession);

  //= ========================
  // Company Routes
  //= ========================
  apiRoutes.use("/company", companyRoutes);
  companyRoutes.post("/create", CompanyController.createCompany);

  //= ========================
  // Fund Routes
  //= ========================
  apiRoutes.use("/fund", fundRoutes);
  fundRoutes.post("/create", FundController.createFund);

  // Set url for API group routes
  app.use("/api", apiRoutes);
};
