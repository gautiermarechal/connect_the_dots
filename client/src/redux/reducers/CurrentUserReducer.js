const intialState = {
  status: "idle",
  id: "",
  name: "",
  username: "",
  email: "",
  connections: [],
  connections_bookmarked: [],
  authors_bookmarked: [],
};

const CurrentUserReducer = (state = intialState, action) => {
  switch (action.type) {
    case "REQUEST_CURRENT_USER":
      return { ...state, status: "requested" };
    case "RECEIVE_CURRENT_USER":
      return { ...state, status: "received", ...action.data };
    case "ERROR_CURRENT_USER":
      return { ...state, status: "error" };
    default:
      return state;
  }
};

export default CurrentUserReducer;
