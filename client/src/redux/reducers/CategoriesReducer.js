const initialState = {
  status: "idle",
  categories_bar_opened: false,
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
    case "TOGGLE_CATEGORIES_BAR":
      return {
        ...state,
        status: "received",
        categories_bar_opened: action.data,
      };
    default:
      return state;
  }
};

export default CategoriesReducer;
