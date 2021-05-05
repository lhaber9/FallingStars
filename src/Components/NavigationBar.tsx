import React, { useState } from "react";
import { StyleService } from "../services/StyleService";
import ServerService from "../services/ServerService";

import { useHistory } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const NavigationBar = () => {
  const history = useHistory();
  const { user, isAuthenticated, logout } = useAuth0();

  // set the jwt on the service if it's in local storage
  if (isAuthenticated) {
    for (var key in localStorage) {
      if (key.startsWith("@@auth0spajs@@::")) {
        let token = JSON.parse(localStorage[key]);
        if (ServerService.instance.token !== token.body.id_token) {
          console.log("set token on our service if its in localStorage");
          ServerService.instance.setToken(token.body.id_token);
        }
      }
    }
  }

  return (
    <div className={stylesheet.nav}>
      {isAuthenticated && (
        <>
          <div className={stylesheet.leftNav}>
            <div
              className={stylesheet.navItem}
              onClick={() => {
                logout({ returnTo: "http://localhost:3000/login" });
                // logout({ returnTo: window.location.origin + "/login" });
              }}
            >
              logout
            </div>
            <div
              className={stylesheet.navItem}
              onClick={() => {
                history.push("/leaderboard");
              }}
            >
              leaderboard
            </div>
            <div
              className={stylesheet.navItem}
              onClick={() => {
                history.push("/search");
              }}
            >
              search
            </div>
          </div>

          <div className={stylesheet.rightNav}>
            <img
              onClick={() => {
                // 1367300860582244358
                history.push("/profile/" + user.sub.split("|")[1]);
              }}
              className={stylesheet.twitterProfilePicture}
              src={user.picture}
              alt={user.name}
            />

            <div
              onClick={() => {
                // 1367300860582244358
                history.push("/profile/" + user.sub.split("|")[1]);
              }}
            >
              {user.name}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

class Stylesheet {
  outerDiv = {
    height: "100%",
    width: "100%",
    position: "absolute",
    top: 50,
    left: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  };

  nav = {
    position: "absolute",
    top: 0,
    height: "50px",
    display: "flex",
    alignItems: "center",
    width: "100%",
    background: "#48aff0",
    padding: "20px",
  };

  leftNav = {
    display: "flex",
    alignItems: "center",
  };
  rightNav = {
    position: "fixed",
    right: "10px",
    top: "0px",

    display: "flex",
    alignItems: "center",
  };

  twitterProfilePicture = {
    height: "30px",
    width: "30px",
    borderRadius: "50%",
    marginRight: "10px",
    marginTop: "10px",
  };

  navItem = {
    padding: "4px",
  };
}

let stylesheet = StyleService.instance.createStyleSheet(new Stylesheet());

export default NavigationBar;
