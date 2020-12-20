const createUser = (user) => {
  fetch("https://connectthedots-514.herokuapp.com/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...user }),
  });
};

export default createUser;
