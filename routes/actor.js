const express = require("express");
const {
  createActor,
  updateActor,
  removeActor,
  searchActor,
  getLatestActors,
  getSingleActor,
  getActors,
} = require("../controllers/actor");
const { uploadImage } = require("../middlewares/multer");
const { actorInfoValidator, validate } = require("../middlewares/validator");
const { isAuth, isAdmin } = require("../middlewares/auth");
const actorsRouter = express.Router();

actorsRouter.post(
  "/create",
  isAuth,
  isAdmin,
  uploadImage.single("avatar"),
  actorInfoValidator,
  validate,
  createActor
);

actorsRouter.post(
  "/update/:actorId",
  isAuth,
  isAdmin,
  uploadImage.single("avatar"),
  actorInfoValidator,
  validate,
  updateActor
);

actorsRouter.delete("/:actorId", isAuth, isAdmin, removeActor);
actorsRouter.get("/search", isAuth, isAdmin, searchActor);
actorsRouter.get("/latest-uploads", isAuth, isAdmin, getLatestActors);
actorsRouter.get("/actors", isAuth, isAdmin, getActors);
actorsRouter.get("/single/:id", getSingleActor);

module.exports = actorsRouter;
