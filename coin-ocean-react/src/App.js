import React, { Component } from 'react';
import openSocket from 'socket.io-client'
import CryptoList from "./Page/CryptoList"
import CoinPage from './Page/CoinPage'
import Signup from './Page/Signup'
import Signin from './Page/Signin'
import HomePage from './Page/HomePage'
import Profile from './Page/Profile'
import NoMatch from './Page/NoMatch'
import firebase from './Component/Firebase'
// import Test from './container/test'

import { BrowserRouter as Router,
Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { getPrice, userLogin } from './redux/actions'
class App extends Component {
  constructor(props){
    super(props);
    this.ws = openSocket(process.env.REACT_APP_WS)
    this.ws.on('realtime price', (reply)=>{
      this.props.getPrice(reply)
    })
    firebase.auth().onAuthStateChanged((user) => {
      if(user){
        this.props.userLogin(firebase.auth().currentUser.uid, {photourl : firebase.auth().currentUser.photoURL, displayname: firebase.auth().currentUser.displayName})
      }
    })
  }
  componentWillMount(){
    this.ws.emit('realtime price init')
    this.ws.on('realtime price init reply', (reply)=>{
      this.props.getPrice(reply)
    })
  }
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/cryptolist" component={CryptoList} />
          <Route path="/coinpage/:id" component={CoinPage} />
          <Route path="/signup" component={Signup} />
          <Route path="/signin" component={Signin} />
          <Route path="/profile" component={Profile} />
          <Route component={NoMatch} />
        </Switch>
      </Router>
      // <Test/>
    );
  }
}

export default connect((state)=>({prices : state.prices}), {getPrice, userLogin})(App);
