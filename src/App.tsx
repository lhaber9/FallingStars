import React from "react";
import "./App.css";
import ProfilePage from "./Pages/Profile";
import StarPage from "./Pages/Star";
import LoginPage from "./Pages/Login";
import Search from "./Pages/Search";
import Auth0ProviderWithHistory from "./Components/AuthProvider";
import { LeaderBoardPage } from "./Pages/Leaderboard";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

export class App extends React.Component<{}, {}> {
  render() {
    return (
      <>
        <Router>
          <Auth0ProviderWithHistory>
            <div>
              <Switch>
                <Route path="/login" component={LoginPage} />
                <Route path="/leaderboard" component={LeaderBoardPage} />
                <Route path="/search" component={Search} />
                <Route path="/stars" component={StarPage} />
                <Route path="/profile/:id" component={ProfilePage} />
              </Switch>
            </div>
          </Auth0ProviderWithHistory>
        </Router>
      </>
    );
  }
}
