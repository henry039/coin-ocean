import React, { Component } from 'react';
// import CryptoList from "./Page/CryptoList"
// import CoinPage from './Page/CoinPage'
// import Signup from './Page/Signup'
// import Signin from './Page/Signin'
// import HomePage from './Page/HomePage'
// import Profile from './Page/Profile'

// import Auth from './Component/auth'
// import Test from './container/test'
// import Chart from './Component/charts/pie'
// import Ws from './container/ws'
import { Provider } from 'react-redux';
import store from './redux/store'
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        {/* <CryptoList /> */}
        {/* <CoinPage /> */}
        {/* <Signup /> */}
        {/* <Signin /> */}
        {/* <HomePage /> */}
        {/* <Profile /> */}
        {/* <Auth/> */}
        {/* <Test /> */}
        {/* <Chart /> */}
        {/* <Ws /> */}
      </Provider>
    );
  }
}

export default App;
