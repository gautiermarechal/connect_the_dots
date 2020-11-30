//DB imports----------------------------------------
const { resolve } = require("path");
const path = require("path");
require("dotenv").config({ path: resolve(__dirname, "../../.env") });
const { MongoClient } = require("mongodb");
const { MONGO_URI, DB } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
//-------------------------------------------------

const isNull = (data) => {
  if (!data || data === {}) {
    return true;
  }
  return false;
};

const correctUser = (user) => {
  if (
    Object.keys(user).includes("_id") &&
    Object.keys(user).includes("username") &&
    Object.keys(user).includes("email") &&
    Object.keys(user).includes("password") &&
    Object.keys(user).includes("connections") &&
    Object.keys(user).includes("connections_bookmarked")
  ) {
    return true;
  }
  return false;
};

const validUpdate = (update) => {
  if (
    Object.keys(update).includes("_id") ||
    Object.keys(update).includes("username") ||
    Object.keys(update).includes("email") ||
    Object.keys(update).includes("password") ||
    Object.keys(update).includes("connections") ||
    Object.keys(update).includes("connections_bookmarked")
  ) {
    return true;
  }
  return false;
};

const idFound = async (id) => {
  //DB config----------------------
  const client = MongoClient(MONGO_URI, options);

  await client.connect();

  const db = client.db(DB);
  console.log("DB connected");
  //-------------------------------

  return await db.collection("users").findOne({ _id: id });
};

module.exports = {
  isNull,
  correctUser,
  validUpdate,
  idFound,
};
