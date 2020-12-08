export const requestSingleCategory = () => ({
  type: "REQUEST_SINGLE_CATEGORY",
});

export const receiveSingleCategory = (data) => ({
  type: "RECEIVE_SINGLE_CATEGORY",
  data: data,
});

export const errorSingleCategory = () => ({
  type: "ERROR_SINGLE_CATEGORY",
});
