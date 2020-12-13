const updateUser = (id, fieldToModify, payload) => {
  console.log(payload);
  fetch(`http://localhost:4000/users/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ [fieldToModify]: payload }),
  });
};

export default updateUser;
