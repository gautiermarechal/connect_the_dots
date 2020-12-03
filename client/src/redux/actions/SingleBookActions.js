export const requestSingleBook = () => ({
  type: "REQUEST_SINGLE_BOOK",
});

export const receiveSingleBook = (data) => ({
  type: "RECEIVE_SINGLE_BOOK",
  data: data,
});

export const errorSingleBook = () => ({
  type: "ERROR_SINGLE_BOOK",
});
