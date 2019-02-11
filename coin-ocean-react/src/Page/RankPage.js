import React, { Component } from "react";
import Titlebar from "../Component/General/Titlebar/Titlebar"
import Ranking from "../Component/Ranking/Ranking"


class Rankpage extends Component {
  render() {
      return (
        <div>
        <Titlebar />
        <Ranking />
        </div>
      )
  }
}

export default Rankpage;

