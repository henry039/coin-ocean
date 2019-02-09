import * as React from "react"
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"
import { connect } from 'react-redux'
import { userLogin, userLogout } from '../../redux/actions'
import firebase from '../Firebase'
import axios from 'axios'

class SoicalLogin extends React.Component {
  state = { isSignedIn: false }
  uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.firebase_.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.firebase_.auth.GithubAuthProvider.PROVIDER_ID,
      firebase.firebase_.auth.EmailAuthProvider.PROVIDER_ID
    ],
    signInSuccessUrl: '/profile',
  }

  componentWillMount = () => {
    firebase.auth().onAuthStateChanged(user => {
      if(user){
        this.setState({isSignedIn : !!user})
        this.props.userLogin(firebase.auth().currentUser.uid, {photourl : firebase.auth().currentUser.photoURL, displayname: firebase.auth().currentUser.displayName})
      }else{
        this.setState({isSignedIn : !!user})
      }
    })
  }

  componentDidMount(){
    let user = firebase.auth().currentUser
    if(user){
      this.isNewUser()
    }
  }

  isNewUser = () => {
    if(firebase.auth().currentUser.metadata.creationTime === firebase.auth().currentUser.metadata.lastSignInTime){
      axios.post('http://localhost:5000/api/add/user', {
        uid : firebase.auth().currentUser.uid, 
        payload : {
          photourl : firebase.auth().currentUser.photoURL, 
          displayname: firebase.auth().currentUser.displayName
        }
      })
    }
  }

  render() {
    const {photourl, displayname} = this.props.user.profile
    return (
      <div className="App">
        {this.state.isSignedIn ? (
          <span>
            <div>Signed In!</div>
            <button onClick={() => {firebase.auth().signOut();  this.props.userLogout()}}>Sign out!</button>
            <h1>Welcome {displayname}</h1>
            <img
              alt="profile pic"
              src={photourl}
            />
          </span>
        ) : (
            <div>
              <StyledFirebaseAuth
                uiConfig={this.uiConfig}
                firebaseAuth={firebase.auth()}
              />
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