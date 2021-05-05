import React from "react";
import { StyleService } from "../services/StyleService";
import ServerService, { LeaderBoardWindow } from "../services/ServerService";
import NavigationBar from "../Components/NavigationBar";

export class LeaderBoardPage extends React.Component<{}, {}> {
  leaders = [];

  render() {
    return (
      <div className={stylesheet.outerDiv}>
        <NavigationBar />

        <div className="informationSection">
          <h1>Leaderboard</h1>
        </div>

        <div className={stylesheet.transactionSection}>
          {this.leaders.map((data: any, index: number) => {
            return (
              <div key={index}>
                {data.name} {data.count}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  async componentDidMount() {
    let leaders = await ServerService.instance.getLeaderBoard(
      LeaderBoardWindow.Week
    );
    this.leaders = leaders.data;
    this.forceUpdate();
  }
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
