import React, { Component } from "react";
import HomeStructure from '../Component/HomeStructure/HomeStructure';
import Titlebar from "../Component/General/Titlebar/Titlebar"

class HomePage extends Component {
  render() {
    return (
      <div>
          <Titlebar />
          <HomeStructure />
      </div>
    );
  }
}

export default HomePage;
