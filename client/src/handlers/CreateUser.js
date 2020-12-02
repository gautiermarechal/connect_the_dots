const createUser = (user) => {
  fetch("http://localhost:4000/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...user }),
  });
};

export default createUser;
