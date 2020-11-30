const users = ["john", "jean"];

const getAllUsers = (req, res) => {
  res.status(200).json({ status: 200, data: users });
};

module.exports = {
  getAllUsers,
};
