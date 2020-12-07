const updateUser = (id, fieldToModify, payload) => {
  fetch(`http://localhost:4000/users/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: { [fieldToModify]: payload },
  });
};

export default updateUser;
