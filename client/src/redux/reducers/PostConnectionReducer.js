const initialState = {
  status: "idle",
  step: 0,
  post_connection: {
    _id: "",
    created_at: "",
    author: {
      _id: "",
      name: "",
      username: "",
    },
    likes: 0,
    bookmarks: 0,
    bannerSrc: "",
    books: [],
    categories: [],
    content: "",
    media: [],
    comments: [],
  },
};

const PostConnectionReducer = (state = initialState, action) => {
  switch (action.type) {
    case "START_POST_CONNECTION":
      return { ...state, status: "started" };
    case "PAUSE_POST_CONNECTION":
      return { ...state, status: "paused" };
    case "RECEIVE_POST_CONNECTION":
      return { ...state, status: "received", post_connection: action.data };
    case "ERROR_POST_CONNECTION":
      return { ...state, status: "error" };
    case "ADD_BOOK_POST_CONNECTION":
      return {
        ...state,
        post_connection: {
          ...state.post_connection,
          books: [...state.post_connection.books, action.data],
        },
      };
    case "TOGGLE_STEP_POST_CONNECTION":
      return { ...state, step: state.step + action.data };
    default:
      return state;
  }
};

export default PostConnectionReducer;
