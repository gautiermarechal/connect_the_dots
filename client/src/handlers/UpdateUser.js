const updateUser = (id, fieldToModify, payload) => {
  console.log(payload);
  fetch(`https://connectthedots-514.herokuapp.com/users/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ [fieldToModify]: payload }),
  });
};

export default updateUser;
