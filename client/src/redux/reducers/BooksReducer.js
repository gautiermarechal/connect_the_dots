const initialState = {
  status: "idle",
  books: [],
};

const BooksReducer = (state = initialState, action) => {
  switch (action.type) {
    case "REQUEST_BOOKS":
      return { ...state, status: "requested" };
    case "RECEIVE_BOOKS":
      return { ...state, status: "received", books: action.data };
    case "ERROR_BOOKS":
      return { ...state, status: "error" };
    case "CLEAR_BOOKS":
      return { ...state, status: "idle", books: [] };

    default:
      return state;
  }
};

export default BooksReducer;
