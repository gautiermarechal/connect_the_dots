import GlobalStyles from "./components/GlobalStyles";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  BrowserRouter,
} from "react-router-dom";
//Components imports
import NavigationBar from "./components/NavigationBar/index";
import CategoriesBar from "./components/CategoriesBar/index";
import HomePage from "./components/HomePage/index";
import Footer from "./components/Footer";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import SignUpSuccess from "./components/SignUpSuccess";
import useFetchCurrentUser from "./customHooks/UseFetchCurrentUser";
import AccountPage from "./components/AccountPage";
import BookmarkedConnectionsPage from "./components/BookmarkedConnectionsPage";
import BookPage from "./components/BookPage";
import PostConnection from "./components/PostConnection";
import LightNavigationBar from "./components/LightNavigationBar";
import { useSelector } from "react-redux";
import FreeConnection from "./components/FreeConnection";
import Feed from "./components/Feed";
import SingleConnection from "./components/SingleConnection";
import Categories from "./components/Categories";
import useFetchCategories from "./customHooks/UseFetchCategories";
import SingleCategory from "./components/SingleCategory";
import UserProfilePage from "./components/UserProfilePage";
import StructureConnection from "./components/StructureConnection";

function App() {
  useFetchCurrentUser();
  useFetchCategories();
  const postConnectionState = useSelector((state) => state.postConnection);
  return (
    <>
      <Router>
        {postConnectionState.status === "started" ? (
          <LightNavigationBar />
        ) : (
          <>
            <NavigationBar />
            <CategoriesBar />
          </>
        )}
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/signup-success">
            <SignUpSuccess />
          </Route>
          <Route path="/account/:id">
            <AccountPage />
          </Route>
          <Route path="/connections-bookmarked/:id">
            <BookmarkedConnectionsPage />
          </Route>
          <Route path="/book/single/:id">
            <BookPage />
          </Route>
          <Route exact path="/connect">
            <PostConnection />
          </Route>
          <Route path="/connect/free">
            <FreeConnection />
          </Route>
          <Route path="/connect/structure">
            <StructureConnection />
          </Route>
          <Route path="/feed">
            <Feed type="Home" />
          </Route>
          <Route path="/connection/single/:id">
            <SingleConnection />
          </Route>
          <Route exact path="/categories">
            <Categories />
          </Route>
          <Route path="/categories/single/:id">
            <SingleCategory />
          </Route>
          <Route path="/user/:id">
            <UserProfilePage />
          </Route>
        </Switch>
        <Footer />
      </Router>
      <GlobalStyles />
    </>
  );
}

export default App;
