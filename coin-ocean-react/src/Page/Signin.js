import React, { Component } from "react";
import Signinform from "../Component/Signinform/Signinform"
import Titlebar from "../Component/General/Titlebar/Titlebar"
import Infobar from "../Component/General/Infobar/Infobar"


class Signin extends Component {
  render() {
    return (
      <div>
        <Titlebar />
        {/* <Infobar /> */}
        <Signinform />
      </div>
    )
  }
}



export default Signin;