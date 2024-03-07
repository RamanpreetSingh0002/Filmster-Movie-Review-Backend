const express = require("express");
const { isAuth, isAdmin } = require("../middlewares/auth");
const { uploadVideo, uploadImage } = require("../middlewares/multer");
const {
  uploadTrailer,
  createMovie,
  removeMovie,
  getMovies,
  getMovieForUpdate,
  updateMovie,
  searchMovies,
  getLatestUploads,
  getSingleMovie,
  getRelatedMovies,
  getTopRatedMovies,
  searchPublicMovies,
} = require("../controllers/movie");
const { parseData } = require("../utils/helper");
const {
  validateMovie,
  validate,
  validateTrailer,
} = require("../middlewares/validator");
const movieRouter = express.Router();

movieRouter.post(
  "/upload-trailer",
  isAuth,
  isAdmin,
  uploadVideo.single("video"),
  uploadTrailer
);

movieRouter.post(
  "/create",
  isAuth,
  isAdmin,
  uploadImage.single("poster"),
  parseData,
  validateMovie,
  validateTrailer,
  validate,
  createMovie
);

// movieRouter.patch(
//   "/update-movie-without-poster/:movieId",
//   isAuth,
//   isAdmin,
//   // parseData,
//   validateMovie,
//   validate,
//   updateMovieWithoutPoster
// );

movieRouter.patch(
  "/update/:movieId",
  isAuth,
  isAdmin,
  uploadImage.single("poster"),
  parseData,
  validateMovie,
  validate,
  updateMovie
);

movieRouter.delete("/:movieId", isAuth, isAdmin, removeMovie);
movieRouter.get("/movies", isAuth, isAdmin, getMovies);
movieRouter.get("/for-update/:movieId", isAuth, isAdmin, getMovieForUpdate);
movieRouter.get("/search", isAuth, isAdmin, searchMovies);

// for normal users
movieRouter.get("/latest-uploads", getLatestUploads);
movieRouter.get("/single/:movieId", getSingleMovie);
movieRouter.get("/related/:movieId", getRelatedMovies);
movieRouter.get("/top-rated", getTopRatedMovies);
movieRouter.get("/search-public", searchPublicMovies);

module.exports = movieRouter;
