const initialState = {
  status: "idle",
  categories: [],
};

const CategoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "REQUEST_CATEGORIES":
      return { ...state, status: "requested" };
    case "RECEIVE_CATEGORIES":
      return { ...state, status: "received", categories: action.data };
    case "ERROR_CATEGORIES":
      return { ...state, status: "error" };
    default:
      return state;
  }
};

export default CategoriesReducer;
