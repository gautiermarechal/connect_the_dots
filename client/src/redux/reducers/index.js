import { combineReducers } from "redux";
import CurrentUserReducer from "../reducers/CurrentUserReducer";
import ConnectionsReducer from "../reducers/ConnectionsReducer";
import BooksReducer from "../reducers/BooksReducer";
import SingleConnectionReducer from "./SingleConnectionReducer";
import SingleBookReducer from "./SingleBookReducer";
import PostConnectionReducer from "./PostConnectionReducer";
import CategoriesReducer from "./CategoriesReducer";
import SingleCategoryReducer from "./SingleCategoryReducer";
import SingleCategoryConnectionsReducer from "./SingleCategoryConnectionsReducer";

const reducer = combineReducers({
  currentUser: CurrentUserReducer,
  connections: ConnectionsReducer,
  books: BooksReducer,
  singleConnection: SingleConnectionReducer,
  singleBook: SingleBookReducer,
  postConnection: PostConnectionReducer,
  categories: CategoriesReducer,
  singleCategory: SingleCategoryReducer,
  singleCategoryConnections: SingleCategoryConnectionsReducer,
});

export default reducer;
