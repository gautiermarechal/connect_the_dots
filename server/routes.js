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
  getConnectionByCategory,
  getConnectionBySearchTerm,
  getMostRecentConnections,
  getConnectionByCategoryName,
} = require("./handlers/connections");
//Google Imports
const {
  getBookBySearch,
  getBookById,
  getBookByCategory,
} = require("./handlers/google");
//Categories Imports
const {
  getAllCategories,
  getCategoryById,
  createCategory,
  deleteCategory,
} = require("./handlers/categories");

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

//Get connections by category
router.get("/connections/category/:id", getConnectionByCategory);

//Get connections by category name
router.get("/connections/category/name/:name", getConnectionByCategoryName);

//Get connection by id
router.get("/connections/:id", getConnectionById);

//Get connection by search term
router.get("/search/connections", getConnectionBySearchTerm);

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

//Get most recent connections
router.get("/recent/connections", getMostRecentConnections);
//-------------------------------------------------------

//GOOGLE API AUTH ROUTES---------------------------------
//Get book by search terms
router.get("/books", getBookBySearch);

//Get book by category
router.get("/books/category", getBookByCategory);

//CATEGORIES ROUTES--------------------------------------
//Get all categories
router.get("/categories", getAllCategories);

//Get category by id
router.get("/categories/:id", getCategoryById);

//Create category
router.post("/categories", createCategory);

//Delete category
router.delete("/categories/:id", deleteCategory);

module.exports = router;
