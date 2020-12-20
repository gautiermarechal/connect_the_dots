//DB imports----------------------------------------
const { resolve } = require("path");
const path = require("path");
require("dotenv").config({ path: resolve(__dirname, "/.env") });
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

//Get all connections
const getAllConnections = async (req, res) => {
  try {
    //DB config
    const client = MongoClient(MONGO_URI, options);

    await client.connect();

    const db = client.db(DB);
    console.log("DB connected");
    //-------------------------------

    const result = await db
      .collection("connections")
      .find()
      .limit(25)
      .toArray();

    res.status(200).json({ status: 200, data: result });
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message });
  }
};

//Get connections by category
const getConnectionByCategory = async (req, res) => {
  try {
    //DB config
    const client = MongoClient(MONGO_URI, options);

    await client.connect();

    const db = client.db(DB);
    console.log("DB connected");
    //-------------------------------
    //Get requested category name
    const categoryId = req.params.id;
    db.collection("categories").findOne(
      { _id: categoryId },
      async (err, result) => {
        const resultConnections = await db
          .collection("connections")
          .find({ categories: result.name })
          .toArray();

        res.status(200).json({ status: 200, data: resultConnections });
      }
    );
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message });
  }
};

//Get connections by category name
const getConnectionByCategoryName = async (req, res) => {
  try {
    //DB config
    const client = MongoClient(MONGO_URI, options);

    await client.connect();

    const db = client.db(DB);
    console.log("DB connected");
    //-------------------------------
    //Get requested category name
    const categoryName = req.params.name;

    const resultConnections = await db
      .collection("connections")
      .find({ categories: categoryName })
      .toArray();

    res.status(200).json({ status: 200, data: resultConnections });
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message });
  }
};

//Get connection by id
const getConnectionById = async (req, res) => {
  try {
    //DB config
    const client = MongoClient(MONGO_URI, options);

    await client.connect();

    const db = client.db(DB);
    console.log("DB connected");
    //-------------------------------
    const connectionId = req.params.id;

    db.collection("connections").findOne(
      { _id: connectionId },
      (err, result) => {
        if (isNull(result)) {
          res
            .status(404)
            .json({ status: 404, message: "Connection not found" });
        } else {
          res.status(200).json({ status: 200, data: result });
        }
      }
    );
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message });
  }
};

//Create connection
const createConnection = async (req, res) => {
  try {
    //DB config
    const client = MongoClient(MONGO_URI, options);

    await client.connect();

    const db = client.db(DB);
    console.log("DB connected");
    //-------------------------------
    const newConnection = req.body;

    if (!correctConnection(newConnection)) {
      res.status(400).json({ status: 400, error: "Bad body request." });
      return;
    }

    db.collection("connections").insertOne({ ...newConnection });

    res.status(200).json({ status: 200, data: "Connection created!" });
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message });
  }
};

const updateConnection = async (req, res) => {
  try {
    //DB config
    const client = MongoClient(MONGO_URI, options);

    await client.connect();

    const db = client.db(DB);
    console.log("DB connected");
    //-------------------------------
    const connectionId = req.params.id;
    const connectionModifications = req.body;

    if (!validUpdateConnection(connectionModifications)) {
      res.status(400).json({ status: 400, error: "Bad request." });
      return;
    }

    db.collection("connections").updateOne(
      { _id: connectionId },
      { $set: { ...connectionModifications } }
    );

    res.status(200).json({ status: 200, data: "Connection updated!" });
  } catch (error) {}
};

const deleteConnection = async (req, res) => {
  try {
    //DB config
    const client = MongoClient(MONGO_URI, options);

    await client.connect();

    const db = client.db(DB);
    console.log("DB connected");
    //-------------------------------
    const connectionId = req.params.id;

    db.collection("connections").deleteOne({ _id: connectionId });

    res.status(200).json({ status: 200, data: "Connection deleted!" });
  } catch (error) {
    res.status(500).json({ status: 500, data: error.message });
  }
};

//Get connections for user feed
const getConnectionsUserFeed = async (req, res) => {
  try {
    //DB config
    const client = MongoClient(MONGO_URI, options);

    await client.connect();

    const db = client.db(DB);
    console.log("DB connected");
    //-------------------------------
    //Get user who requested the feed
    const userId = req.params.id;
    db.collection("users").findOne({ _id: userId }, async (err, user) => {
      try {
        //Final result array
        const resultArray = [];
        //Get all connections from authors bookmarked
        const authorsBookmarked = user.authors_bookmarked;
        authorsBookmarked.forEach(async (author) => {
          const resultConnections = await db
            .collection("connections")
            .find({ "author._id": author._id })
            .toArray();
          resultArray.push(...resultConnections);
        });
        //Get all connections from books bookmarked
        const booksBookmarked = user.books_bookmarked;
        booksBookmarked.forEach(async (book) => {
          const resultConnections = await db
            .collection("connections")
            .find({ "books.id": book.id })
            .toArray();
          resultArray.push(...resultConnections);
        });
        if (user.categories_bookmarked.length !== 0) {
          //Get all connections from categories bookmarked
          const categoriesBookmarked = user.categories_bookmarked;
          categoriesBookmarked.forEach(async (category) => {
            const resultConnections = await db
              .collection("connections")
              .find({ categories: category })
              .toArray();
            resultArray.push(...resultConnections);

            //Remove all duplicates
            const uniqueConnections = Array.from(
              new Set(resultArray.map((connection) => connection._id))
            ).map((_id) => {
              return resultArray.find((connection) => connection._id === _id);
            });

            res.status(200).json({ status: 200, data: uniqueConnections });
          });
        } else {
          //Remove all duplicates
          const uniqueConnections = Array.from(
            new Set(resultArray.map((connection) => connection._id))
          ).map((_id) => {
            return resultArray.find((connection) => connection._id === _id);
          });

          res.status(200).json({ status: 200, data: uniqueConnections });
        }
      } catch (error) {
        throw new Error(error);
      }
    });
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message });
  }
};

//Upload banner image connection
const uploadBannerImage = (req, res) => {
  try {
    res.status(200).json({ status: 200, data: req.file });
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message });
  }
};

//Get connection by search term
const getConnectionBySearchTerm = async (req, res) => {
  try {
    //DB config
    const client = MongoClient(MONGO_URI, options);

    await client.connect();

    const db = client.db(DB);
    console.log("DB connected");
    //-------------------------------
    const search = req.query.search;
    db.collection("connections").createIndex({
      title: "text",
    });
    const searchResult = await db
      .collection("connections")
      .find({ $text: { $search: search } })
      .toArray();

    const searchResultCategoriesTitle = await db
      .collection("connections")
      .find({ "books.volumeInfo.title": { $eq: "sapiens" } })
      .toArray();

    res.status(200).json({
      status: 200,
      data: searchResult.concat(searchResultCategoriesTitle),
    });
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message });
  }
};

//Get most recent connections
const getMostRecentConnections = async (req, res) => {
  try {
    //DB config
    const client = MongoClient(MONGO_URI, options);

    await client.connect();

    const db = client.db(DB);
    console.log("DB connected");
    //-------------------------------
    const result = await db
      .collection("connections")
      .find()
      .sort({ $natural: -1 })
      .limit(3)
      .toArray();

    res.status(200).json({ status: 200, data: result });
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message });
  }
};

module.exports = {
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
};
