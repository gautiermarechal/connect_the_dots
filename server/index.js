const path = require("path");
const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const app = express();
const serverPort = 4000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res
    .status(200)
    .json({ status: 200, message: ` Server is running on port ${serverPort}` });
});

//ROUTES
app.use(require("./routes"));

app.listen(serverPort, () =>
  console.log(`Server running on port ${serverPort}`)
);
