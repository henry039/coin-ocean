import React, { Component } from "react";
import Hischart from "../Component/History_Chart/hischart"
import Titlebar from '../Component/General/Titlebar/Titlebar'
import NC from '../Component/News&Comment/NC'

class CoinPage extends Component {
  render() {
    return (
      <div>
        <Titlebar />
        <Hischart />
        <NC />
      </div>
    )
  }
}


export default CoinPage;
