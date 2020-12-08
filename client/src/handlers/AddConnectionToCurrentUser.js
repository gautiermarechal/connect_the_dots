const addConnectionToCurrentUser = (id, connection) => {
  fetch(`http://localhost:4000/users/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "PATCH",
    body: JSON.stringify({ connections: connection }),
  });
};

export default addConnectionToCurrentUser;
