export const startPostConnection = () => ({
  type: "START_POST_CONNECTION",
});

export const pausePostConnection = () => ({
  type: "PAUSE_POST_CONNECTION",
});

export const receivePostConnection = (data) => ({
  type: "RECEIVE_POST_CONNECTION",
  data: data,
});

export const errorPostConnection = () => ({
  type: "ERROR_POST_CONNECTION",
});

export const addBookPostConnection = (data) => ({
  type: "ADD_BOOK_POST_CONNECTION",
  data: data,
});
