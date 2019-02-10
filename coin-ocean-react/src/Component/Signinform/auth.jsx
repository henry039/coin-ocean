import * as React from "react"
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"
import { connect } from 'react-redux'
import { userLogin } from '../../redux/actions'
import { withRouter } from 'react-router-dom';
import firebase from '../Firebase'
import axios from 'axios'

class SoicalLogin extends React.Component {
  uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.firebase_.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.firebase_.auth.GithubAuthProvider.PROVIDER_ID,
      firebase.firebase_.auth.EmailAuthProvider.PROVIDER_ID
    ],
    // signInSuccessUrl: '/profile',
    callbacks: {
      signInSuccessWithAuthResult : () => {
        const user = firebase.auth().currentUser
        if (user) {
          this.isNewUser()
        }
        this.props.userLogin(firebase.auth().currentUser.uid, { photourl: firebase.auth().currentUser.photoURL, displayname: firebase.auth().currentUser.displayName })
        this.props.history.push('/profile')
      }
    }
  }

  isNewUser = () => {
    if (firebase.auth().currentUser.metadata.creationTime === firebase.auth().currentUser.metadata.lastSignInTime) {
      axios.post('http://localhost:5000/api/add/user', {
        uid: firebase.auth().currentUser.uid,
        payload: {
          photourl: firebase.auth().currentUser.photoURL,
          displayname: firebase.auth().currentUser.displayName
        }
      })
    }
  }

  render() {
    return (
      <div className="App">
        <div>
          <StyledFirebaseAuth
            uiConfig={this.uiConfig}
            firebaseAuth={firebase.auth()}
          />
        </div>
      </div>
    )
  }
}

export default withRouter(connect(null, { userLogin })(SoicalLogin))