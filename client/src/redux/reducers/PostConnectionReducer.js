import moment from "moment";
import { v4 as uuidv4 } from "uuid";
const initialState = {
  status: "idle",
  step: 0,
  type: "structure",
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
    case "SET_TYPE_POST_CONNECTION":
      return { ...state, type: action.data };
    case "GET_CONTENT_POST_CONNECTION":
      return {
        ...state,
        post_connection: { ...state.post_connection, content: action.data },
      };
    case "CHANGE_ALL_POST_CONNECTION":
      return { ...state, ...action.data };
    case "CREATE_POST_CONNECTION":
      return {
        ...state,
        ...action.data.postConnection,
        post_connection: {
          ...state.post_connection,
          ...action.data.postConnection.post_connection,
          _id: uuidv4(),
          created_at: moment().unix(),
          author: action.data.author,
        },
      };
    case "ADD_CATEGORY_POST_CONNECTION":
      return {
        ...state,
        post_connection: {
          ...state.post_connection,
          categories: [...state.post_connection.categories, action.data],
        },
      };
    case "ADD_TITLE_POST_CONNECTION":
      return {
        ...state,
        post_connection: {
          ...state.post_connection,
          title: action.data,
        },
      };

    default:
      return state;
  }
};

export default PostConnectionReducer;
