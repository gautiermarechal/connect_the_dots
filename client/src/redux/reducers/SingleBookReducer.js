const initialState = {
  status: "idle",
  single_book: {},
};

const SingleBookReducer = (state = initialState, action) => {
  switch (action.type) {
    case "REQUEST_SINGLE_BOOK":
      return { ...state, status: "requested" };
    case "RECEIVE_SINGLE_BOOK":
      return { ...state, status: "received", single_book: action.data };
    case "ERROR_SINGLE_BOOK":
      return { ...state, status: "error" };
    default:
      return state;
  }
};

export default SingleBookReducer;
