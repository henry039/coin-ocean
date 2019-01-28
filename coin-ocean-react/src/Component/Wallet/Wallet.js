import React, { Component } from "react";
import './Wallet.css'
import usericon from '../../picture/press.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faStickyNote } from '@fortawesome/free-solid-svg-icons'
library.add(faStickyNote);


class Wallet extends Component{
    render(){
        return(
            <div>
                <div className="walletsection">
                    <div className="wallet">
                        <div className="walletlefthside">
                            <div>
                                <img src={usericon} alt="usericon"/>
                            </div>
                            <div className="walletuser">
                                <h4>Coinshu</h4>
                                <h6>Member ID: 007</h6>
                                <h6>Ranking: 1</h6>
                                <h6>EYN coin: 100</h6>
                            </div>
                        </div>

                        <div className="walletrigthside">
                            <div className="secondcontainer">
                                <div className="moneyshowone">
                                    <p>Total Asset:</p>
                                    <h2>$ 123,456,789.00</h2>
                                </div>
                                <div className="moneyshowtwo">
                                    <p>Earn Today:</p>
                                    <h3>$ 10000</h3>
                                    <h6>+ 3.67%</h6>
                                </div>
                            </div>    
                            <div className="walletreview">
                                <p>Review More</p>
                                <button><FontAwesomeIcon icon="sticky-note" /></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Wallet;
