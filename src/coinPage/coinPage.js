import React, { Component } from "react";
import Hischart from './Section/coininfoandchart/hischart'
import Titlebar from '../General/titlebar/Titlebar'
import Infobar from '../General/infobar/Infobar'
import Hourandmin from "./Section/hourandminchart/HM";
import NC from './Section/newsandcomment/NC'

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
