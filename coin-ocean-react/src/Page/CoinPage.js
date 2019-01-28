import React, { Component } from "react";
import Hischart from "../Component/History_Chart/hischart"
import Titlebar from '../Component/General/Titlebar/Titlebar'
import Infobar from '../Component/General/Infobar/Infobar'
import NC from '../Component/News&Comment/NC'

class CoinPage extends Component {
  render() {
    return (
      <div>
        <Titlebar />
        <Infobar />
        <Hischart />
        <NC />
      </div>
    )
  }
}


export default CoinPage;
