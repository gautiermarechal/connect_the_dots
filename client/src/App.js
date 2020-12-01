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

function App() {
  return (
    <>
      <Router>
        <NavigationBar />
        <CategoriesBar />
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
        </Switch>
      </Router>
      <GlobalStyles />
    </>
  );
}

export default App;
