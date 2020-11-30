const router = require("express").Router();
//Users Imports
const { getAllUsers } = require("./helpers/users");

router.get("/users", (req, res) => getAllUsers(req, res));

module.exports = router;
