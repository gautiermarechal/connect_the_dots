const router = require("express").Router();
const path = require("path");
const multer = require("multer");
const crypto = require("crypto");
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
  getConnectionsUserFeed,
  uploadBannerImage,
} = require("./handlers/connections");
//Google Imports
const { getBookBySearch, getBookById } = require("./handlers/google");

//Multer config------------------------------------------
const storage = multer.diskStorage({
  destination: "./uploads/banners",
  filename: function (req, file, cb) {
    crypto.pseudoRandomBytes(16, function (err, raw) {
      if (err) return cb(err);

      cb(null, raw.toString("hex") + path.extname(file.originalname));
    });
  },
});

const upload = multer({ storage: storage });

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

//Upload Banner Image of connection
router.post("/connections/upload", upload.single("banner"), uploadBannerImage);

//Update connection
router.patch("/connections/:id", updateConnection);

//Delete connection
router.delete("/connections/:id", deleteConnection);

//Get connections for user feed
router.get("/connections/feed/:id", getConnectionsUserFeed);
//-------------------------------------------------------

//GOOGLE API AUTH ROUTES---------------------------------
//Get book by search terms
router.get("/books", getBookBySearch);

module.exports = router;
