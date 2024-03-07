const mongoose = require("mongoose");

// connect
mongoose
  .connect(process.env.MONGO_URL)
  // .connect("mongodb://localhost:27017/Filmster")
  .then(() => {
    console.log("DB Connected Successfully");
  })
  .catch(er => {
    console.log("DB Connection Failed", er);
  });
