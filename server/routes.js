const router = require("express").Router();
//Users Imports
const {
  getAllUsers,
  createUser,
  getUserById,
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

//USERS ROUTES-------------------------------------------
//Get all users
router.get("/users", getAllUsers);

//Get user by Id
router.get("/users/:id", getUserById);

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

module.exports = router;
