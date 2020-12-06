import { combineReducers } from "redux";
import CurrentUserReducer from "../reducers/CurrentUserReducer";
import ConnectionsReducer from "../reducers/ConnectionsReducer";
import BooksReducer from "../reducers/BooksReducer";
import SingleConnectionReducer from "./SingleConnectionReducer";
import SingleBookReducer from "./SingleBookReducer";
import PostConnectionReducer from "./PostConnectionReducer";
import { reducer as formReducer } from "redux-form";

const reducer = combineReducers({
  currentUser: CurrentUserReducer,
  connections: ConnectionsReducer,
  books: BooksReducer,
  singleConnection: SingleConnectionReducer,
  singleBook: SingleBookReducer,
  postConnection: PostConnectionReducer,
  form: formReducer,
});

export default reducer;
