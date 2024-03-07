const {
  addReview,
  updateReview,
  removeReview,
  getReviewsByMovie,
} = require("../controllers/review");
const { isAuth } = require("../middlewares/auth");
const { validateRatings, validate } = require("../middlewares/validator");

const reviewRouter = require("express").Router();

reviewRouter.post(
  "/add/:movieId",
  isAuth,
  validateRatings,
  validate,
  addReview
);

reviewRouter.patch(
  "/:reviewId",
  isAuth,
  validateRatings,
  validate,
  updateReview
);

reviewRouter.delete("/:reviewId", isAuth, removeReview);
reviewRouter.get("/get-reviews-by-movie/:movieId", getReviewsByMovie);

module.exports = reviewRouter;
