import React, { Component } from "react";
import DashboardPage from "../Component/Dashboard/Dashboard";
import Titlebar from "../Component/General/Titlebar/Titlebar"


class CryptoList extends Component {
  render() {
    return (
      <div>
        <Titlebar />
        <DashboardPage />
      </div>
    )
  }
}



export default CryptoList;