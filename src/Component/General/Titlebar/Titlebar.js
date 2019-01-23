import React, { Component } from "react";
import './Titlebar.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import icon from '../../../picture/easymoney.png'

class Titlebar extends Component{
    render(){
        return(
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                        <li className="nav-item">
                            <a className="nav-link" href="/">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/">About</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/">CoinList</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/">Contact</a>
                        </li>
                        <form className="form-inline my-2 my-lg-0 searchbox">
                        <input className="form-control mr-sm-2" type="search" placeholder="Search Coin" aria-label="Search" />
                        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                        </form>
                        </ul>

                        <img src={icon} alt="title" href="/" className="titleimg" />

                        <div className="form-inline my-2 my-lg-0">
                        <button className="btn borderlogin my-2 my-sm-0" type="submit">SignIn</button>
                        </div>
                        
                        <div className="form-inline my-2 my-lg-0">
                        <button className="btn bordersignup my-2 my-sm-0" type="submit">SignUp</button>
                        </div>
                    </div>
                </nav>
            </div>
        )
    }
}

export default Titlebar;
