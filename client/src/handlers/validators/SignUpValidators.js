export const isValidEmpty = (state) => {
  if (
    state.name === "" ||
    state.username === "" ||
    state.email === "" ||
    state.password === ""
  ) {
    return false;
  }
  return true;
};

export const isUserNameAlreadyTaken = (state) => {};

export const isEmailValid = (state) => {
  if (state.email) {
    if (!state.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/)) {
      return false;
    }
  }

  return true;
};

export const isPasswordGoodLength = (state) => {
  if (state.password.length < 8) {
    return false;
  }
  return true;
};
