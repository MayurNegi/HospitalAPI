const express = require("express");
const port = 8000;
const app = express();

app.use("/", require("./routes/index"));

app.listen(port, function (err) {
  if (err) {
    console.log("error in creating the server", err);
    reutrn;
  }

  console.log("server is successfully setup and running on port", port);
});
