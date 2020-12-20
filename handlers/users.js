//DB imports----------------------------------------
const { resolve } = require("path");
const path = require("path");
require("dotenv").config({ path: resolve(__dirname, "../.env") });
const { MongoClient } = require("mongodb");
const { isNull, correctUser, validUpdate, idFound } = require("../helpers");
const { MONGO_URI, DB } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
//-------------------------------------------------

//Get all users
const getAllUsers = async (req, res) => {
  try {
    //DB config----------------------
    const client = MongoClient(MONGO_URI, options);

    await client.connect();

    const db = client.db(DB);
    console.log("DB connected");
    //-------------------------------
    const result = await db.collection("users").find().limit(25).toArray();

    if (isNull(result)) {
      res.status(404).json({ status: 404, error: "Users empty" });
    } else {
      res.status(200).json({ status: 200, data: result });
    }
  } catch (error) {
    res
      .status(500)
      .json({ status: 500, error: error.message, URI: "uri" || MONGO_URI });
  }
};

//Get user by id
const getUserById = async (req, res) => {
  try {
    //DB config----------------------
    const client = MongoClient(MONGO_URI, options);

    await client.connect();

    const db = client.db(DB);
    console.log("DB connected");
    //-------------------------------
    const userId = req.params.id;

    db.collection("users").findOne({ _id: userId }, (err, result) => {
      if (err) {
        throw new Error(err.message);
      } else {
        if (isNull(result)) {
          res.status(404).json({ status: 404, error: "User not found" });
        } else {
          res.status(200).json({ status: 200, data: result });
        }
      }
    });
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message });
  }
};

//Get user by email
const getUserByEmail = async (req, res) => {
  try {
    //DB config----------------------
    const client = MongoClient(MONGO_URI, options);

    await client.connect();

    const db = client.db(DB);
    console.log("DB connected");
    //-------------------------------
    const userEmail = req.params.email;

    db.collection("users").findOne({ email: userEmail }, (err, result) => {
      if (err) {
        throw new Error(err.message);
      } else {
        if (isNull(result)) {
          res.status(404).json({ status: 404, error: "User not found" });
        } else {
          res.status(200).json({ status: 200, data: result });
        }
      }
    });
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message });
  }
};

//Create a user
const createUser = async (req, res) => {
  try {
    //DB config----------------------
    const client = MongoClient(MONGO_URI, options);

    await client.connect();

    const db = client.db(DB);
    console.log("DB connected");
    //-------------------------------

    const newUser = req.body;

    if (isNull(newUser) || correctUser(newUser)) {
      res.status(400).json({ status: 400, message: "Bad request body." });
    }

    db.collection("users").insertOne(req.body);

    res.status(200).json({ status: 200, data: "data" });
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message });
  }
};

//Update user
const updateUser = async (req, res) => {
  try {
    //DB config----------------------
    const client = MongoClient(MONGO_URI, options);

    await client.connect();

    const db = client.db(DB);
    console.log("DB connected");
    //-------------------------------
    const fieldsToChange = req.body;
    const userId = req.params.id;

    if (validUpdate(fieldsToChange)) {
      if (
        Object.keys(fieldsToChange).includes("authors_bookmarked") ||
        Object.keys(fieldsToChange).includes("connections_bookmarked") ||
        Object.keys(fieldsToChange).includes("categories_bookmarked") ||
        Object.keys(fieldsToChange).includes("books_bookmarked") ||
        Object.keys(fieldsToChange).includes("connections")
      ) {
        db.collection("users").updateOne(
          { _id: userId },
          { $push: { ...fieldsToChange } }
        );
      } else {
        db.collection("users").updateOne(
          { _id: userId },
          { $set: { ...fieldsToChange } }
        );
      }

      res.status(200).json({ status: 200, data: "User updated!" });
    } else {
      res.status(400).json({ status: 400, error: "Bad body request!" });
    }
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message });
  }
};

//Delete user
const deleteUser = async (req, res) => {
  try {
    //DB config----------------------
    const client = MongoClient(MONGO_URI, options);

    await client.connect();

    const db = client.db(DB);
    console.log("DB connected");
    //-------------------------------

    const userId = req.params.id;

    db.collection("users").deleteOne({ _id: userId });

    res.status(200).json({ status: 200, data: "User deleted!" });
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message });
  }
};

module.exports = {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  getUserByEmail,
};
