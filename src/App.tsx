import React from "react";
import "./App.css";
import { StyleService } from "./services/StyleService";
import { Button, NumericInput } from "@blueprintjs/core";
import { FallingStarsView } from "./FallingStarsView";

import { ProfilePage } from "./Profile";
import { LeaderBoardPage } from "./Leaderboard";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export class StarPage extends React.Component<{}, {}> {
  numStars = 0;
  numStarsInputValue = 0;

  onScreenStars = [];

  render() {
    return (
      <div className={stylesheet.outerDiv}>
        <FallingStarsView
          numStars={this.numStars}
          didFinishAnimation={this.didFinishAnimation}
        />
        <div className={stylesheet.title}>Falling Stars</div>
        <div className={stylesheet.container}>
          <NumericInput
            value={this.numStarsInputValue}
            onValueChange={this.onChangeNumStars}
          />
          <div style={{ width: 10 }} />
          <Button onClick={this.onClick} className={stylesheet.button}>
            Drop Dem Stars
          </Button>
          <div style={{ width: 10 }} />
          <img
            style={{ width: 20, height: 20 }}
            src={
              "https://upload.wikimedia.org/wikipedia/commons/5/57/FA_star.svg"
            }
          />
        </div>
      </div>
    );
  }

  onClick = async () => {
    this.numStars = this.numStarsInputValue;
    this.forceUpdate();
  };

  onChangeNumStars = (valueAsNumber: number, valueAsString: string) => {
    this.numStarsInputValue = valueAsNumber;
    this.forceUpdate();
  };

  didFinishAnimation = () => {
    this.numStars = 0;
    this.forceUpdate();
  };
}

class Stylesheet {
  outerDiv = {
    height: "100%",
    width: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  };

  title = {
    fontSize: 16,
    marginBottom: 10,
  };

  button = {
    width: 150,
  };

  container = {
    display: "flex",
    zIndex: 1,
    alignItems: "center",
  };
}

export class App extends React.Component<{}, {}> {
  render() {
    return (
      <>
        <Router>
          <div>
            <Switch>
              <Route path="/leaderboard">
                <LeaderBoardPage />
              </Route>
              <Route path="/stars">
                <StarPage />
              </Route>
              <Route path="/profile">
                <ProfilePage user={"@luke"} />
              </Route>
            </Switch>
          </div>
        </Router>
      </>
    );
  }
}

let stylesheet = StyleService.instance.createStyleSheet(new Stylesheet());
