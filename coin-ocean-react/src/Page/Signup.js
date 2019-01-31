import React, { Component } from "react";
import Signupform from "../Component/Signupform/Signupform"
import Titlebar from "../Component/General/Titlebar/Titlebar"
import Infobar from "../Component/General/Infobar/Infobar"


class Signup extends Component {
  render() {
    return (
      <div>
        <Titlebar />
        {/* <Infobar /> */}
        <Signupform />
      </div>
    )
  }
}


export default Signup;