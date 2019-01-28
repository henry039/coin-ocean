import React, { Component } from 'react';
import CryptoList from "./Page/CryptoList"
import CoinPage from './Page/CoinPage'
import Signup from './Page/Signup'
import Signin from './Page/Signin'
import HomePage from './Page/HomePage'
import Profile from './Page/Profile'
import NoMatch from './Page/NoMatch'

// import Auth from './Component/auth'
// import Test from './container/test'
// import Chart from './Component/charts/pie'
// import Ws from './container/ws'
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom'
import store from './redux/store'
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/cryptolist" component={CryptoList} />
          <Route path="/coinpage/:id" component={CoinPage} />
          <Route path="/signup" component={Signup} />
          <Route path="/signin" component={Signin} />
          <Route path="/profile" component={Profile} />
          <Route component={NoMatch} />
          {/* <Test /> */}
          {/* <Chart /> */}
          {/* <Ws /> */}
        </Switch>
      </Provider>
    );
  }
}

export default App;
