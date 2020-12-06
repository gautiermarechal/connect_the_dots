const createConnection = (data) => {
  fetch("http://localhost:4000/connections", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ ...data }),
  });
};

export default createConnection;
