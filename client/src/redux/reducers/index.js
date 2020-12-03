import { combineReducers } from "redux";
import CurrentUserReducer from "../reducers/CurrentUserReducer";
import ConnectionsReducer from "../reducers/ConnectionsReducer";
import BooksReducer from "../reducers/BooksReducer";

const reducer = combineReducers({
  currentUser: CurrentUserReducer,
  connections: ConnectionsReducer,
  books: BooksReducer,
});

export default reducer;
