export const requestSingleUser = () => ({
  type: "REQUEST_SINGLE_USER",
});

export const receiveSingleUser = (data) => ({
  type: "RECEIVE_SINGLE_USER",
  data: data,
});

export const errorSingleUser = () => ({
  type: "ERROR_SINGLE_USER",
});
