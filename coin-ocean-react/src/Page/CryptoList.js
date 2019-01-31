import React, { Component } from "react";
import DashboardPage from "../Component/Dashboard/Dashboard";
import Titlebar from "../Component/General/Titlebar/Titlebar"
import Infobar from "../Component/General/Infobar/Infobar"


class CryptoList extends Component {
  render() {
    return (
      <div>
        <Titlebar />
        {/* <Infobar /> */}
        <DashboardPage />
      </div>
    )
  }
}



export default CryptoList;