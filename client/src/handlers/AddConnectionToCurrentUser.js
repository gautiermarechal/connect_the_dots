const addConnectionToCurrentUser = (id, connection) => {
  fetch(`https://connectthedots-514.herokuapp.com/users/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "PATCH",
    body: JSON.stringify({ connections: connection }),
  });
};

export default addConnectionToCurrentUser;
