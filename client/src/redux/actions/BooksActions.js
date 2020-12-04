export const requestBooks = () => ({
  type: "REQUEST_BOOKS",
});

export const receiveBooks = (data) => ({
  type: "RECEIVE_BOOKS",
  data: data,
});

export const errorBooks = () => ({
  type: "ERROR_BOOKS",
});

export const clearBooks = () => ({
  type: "CLEAR_BOOKS",
});
