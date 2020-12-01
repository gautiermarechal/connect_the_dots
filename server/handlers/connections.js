//DB imports----------------------------------------
const { resolve } = require("path");
const path = require("path");
require("dotenv").config({ path: resolve(__dirname, "../../.env") });
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

module.exports = {
  getAllConnections,
  createConnection,
  getConnectionById,
  updateConnection,
  deleteConnection,
};
