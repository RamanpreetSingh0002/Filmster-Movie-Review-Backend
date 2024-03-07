const { getAppInfo, getMostRated } = require("../controllers/admin");
const { isAuth, isAdmin } = require("../middlewares/auth");

const adminRouter = require("express").Router();

adminRouter.get("/app-info", isAuth, isAdmin, getAppInfo);
adminRouter.get("/most-rated", isAuth, isAdmin, getMostRated);

module.exports = adminRouter;
