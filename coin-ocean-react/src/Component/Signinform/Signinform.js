import React, { Component } from "react";
import "./Signinform.css";
import Easy_name from "../../picture/easymoney_name.png"
import SoicalLogin from './auth.jsx'
import { connect } from 'react-redux'
import { userLogin } from '../../redux/actions'


class Signinform extends Component {
    constructor(props){
        super(props);
        this.state = {
            email : '',
            password : ''
        }
    }

    handleSubmit = (e) => {
        e.preventDefault()
        console.log(e)
    }



  render() {
    return (
      <div className="signinform">
        <div className="signincontainer">
            <div className="signinicon">
                <img src={Easy_name} alt="icon" />
            </div>

            <div className="signinbacket">
            <h3>Sign In</h3>
            
            {/* <form action="/" method="post"> */}
            <form onSubmit={this.handleSubmit}>
            <div className="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
            </div>

            <div className="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />

            </div>

            <div class="form-group">
                <div class="form-check">
                <input class="form-check-input" type="checkbox" id="gridCheck" />
                <label class="form-check-label" for="gridCheck">Remember me</label>
                </div>
            </div> 

            <button type="submit" className="btn btn-warning">Sign in EasyMoney</button>
            </form>
            {/* <div className="gotosoicalmedia">
                <SoicalLogin/>
                <small><p>Using Soical Media Login?</p></small>
            </div> */}

            <div className="signinseperation"></div>

            <div className="gotosignup">
                <small><p>New to EasyMoney?</p></small>
                <button type="submit" className="btn btn-info"><a href="/">Create your EasyMoney account</a></button>
            </div>

            </div>
        </div>
      </div>
    );
  }
}

export default connect((state)=> ({user : state.user}), {userLogin})(Signinform);
