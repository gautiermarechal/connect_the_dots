const path = require("path");
const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const app = express();
const serverPort = 4000;
const serveStatic = require("serve-static");
app.use("/uploads", express.static(__dirname + "/uploads"));

app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(serveStatic(__dirname + "/client/build"));

app.get("/", (req, res) => {
  res
    .status(200)
    .json({ status: 200, message: ` Server is running on port ${serverPort}` });
});

//ROUTES
app.use(require("./routes"));

app.listen(process.env.PORT || serverPort, () =>
  console.log(`Server running on port ${serverPort}`)
);
