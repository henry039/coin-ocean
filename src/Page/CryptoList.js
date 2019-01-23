import React, { Component } from "react";
import DashboardPage from "../Component/Dashboard/Dashboard";
import Titlebar from "../Component/Titlebar/Titlebar"
import Infobar from "../Component/Infobar/Infobar"


class CryptoList extends Component {
  render() {
    return (
      <div>
        <Titlebar />
        <Infobar />
        <DashboardPage />
      </div>
    )
  }
}



export default CryptoList;