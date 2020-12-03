const fetch = require("node-fetch");

const getBookBySearch = (req, res) => {
  const API_KEY = process.env.GOOGLE_API_KEY;

  const query = req.query.query;

  fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}&key=${API_KEY}`)
    .then((res) => res.json())
    .then((result) => {
      res.status(200).json({ status: 200, data: result });
    });
};

module.exports = {
  getBookBySearch,
};
