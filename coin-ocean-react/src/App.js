import React, { Component } from 'react';
// import './App.css';
// import DashboardPage from "./DashboardPage/DashboardPage"
// import CoinPage from './coinPage/coinPage'
// import Auth from './components/auth'
// import Test from './container/test'
// import Chart from './components/charts/pie'
import Ws from './container/ws'
import { Provider } from 'react-redux';
import store from './redux/store'
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        {/* <DashboardPage /> */}
        {/* <CoinPage /> */}
        {/* <Auth/> */}
        {/* <Test /> */}
        {/* <Chart /> */}
        <Ws />
      </Provider>
    );
  }
}

export default App;
