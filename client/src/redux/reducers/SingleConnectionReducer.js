const initialState = {
  status: "idle",
  single_connection: [],
};

const SingleConnectionReducer = (state = initialState, action) => {
  switch (action.type) {
    case "REQUEST_SINGLE_CONNECTION":
      return { ...state, status: "requested" };
    case "RECEIVE_SINGLE_CONNECTION":
      return { ...state, status: "received", single_connection: action.data };
    case "ERROR_SINGLE_CONNECTION":
      return { ...state, status: "error" };
    default:
      return state;
  }
};

export default SingleConnectionReducer;
