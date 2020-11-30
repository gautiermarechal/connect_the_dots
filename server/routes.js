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
//-------------------------------------------------------

module.exports = router;
