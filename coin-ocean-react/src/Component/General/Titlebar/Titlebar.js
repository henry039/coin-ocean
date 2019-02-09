import React, { Component, Fragment } from "react";
import './Titlebar.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import icon from '../../../picture/easymoney.png'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { user_uid, user_profile } from '../../../redux/selectors'
import Profile from "../../../Page/Profile";

class Titlebar extends Component {
    constructor() {
        super();
        this.state = {
            inputValue: []
        };
    }


    render() {
        const {uid, profile} = this.props
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link" to="/">
                                    Home
                            </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/">
                                    About
                            </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/cryptolist">
                                    CoinList
                            </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/">
                                    Contact
                            </Link>
                            </li>
                            <form className="form-inline my-2 my-lg-0 searchbox">

                                <input className="form-control mr-sm-2" value={this.state.inputValue} onChange={(e) => this.setState({ inputValue: e.target.value })} type="search" placeholder="Search Coin" aria-label="Search" />
                                <Link to={`/coinpage/${this.state.inputValue}`}>
                                    <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                                </Link>
                            </form>

                        </ul>

                        <img src={icon} alt="title" href="/" className="titleimg" />

                        {(uid !== undefined) ? (
                            <Fragment>
                                <div className="form-inline my-2 my-lg-0">
                                    <Link className='nav-link' to='/profile'>
                                        <img src={profile.photourl} alt="title" className="profileicon" />
                                    </Link>
                                </div>
                                <div className="form-inline my-2 my-lg-0">
                                    <Link to="/"><button className="btn borderlogin my-2 my-sm-0" type="submit">LogOut</button></Link>
                                </div>
                            </Fragment>
                        ) : (
                                <Fragment>
                                    <div className="form-inline my-2 my-lg-0">
                                        <Link to="/signin"><button className="btn borderlogin my-2 my-sm-0" type="submit">SignIn</button></Link>
                                    </div>

                                    <div className="form-inline my-2 my-lg-0">
                                        <Link to="/signup"><button className="btn bordersignup my-2 my-sm-0" type="submit">SignUp</button></Link>
                                    </div>
                                </Fragment>
                            )}
                    </div>
                </nav>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    uid: user_uid(state),
    profile: user_profile(state)
})

export default connect(mapStateToProps)(Titlebar);
