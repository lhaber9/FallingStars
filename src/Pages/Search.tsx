import React from "react";
import NavigationBar from "../Components/NavigationBar";
import ServerService from "../services/ServerService";
import { withRouter, RouteComponentProps } from "react-router-dom";

class SearchPeoplePage extends React.Component<RouteComponentProps> {
  users: [] = [];

  async componentDidMount() {
    await this.getAllUsers();
  }

  getAllUsers = async () => {
    // fetch users profile based on userId
    let users = await ServerService.instance.getAllUsers();
    this.users = users.data;
    this.forceUpdate();
  };

  render() {
    return (
      <div style={{ marginTop: 100 }}>
        <NavigationBar />
        <h1>Search</h1>
        {this.users.map((data: any, index: number) => {
          return (
            <div
              key={index}
              onClick={() => {
                //
                let history = this.props.history;
                let userId = data.id.split("|")[1];
                history.push(`/profile/${userId}`);
              }}
            >
              {data.user}
            </div>
          );
        })}
      </div>
    );
  }
}

export default withRouter(SearchPeoplePage);
