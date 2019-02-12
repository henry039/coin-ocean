import React, { Component } from "react";
import Signinform from "../Component/Signinform/Signinform"
import Titlebar from "../Component/General/Titlebar/Titlebar"

class Signin extends Component {
  render() {
    return (
      <div>
        <Titlebar />
        <Signinform />
      </div>
    )
  }
}



export default Signin;