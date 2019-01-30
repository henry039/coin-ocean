import * as React from "react"
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"
import { connect } from 'react-redux'
import { userLogin, userLogout } from '../../redux/actions'
import firebase from '../Firebase'

class SoicalLogin extends React.Component {
  state = { isSignedIn: false }
  uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.firebase_.auth.GoogleAuthProvider.PROVIDER_ID,
      //   firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      //   firebase.auth.TwitterAuthProvider.PROVIDER_ID,
      firebase.firebase_.auth.GithubAuthProvider.PROVIDER_ID,
      firebase.firebase_.auth.EmailAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccessWithAuthResult : () => false
    }
  }

  componentWillMount = () => {
    let user = firebase.auth().currentUser
    if(user){
      this.setState({isSignedIn : !!user})
    }else{
      this.setState({isSignedIn : !!user})
    }
    // firebase.auth().onAuthStateChanged(user => {
    //   this.setState({ isSignedIn: !!user })
    //   console.log(firebase.auth().currentUser)
    //   // console.log(firebase.auth().currentUser.uid)
    //   // this.props.userLogin(firebase.auth().currentUser.uid, this.state.isSignedIn)
    // })
  }

  // handle = () => {
  //   console.log(this.props.user)
  // }

  render() {
    return (
      <div className="App">
        {this.state.isSignedIn ? (
          <span>
            <div>Signed In!</div>
            <button onClick={() => {firebase.auth().signOut();  this.props.userLogout()}}>Sign out!</button>
            <h1>Welcome {firebase.auth().currentUser.displayName}</h1>
            <img
              alt="profile pic"
              src={firebase.auth().currentUser.photoURL}
            />
            {/* <button onClick={this.handle}>Click on me</button> */}
          </span>
        ) : (
            <div>
              <StyledFirebaseAuth
                uiConfig={this.uiConfig}
                firebaseAuth={firebase.auth()}
              />
              {/* <button onClick={this.handle}>Click on me</button> */}
            </div>
          )}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.user
})

export default connect(mapStateToProps, { userLogin, userLogout })(SoicalLogin)