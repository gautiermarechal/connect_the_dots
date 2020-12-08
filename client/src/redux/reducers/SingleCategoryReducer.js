const initialState = {
  status: "idle",
  single_category: {},
};

const SingleCategoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case "REQUEST_SINGLE_CATEGORY":
      return { ...state, status: "requested" };
    case "RECEIVE_SINGLE_CATEGORY":
      return { ...state, status: "received", single_category: action.data };
    case "ERROR_SINGLE_CATEGORY":
      return { ...state, status: "error" };

    default:
      return state;
  }
};

export default SingleCategoryReducer;
