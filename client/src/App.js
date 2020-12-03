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

function App() {
  useFetchCurrentUser();
  return (
    <>
      <Router>
        <NavigationBar />
        <CategoriesBar />
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
        </Switch>
        <Footer />
      </Router>
      <GlobalStyles />
    </>
  );
}

export default App;
