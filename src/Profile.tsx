import React from "react";
import "./App.css";
import { StyleService } from "./services/StyleService";

import ServerService, {
  LeaderBoardWindow,
  Direction,
} from "./services/ServerService";

import { Button, NumericInput } from "@blueprintjs/core";
import { FallingStarsView } from "./FallingStarsView";

import "@blueprintjs/core/lib/css/blueprint.css";

export class ProfilePage extends React.Component<{ user: string }, {}> {
  user: any = null;
  render() {
    return (
      <div className={stylesheet.outerDiv}>
        <div className={stylesheet.topBar}>
          <div className={stylesheet.profile}>
            <div className={stylesheet.profileCircle}>
              <h1>d</h1>
            </div>
          </div>
        </div>

        <div className="informationSection">
          <h1>{this.props.user}</h1>
        </div>
        <div className="actionSection">
          <Button
            onClick={this.onClickMinusStars}
            className={stylesheet.button}
          >
            Taketh
          </Button>
          <Button onClick={this.onClickAddStars} className={stylesheet.button}>
            Giveth
          </Button>
        </div>
        <pre style={{ overflow: "scroll" }}>
          {JSON.stringify(this.user, null, 2)}
        </pre>
      </div>
    );
  }

  componentDidMount = async () => {
    await this.getUsersProfile();
  };

  getUsersProfile = async () => {
    let user = await ServerService.instance.getUser(this.props.user);
    this.user = user.data;
    this.forceUpdate();
  };

  onClickMinusStars = async () => {
    await ServerService.instance.updateStar(
      "@david", // from
      this.props.user, // to
      Direction.Minus,
      100
    );

    await this.getUsersProfile();
  };

  onClickAddStars = async () => {
    await ServerService.instance.updateStar(
      "@david", // from
      this.props.user, // to
      Direction.Add,
      100
    );

    await this.getUsersProfile();
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

  topBar = {
    position: "absolute",
    top: 0,
    width: "100%",
  };

  profile = {
    paddingRight: "15px",
    float: "right",
  };

  profileCircle = {
    backgroundColor: "#F48668",
    borderRadius: "50%",
    height: 40,
    width: 40,
    lineHeight: "revert",
    textAlign: "center",
  };

  transactionSection = {
    width: 300,
  };
}

let stylesheet = StyleService.instance.createStyleSheet(new Stylesheet());
