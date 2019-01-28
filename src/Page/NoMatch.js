import React, { Component } from "react";
import Titlebar from "../Component/General/Titlebar/Titlebar"
import Infobar from "../Component/General/Infobar/Infobar"


class NoMatch extends Component {
  render() {
    return (
      <div>
        <Titlebar />
        <Infobar />
        <h1>The page cannot found!</h1>
        <h2>Please try again</h2>
      </div>
    )
  }
}


export default NoMatch;