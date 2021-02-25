import Navbar from "./components/Navbar";
import Menu from "./components/Menu";
import Auth from "./components/Auth";
import Book from "./components/Book";
import Person from "./components/Person";
import PersonEdit from "./components/PersonEdit";
import BookEdit from "./components/BookEdit";
import History from "./components/History";
import HistoryEdit from "./components/HistoryEdit";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Cookies from 'js-cookie';

function App() {
  const cookie = Cookies.get('auth-token')
  // console.log(admin)
  const loggedIn = cookie ? true: false

  return (
    <div>
      <Router>
        <Navbar />
        <Switch>
          <Route path="/auth">
            {!loggedIn ? <Auth /> : <Redirect to="/" />}
          </Route>
          <Route exact path="/">
            {loggedIn ? <Menu /> : <Redirect to="/auth" />}
          </Route>
          <Route exact path="/books">
            {loggedIn ? <Book /> : <Redirect to="/auth" />}
          </Route>
          <Route path="/books/:id">
            {loggedIn ? <BookEdit /> : <Redirect to="/auth" />}
          </Route>
          <Route exact path="/readers">
            {loggedIn ? <Person /> : <Redirect to="/auth" />}
          </Route>
          <Route path="/readers/:id">
            {loggedIn ? <PersonEdit /> : <Redirect to="/auth" />}
          </Route>
          <Route exact path="/history">
            {loggedIn ? <History /> : <Redirect to="/auth" />}
          </Route>
          <Route path="/history/:id">
            {loggedIn ? <HistoryEdit /> : <Redirect to="/auth" />}
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
