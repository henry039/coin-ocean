import React, { Component } from "react";
import "./App.css";
import CryptoList from "./Page/CryptoList"
import CoinPage from './Page/CoinPage'
import Signup from './Page/Signup'
import Signin from './Page/Signin'
import HomePage from './Page/HomePage'
import Profile from './Page/Profile'
import {Route} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div>
        <Route path="/" exact component={HomePage} />
        <Route path="/cryptolist" component={CryptoList} />
        <Route path="/coinpage" component={CoinPage} />
        <Route path="/signup" component={Signup} />
        <Route path="/signin" component={Signin} />
        <Route path="/profile" component={Profile} />
      </div>
    )
  }
}

export default App;





