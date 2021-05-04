import React from "react";
import "./App.css";
import { StyleService } from "./services/StyleService";

import ServerService, {
  LeaderBoardWindow,
  Direction,
} from "./services/ServerService";

export class LeaderBoardPage extends React.Component<{}, {}> {
  leaders = [];

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
          <h1>Leaderboard</h1>
        </div>

        <div className={stylesheet.transactionSection}>
          {this.leaders.map((data: any) => {
            return (
              <div>
                {data.user} {data.count}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  componentDidMount = async () => {
    let leaders = await ServerService.instance.getLeaderBoard(
      LeaderBoardWindow.Week
    );
    this.leaders = leaders.data;
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
}

let stylesheet = StyleService.instance.createStyleSheet(new Stylesheet());
