import React, { Component } from "react";
import Titlebar from "../Component/General/Titlebar/Titlebar"

class NoMatch extends Component {
  render() {
    return (
      <div>
        <Titlebar />
        <h1>The page cannot found!</h1>
        <h2>Please try again</h2>
      </div>
    )
  }
}


export default NoMatch;