export const requestSingleConnection = () => ({
  type: "REQUEST_SINGLE_CONNECTION",
});

export const receiveSingleConnection = (data) => ({
  type: "RECEIVE_SINGLE_CONNECTION",
  data: data,
});

export const errorSingleConnection = () => ({
  type: "ERROR_SINGLE_CONNECTION",
});
