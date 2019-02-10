import React, { Component, Fragment } from "react";
import "./Signinform.css";
import Easy_name from "../../picture/easymoney_name.png"
import SoicalLogin from './auth.jsx'
import { connect } from 'react-redux'
import { userLogin } from '../../redux/actions'
import { withRouter } from "react-router-dom";
import firebase from '../Firebase'

class Signinform extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        }
    }

    handleSubmit = (e) => {
        e.preventDefault()
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((user) => {
            this.props.userLogin(user.uid, {
                photourl : user.photoURL,
                displayname : user.displayName
            })
            this.props.history.push('/profile')
        }).catch((error) => {
            console.log(error);
        });
    }

    handleChange = (e) => {
        this.setState({
            [e.target.type]: e.target.value
        })
    }

    render() {
        return (
            <Fragment>
                <div className="signinform">
                    <div className="signincontainer">
                        <div className="signinicon">
                            <img src={Easy_name} alt="icon" />
                        </div>

                        <div className="signinbacket">
                            <h3>Sign In</h3>

                            <form onSubmit={this.handleSubmit}>
                                <div className="form-group">
                                    <label for="exampleInputEmail1">Email address</label>
                                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" onChange={this.handleChange} />
                                </div>

                                <div className="form-group">
                                    <label for="exampleInputPassword1">Password</label>
                                    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" onChange={this.handleChange} />

                                </div>

                                <div className="form-group">
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" id="gridCheck" />
                                        <label className="form-check-label" for="gridCheck">Remember me</label>
                                    </div>
                                </div>

                                <button type="submit" className="btn btn-warning">Sign in EasyMoney</button>
                            </form>
                            <div className="gotosoicalmedia">
                                <small><p>Using Soical Media Login?</p></small>
                                <SoicalLogin />
                            </div>

                            <div className="signinseperation"></div>

                            <div className="gotosignup">
                                <small><p>New to EasyMoney?</p></small>
                                <button type="submit" className="btn btn-info"><a href="/">Create your EasyMoney account</a></button>
                            </div>

                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default withRouter(connect(null, { userLogin })(Signinform));
