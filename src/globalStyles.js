import {StyleService} from "./services/StyleService";

class Stylesheet {
  darkBackground = {
    // background: "#2e2e2e",
    background: "#fff",
  };
  darkShadow = {
    boxShadow: "0px 4px 20px 0px #79797933",
  };
  sectionHeader = {
    // color: "#fff",
    width: "100%",
    height: 55,
    display: "flex",
    fontSize: 24,
    fontWeight: 300,
    color: "#868686",
    paddingLeft: 25,
    alignItems: "center",
    fontFamily: "helvetica",
    // backgroundColor: "lightgrey",
    marginBottom: 10,
    marginTop: 10,
  };

  pageHeader = {
    width: "100%",
    height: 55,
    display: "flex",
    fontSize: 34,
    fontWeight: 500,
    color: "#999",
    paddingLeft: 25,
    alignItems: "center",
    fontFamily: "helvetica",
    marginBottom: 10,
    marginTop: 10,
  };
}

let globalStylesheet = StyleService.instance.createStyleSheet(new Stylesheet());

export default globalStylesheet