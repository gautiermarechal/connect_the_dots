export const requestCurrentUser = () => ({
  type: "REQUEST_CURRENT_USER",
});

export const receiveCurrentUser = (data) => ({
  type: "RECEIVE_CURRENT_USER",
  data: data,
});

export const errorCurrentUser = () => ({
  type: "ERROR_CURRENT_USER",
});
