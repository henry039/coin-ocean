import React, { Component } from "react";
import "./App.css";
import CryptoList from "./Page/CryptoList"
import CoinPage from './Page/CoinPage'
import Signup from './Page/Signup'
import Signin from './Page/Signin'
import HomePage from './Page/HomePage'
import Profile from './Page/Profile'
import {Route, Switch} from 'react-router-dom';
import NoMatch from './Page/NoMatch'

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/cryptolist" component={CryptoList} />
        <Route path="/coinpage/:id" component={CoinPage} />
        <Route path="/signup" component={Signup} />
        <Route path="/signin" component={Signin} />
        <Route path="/profile" component={Profile} />
        <Route component={NoMatch}/>
        </Switch>
      </div>
    )
  }
}

export default App;





