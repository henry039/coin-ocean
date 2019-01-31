import React, { Component } from "react";
import HomeStructure from '../Component/HomeStructure/HomeStructure';
import Titlebar from "../Component/General/Titlebar/Titlebar"
import Infobar from "../Component/General/Infobar/Infobar"



class HomePage extends Component {
  render() {
    return (
      <div>
          <Titlebar />
          {/* <Infobar /> */}
          <HomeStructure />
      </div>
    );
  }
}

export default HomePage;
