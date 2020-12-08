const initialState = {
  status: "idle",
  connections: [],
};

const SingleCategoryConnectionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "REQUEST_SINGLE_CATEGORY_CONNECTIONS":
      return { ...state, status: "requested" };
    case "RECEIVE_SINGLE_CATEGORY_CONNECTIONS":
      return { ...state, status: "received", connections: action.data };
    case "ERROR_SINGLE_CATEGORY_CONNECTIONS":
      return { ...state, status: "error" };

    default:
      return state;
  }
};

export default SingleCategoryConnectionsReducer;
