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

function App() {
  useFetchCurrentUser();
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
          <Route path="/book/:id">
            <BookPage />
          </Route>
          <Route exact path="/connect">
            <PostConnection />
          </Route>
          <Route path="/connect/free">
            <FreeConnection />
          </Route>
          <Route path="/feed">
            <Feed type="Home" />
          </Route>
          <Route path="/connection/:id">
            <SingleConnection />
          </Route>
        </Switch>
        <Footer />
      </Router>
      <GlobalStyles />
    </>
  );
}

export default App;
