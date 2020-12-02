export const isValidEmail = (email) => {
  if (email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/)) {
    return true;
  } else {
    return false;
  }
};

export const isValidEmpty = (email, password) => {
  if (email === "" || password === "") {
    return false;
  } else {
    return true;
  }
};

export const userMatches = (email, password) => {
  //Check if email exists in the db
  return fetch(`http://localhost:4000/users/email/${email}`)
    .then((res) => res.json())
    .then((json) => {
      if (json.error) {
        throw new Error();
      } else {
        if (json.data.password === password) {
          return true;
        } else {
          return false;
        }
      }
    })
    .catch((err) => {
      return false;
    });
};
