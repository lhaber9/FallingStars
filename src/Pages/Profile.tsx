import React from "react";
import { StyleService } from "../services/StyleService";
import ServerService, { Direction } from "../services/ServerService";
import NavigationBar from "../Components/NavigationBar";
import { withAuth0 } from "@auth0/auth0-react";
import { Button } from "@blueprintjs/core";
import "@blueprintjs/core/lib/css/blueprint.css";
import { Optional } from "../services/Globals";
import {FallingStarsView} from "../Components/FallingStarsView";

class ProfilePage extends React.Component<{ auth0: any; match: any }, {}> {
  profileUser: any = null;
  userId: string = "";

  viewerUser: any = null;
  viewerUserId: string = "";

  counter: number = 0;
  timer: Optional<ReturnType<typeof setTimeout>> = null;

  starsSinceLastUpdate = 0;

  render() {
    return (
      <div className={stylesheet.outerDiv}>
        <NavigationBar />
        <FallingStarsView numStars={this.starsSinceLastUpdate}
                          didFinishAnimation={this.didFinishStarAnimation}/>
        <div className={stylesheet.spacer} />
        {this.profileUser && <h1>{this.profileUser.user}</h1>}
        <div className={stylesheet.informationSection}>
          {this.profileUser && (
            <>
              <div className={stylesheet.card}>
                <div className={stylesheet.cardTitle}>
                  {this.profileUser.lastDayStarCount}{" "}
                  <span role="img" aria-label="star">
                    ⭐️
                  </span>
                </div>
                <br />
                <div>past 24 hours</div>
              </div>
              <div className={stylesheet.card}>
                <div className={stylesheet.cardTitle}>
                  {this.profileUser.lastWeekStarCount}{" "}
                  <span role="img" aria-label="star">
                    ⭐️
                  </span>
                </div>
                <br />
                <div>past 7 days</div>
              </div>
            </>
          )}
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
          {this.profileUser &&
            this.profileUser.stars &&
            this.profileUser.stars.map((star: any, index: number) => {
              return (
                <div key={index}>
                  <div className={stylesheet.startTxCard}>
                    <h4>
                      <span role="img" aria-label="star">
                        ⭐️
                      </span>{" "}
                      {star.Amount}{" "}
                    </h4>
                    <h4>{star.Type}</h4>
                    <h4>{star.By}</h4>
                  </div>
                  <div>
                    <small>{star.When}</small>
                  </div>
                </div>
              );
            })}
        </pre>
      </div>
    );
  }

  async componentDidUpdate() {
    let id = "twitter|" + this.props.match.params.id;
    if (this.userId !== id) {
      this.userId = id;
      await this.getUsersProfile();
    }
  }

  async componentWillUnmount() {
    // clear the inerval when user navigates away from page
    if (this.timer) clearInterval(this.timer);
    this.timer = null;
  }

  async componentDidMount() {
    this.userId = "twitter|" + this.props.match.params.id;
    const { user, isAuthenticated, isLoading } = this.props.auth0;

    // if auth is loading try again in 1/10 second
    if (isLoading === true) {
      setTimeout(() => {
        this.componentDidMount();
      }, 100);
    }

    // we dont load for non authed
    if (isAuthenticated === false) {
      return;
    }

    // refresh page every 10 seconds 12 times
    // which account for 2 minutes after load
    this.timer = setInterval(async () => {
      if (this.counter <= 30) {
        this.counter++;
        await this.getUsersProfile();
      } else {
        if (this.timer) clearInterval(this.timer);
        this.timer = null;
      }
    }, 4 * 1000);

    this.viewerUser = user;
    this.viewerUserId = user.sub;
    await this.getUsersProfile();
  }

  getUsersProfile = async () => {
    // fetch users profile based on userId
    let profileUser = await ServerService.instance.getUser(this.userId);

    if (this.profileUser) {
      let starsSinceLastUpdate = profileUser.data.lastDayStarCount - this.profileUser.lastDayStarCount;
      if (starsSinceLastUpdate > 0) {
        this.starsSinceLastUpdate = starsSinceLastUpdate;
      }
    }

    this.profileUser = profileUser.data;
    this.profileUser.stars.reverse();

    this.forceUpdate();
  };

  onClickMinusStars = async () => {
    await ServerService.instance.updateStar(
      this.viewerUserId, // from
      this.userId, // to
      Direction.Minus,
      100
    );
    await this.getUsersProfile(); // update after
  };

  onClickAddStars = async () => {
    await ServerService.instance.updateStar(
      this.viewerUserId, // from
      this.userId, // to
      Direction.Add,
      100
    );
    await this.getUsersProfile(); // update after
  };

  didFinishStarAnimation = () => {
    this.starsSinceLastUpdate = 0;
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

  spacer = {
    height: 150,
    marginBottom: 50,
  };

  title = {
    fontSize: 16,
    marginBottom: 10,
  };

  cardTitle = {
    fontWeight: 900,
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
  twitterProfilePicture = {
    borderRadius: "50%",
    marginRight: "10px",
    marginTop: "10px",
  };

  card = {
    padding: "10px",
    textAlign: "center",
    // border: "3px solid #000",
    // transition: "box-shadow 1s, top 1s, left 1s",
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

  informationSection = {
    display: "flex",
  };

  startTxCard = {
    display: "flex",
    justifyContent: "space-between",
  };
}

let stylesheet = StyleService.instance.createStyleSheet(new Stylesheet());

export default withAuth0(ProfilePage);
