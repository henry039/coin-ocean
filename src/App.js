import React, { Component } from "react";
import "./App.css";
// import DashboardPage from "./DashboardPage/DashboardPage"
import CoinPage from './coinPage/CoinPage'

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
