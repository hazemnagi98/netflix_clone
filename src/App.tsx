import React from "react";
import "./App.css";
import Auth from "./Components/Auth/Auth";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Homepage from "./Components/Homepage/Homepage";
import { AuthProvider } from "./contexts/auth.context";
import GenrePage from "./Components/GenrePage/GenrePage";
import MoviePage from "./Components/MoviePage/MoviePage";
import Watchlist from "./Components/Watchlist/Watchlist";
import NavBar from "./Components/Shared/Navbar/Navbar";
function App() {
  return (
    <AuthProvider>
      <Router>
        <NavBar />
        <div className="App">
          <Switch>
            <Route exact path="/signin">
              <Auth />
            </Route>
            <Route path="/homepage">
              <Homepage />
            </Route>
            <Route exact path="/genre/:genre">
              <GenrePage />
            </Route>
            <Route exact path="/movies/:id">
              <MoviePage />
            </Route>
            <Route exact path="/watchlist/:id">
              <Watchlist />
            </Route>
            <Redirect to="/signin" />
          </Switch>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
