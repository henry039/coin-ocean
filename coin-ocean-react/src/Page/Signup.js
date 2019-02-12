import React, { Component } from "react";
import Signupform from "../Component/Signupform/Signupform"
import Titlebar from "../Component/General/Titlebar/Titlebar"

class Signup extends Component {
  render() {
    return (
      <div>
        <Titlebar />
        <Signupform />
      </div>
    )
  }
}


export default Signup;