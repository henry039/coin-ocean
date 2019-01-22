import React, { Component } from 'react';
// import './App.css';
// import DashboardPage from "./DashboardPage/DashboardPage"
// import CoinPage from './coinPage/coinPage'
import Auth from './components/auth'
class App extends Component {
  render() {
    return (
      <div>
        {/* <DashboardPage /> */}
        {/* <CoinPage /> */}
        <Auth/>
      </div>
    );
  }
}

export default App;
