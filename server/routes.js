const router = require("express").Router();
//Users Imports
const { getAllUsers, createUser } = require("./handlers/users");
//Connections Imports

//USERS ROUTES-------------------------------------------
//Get all users
router.get("/users", getAllUsers);

//Create a user
router.post("/users", createUser);
//-------------------------------------------------------

//CONNECTIONS ROUTES-------------------------------------
//-------------------------------------------------------

module.exports = router;
