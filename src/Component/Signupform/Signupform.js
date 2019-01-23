import React, { Component } from "react";
import "./Signupform.css";


class Signupform extends Component {
  render() {
    return (
      <div className="signupform">
        <div className="signupcontainer">
            <div className="signupicon">
                <img src="" alt="icon" />
            </div>

            <div className="signupbacket">
            <h3>Create Account</h3>
            <form action="/" method="post">

            <label for="exampleInputEmail1">Your name</label>

            <div class="form-row">
                <div class="col">
                <input type="text" class="form-control" placeholder="First name" />
                </div>
                <div class="col">
                <input type="text" class="form-control" placeholder="Last name" />
                </div>
            </div>

            <div className="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>

            <div className="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
                <small className="form-text text-muted">Passwords must be at least 6 characters.</small>
            </div>

            <div className="form-group">
                <label for="exampleInputPassword1">Re-enter Password</label>
                <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
            </div>

            <button type="submit" className="btn btn-primary">Create your EasyMoney account</button>
            </form>

                <div className="signupseperation"></div>

                <div>
                    <p>Already have an account OR using soical meadia signing in? <a href="/"> Sign in</a></p>
                </div>
            </div>
        </div>
      </div>
    );
  }
}

export default Signupform;
