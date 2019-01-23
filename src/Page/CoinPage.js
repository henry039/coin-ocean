import React, { Component } from "react";
import Hischart from "../Component/History_Chart/hischart"
import Titlebar from '../Component/General/Titlebar/Titlebar'
import Infobar from '../Component/General/Infobar/Infobar'
import Hourandmin from "../Component/HourMin_Chart/HM";
import NC from '../Component/News&Comment/NC'

class CoinPage extends Component {
  render() {
    return (
      <div>
        <Titlebar />
        <Infobar />
        <Hischart />
        <Hourandmin />
        <NC />
      </div>
    )
  }
}




export default CoinPage;
