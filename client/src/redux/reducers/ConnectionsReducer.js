const initialState = {
  status: "idle",
  connections: [],
};

const ConnectionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "REQUEST_CONNECTIONS":
      return { ...state, status: "requested" };
    case "RECEIVE_CONNECTIONS":
      return { ...state, status: "received", connections: action.data };
    case "ERROR_CONNECTIONS":
      return { ...state, status: "error" };
    default:
      return state;
  }
};

export default ConnectionsReducer;
