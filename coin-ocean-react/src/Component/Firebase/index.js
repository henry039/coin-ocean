import * as firebase from 'firebase/app'
import 'firebase/auth'

const config = {
    apiKey: process.env.REACT_APP_KEY,
    authDomain: process.env.REACT_APP_DOMAIN,
}

const fire = firebase.initializeApp(config)
export default fire