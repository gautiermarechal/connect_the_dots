const initialState = {
  status: "idle",
  single_user: {},
};

const SingleUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case "REQUEST_SINGLE_USER":
      return { ...state, status: "requested" };
    case "RECEIVE_SINGLE_USER":
      return { ...state, status: "received", single_user: action.data };
    case "ERROR_SINGLE_USER":
      return { ...state, status: "error" };
    default:
      return state;
  }
};

export default SingleUserReducer;
