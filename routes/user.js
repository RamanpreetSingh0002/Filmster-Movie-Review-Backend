const express = require("express");
const {
  create,
  verifyEmail,
  resendEmailVerification,
  forgetPassword,
  sendResetPasswordTokenStatus,
  resetPassword,
  signIn,
} = require("../controllers/user");
const { isValidPassResetToken } = require("../middlewares/user");
const {
  userValidator,
  validate,
  validatePassword,
  signInValidator,
} = require("../middlewares/validator");
const { isAuth } = require("../middlewares/auth");

const usersRouter = express.Router();

// making different users Router
usersRouter.post("/create", userValidator, validate, create);
usersRouter.post("/sign-in", signInValidator, validate, signIn);
usersRouter.post("/verify-email", verifyEmail);
usersRouter.post("/resend-email-verification-token", resendEmailVerification);
usersRouter.post("/forget-password", forgetPassword);
usersRouter.post(
  "/verify-pass-reset-token",
  isValidPassResetToken,
  sendResetPasswordTokenStatus
);
usersRouter.post(
  "/reset-password",
  validatePassword,
  validate,
  isValidPassResetToken,
  resetPassword
);

usersRouter.get("/is-auth", isAuth, (req, res) => {
  const { user } = req;
  res.json({
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      isVerified: user.isVerified,
      role: user.role,
    },
  });
});

module.exports = usersRouter;
