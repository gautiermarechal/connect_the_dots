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

export const toggleStepPostConnection = (data) => ({
  type: "TOGGLE_STEP_POST_CONNECTION",
  data: data,
});

export const setTypePostConnection = (data) => ({
  type: "SET_TYPE_POST_CONNECTION",
  data: data,
});

export const getContentPostConnection = (data) => ({
  type: "GET_CONTENT_POST_CONNECTION",
  data: data,
});

export const changeAllPostConnection = (data) => ({
  type: "CHANGE_ALL_POST_CONNECTION",
  data: data,
});

export const createPostConnection = (data) => ({
  type: "CREATE_POST_CONNECTION",
  data: data,
});

export const addCategoryPostConnection = (data) => ({
  type: "ADD_CATEGORY_POST_CONNECTION",
  data: data,
});

export const addTitlePostConnection = (data) => ({
  type: "ADD_TITLE_POST_CONNECTION",
  data: data,
});
