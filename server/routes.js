const router = require("express").Router();
//Users Imports
const {
  getAllUsers,
  createUser,
  getUserById,
  getUserByEmail,
  updateUser,
  deleteUser,
} = require("./handlers/users");
//Connections Imports
const {
  getAllConnections,
  createConnection,
  getConnectionById,
  updateConnection,
  deleteConnection,
} = require("./handlers/connections");
//Google Imports
const { getBookBySearch } = require("./handlers/google");

//USERS ROUTES-------------------------------------------
//Get all users
router.get("/users", getAllUsers);

//Get user by Id
router.get("/users/:id", getUserById);

//Get user by email
router.get("/users/email/:email", getUserByEmail);

//Create a user
router.post("/users", createUser);

//Update user
router.patch("/users/:id", updateUser);

//Delete user
router.delete("/users/:id", deleteUser);
//-------------------------------------------------------

//CONNECTIONS ROUTES-------------------------------------
//Get all connections
router.get("/connections", getAllConnections);

//Get connection by id
router.get("/connections/:id", getConnectionById);

//Create connection
router.post("/connections", createConnection);

//Update connection
router.patch("/connections/:id", updateConnection);

//Delete connection
router.delete("/connections/:id", deleteConnection);
//-------------------------------------------------------

//GOOGLE API AUTH ROUTES---------------------------------
//Get access token
router.get("/books", getBookBySearch);

module.exports = router;
