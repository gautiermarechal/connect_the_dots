//DB imports----------------------------------------
const { resolve } = require("path");
const path = require("path");
require("dotenv").config({ path: resolve(__dirname, "../.env") });
const { MongoClient } = require("mongodb");
const {
  correctConnection,
  isNull,
  validUpdateConnection,
} = require("../helpers");
const { MONGO_URI, DB } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
//-------------------------------------------------

//Get all categories
const getAllCategories = async (req, res) => {
  try {
    //DB config----------------------
    const client = MongoClient(MONGO_URI, options);

    await client.connect();

    const db = client.db(DB);
    console.log("DB connected");
    //-------------------------------
    const result = await db.collection("categories").find().toArray();

    if (isNull(result)) {
      res.status(404).json({ status: 404, error: "Categories empty" });
    } else {
      res.status(200).json({ status: 200, data: result });
    }
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message });
  }
};

//Get category by id
const getCategoryById = async (req, res) => {
  try {
    //DB config----------------------
    const client = MongoClient(MONGO_URI, options);

    await client.connect();

    const db = client.db(DB);
    console.log("DB connected");
    //-------------------------------
    const categoryId = req.params.id;

    db.collection("categories").findOne({ _id: categoryId }, (err, result) => {
      if (err) {
        throw new Error(err.message);
      } else {
        if (isNull(result)) {
          res.status(404).json({ status: 404, error: "Category not found" });
        } else {
          res.status(200).json({ status: 200, data: result });
        }
      }
    });
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message });
  }
};

//Create a category
const createCategory = async (req, res) => {
  try {
    //DB config----------------------
    const client = MongoClient(MONGO_URI, options);

    await client.connect();

    const db = client.db(DB);
    console.log("DB connected");
    //-------------------------------

    const newCategory = req.body;

    if (isNull(newCategory)) {
      res.status(400).json({ status: 400, message: "Bad request body." });
    }

    db.collection("categories").insertOne(req.body);

    res.status(200).json({ status: 200, data: "Category created" });
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message });
  }
};

//Delete category
const deleteCategory = async (req, res) => {
  try {
    //DB config----------------------
    const client = MongoClient(MONGO_URI, options);

    await client.connect();

    const db = client.db(DB);
    console.log("DB connected");
    //-------------------------------

    const categoryId = req.params.id;

    db.collection("categories").deleteOne({ _id: categoryId });

    res.status(200).json({ status: 200, data: "Category deleted!" });
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message });
  }
};

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  deleteCategory,
};
