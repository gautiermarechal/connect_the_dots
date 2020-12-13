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

const getBookByCategory = (req, res) => {
  const API_KEY = process.env.GOOGLE_API_KEY;

  const query = req.query.category;

  fetch(
    `https://www.googleapis.com/books/v1/volumes?q=insubject${query}&key=${API_KEY}`
  )
    .then((res) => res.json())
    .then((result) => {
      const min = 0;
      const max = result.items.length - 1;
      const indexToPick = Math.floor(Math.random() * (max - min) + min);
      const bookChosen = result.items[indexToPick];

      console.log(indexToPick);

      res.status(200).json({ status: 200, data: bookChosen });
    });
};

module.exports = {
  getBookBySearch,
  getBookByCategory,
};
