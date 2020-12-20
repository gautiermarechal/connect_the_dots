const createConnection = (data) => {
  fetch("https://connectthedots-514.herokuapp.com/connections", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ ...data }),
  });
};

export default createConnection;
