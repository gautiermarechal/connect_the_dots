export const requestCategories = () => ({
  type: "REQUEST_CATEGORIES",
});

export const receiveCategories = (data) => ({
  type: "RECEIVE_CATEGORIES",
  data: data,
});

export const errorCategories = () => ({
  type: "ERROR_CATEGORIES",
});
