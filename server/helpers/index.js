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
    return false;
  }
  return true;
};

module.exports = {
  isNull,
  correctUser,
};
