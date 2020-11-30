//DB imports----------------------------------------
const { resolve } = require("path");
const path = require("path");
require("dotenv").config({ path: resolve(__dirname, "../../.env") });
const { MongoClient } = require("mongodb");
const { isNull, correctUser } = require("../helpers");
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

module.exports = {
  getAllUsers,
  createUser,
};
