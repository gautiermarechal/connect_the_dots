import { combineReducers } from "redux";
import CurrentUserReducer from "../reducers/CurrentUserReducer";
import ConnectionsReducer from "../reducers/ConnectionsReducer";
import BooksReducer from "../reducers/BooksReducer";
import SingleConnectionReducer from "./SingleConnectionReducer";
import SingleBookReducer from "./SingleBookReducer";

const reducer = combineReducers({
  currentUser: CurrentUserReducer,
  connections: ConnectionsReducer,
  books: BooksReducer,
  singleConnection: SingleConnectionReducer,
  singleBook: SingleBookReducer,
});

export default reducer;
