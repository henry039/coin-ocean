import React, { Component } from "react";
import "./Signupform.css";
import Easy_icon from "../../picture/easymoney_icon.png"
import firebase from '../Firebase'
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import { userLogin } from '../../redux/actions'
import axios from 'axios'

class Signupform extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            fname: '',
            lname: '',
        }
    }

    handleSubmit = (e) => {
        e.preventDefault()
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then((u) => {
                // redirect usage
                const user = firebase.auth().currentUser
                user.updateProfile({
                    displayName: `${this.state.fname} ${this.state.lname}`,
                    photoURL: "https://upload.wikimedia.org/wikipedia/commons/f/f4/User_Avatar_2.png"
                })
                .then(() => axios.post('http://localhost:5000/api/add/user', {uid : user.uid, payload : {photourl : user.photoURL, displayname: user.displayName}}))
                .then(() => {
                    this.props.userLogin(user.uid, {
                        photourl: user.photoURL, displayname: user.displayName
                    })
                    this.props.history.push('/profile')
                })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    render() {
        return (
            <div className="signupform">
                <div className="signupcontainer">
                    <div className="signupicon">
                        <img src={Easy_icon} alt="icon" />
                    </div>

                    <div className="signupbacket">
                        <h3>Create Account</h3>
                        <form onSubmit={this.handleSubmit} >

                            <label for="exampleInputName1">Your name</label>

                            <div className="form-row">
                                <div className="col">
                                    <input type="text" name='fname' id='exampleInputName1' className="form-control" placeholder="First name" onChange={this.handleChange} />
                                </div>
                                <div className="col">
                                    <input type="text" name='lname' className="form-control" placeholder="Last name" onChange={this.handleChange} />
                                </div>
                            </div>

                            <div className="form-group">
                                <label for="exampleInputEmail1">Email address</label>
                                <input type="email" name='email' className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" onChange={this.handleChange} />
                                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                            </div>

                            <div className="form-group">
                                <label for="exampleInputpassword">Password</label>
                                <input type="password" name='password' className="form-control" id="exampleInputpassword" placeholder="Password" onChange={this.handleChange} />
                                <small className="form-text text-muted">Passwords must be at least 6 characters.</small>
                            </div>

                            <div className="form-group">
                                <label for="exampleInputpassword2">Re-enter Password</label>
                                <input type="password" className="form-control" id="exampleInputpassword2" placeholder="Confirm Password" />
                            </div>

                            <button type="submit" className="btn btn-primary">Create your EasyMoney account</button>
                        </form>

                        <div className="signupseperation"></div>

                        <div>
                            <p>Already have an account OR using soical meadia signing in? <Link to={`/signin`}><a href="/signup"> Sign in</a></Link></p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(connect(null, {userLogin})(Signupform));
