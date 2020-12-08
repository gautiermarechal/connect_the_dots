export const requestSingleCategoryConnections = () => ({
  type: "REQUEST_SINGLE_CATEGORY_CONNECTIONS",
});

export const receiveSingleCategoryConnections = (data) => ({
  type: "RECEIVE_SINGLE_CATEGORY_CONNECTIONS",
  data: data,
});

export const errorSingleCategoryConnections = () => ({
  type: "ERROR_SINGLE_CATEGORY_CONNECTIONS",
});
