import React, { Component } from "react";
import "./App.css";
// import DashboardPage from "./Page/CryptoList"
import CoinPage from './Page/CoinPage'

class App extends Component {
  render() {
    return (
      <div>
        {/* <DashboardPage /> */}
        <CoinPage />
      </div>
    )
  }
}

export default App;
