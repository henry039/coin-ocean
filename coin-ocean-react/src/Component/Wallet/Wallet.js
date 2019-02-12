import React, { Component, Fragment } from "react";
import './Wallet.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faStickyNote } from '@fortawesome/free-solid-svg-icons'
import { user_profile, total_asset, formatter, wallet_today_earn_lost, wallet_today_earn_lost_percent, wallet_rest, wallet} from '../../redux/selectors'
library.add(faStickyNote);

export default class Wallet extends Component {
    render() {
        const { state } = this.props
        const profile = user_profile(state)
        if(wallet(state).coins.length !== 0){
            const totalAsset = total_asset(state)
            const toEarn = wallet_today_earn_lost(state)
            const toEarn_percent = wallet_today_earn_lost_percent(state)
            return (
                <Fragment>
                    <div className="walletsection">
                        <div className="wallet">
                            <div className="walletlefthside">
                                <div>
                                    <img src={profile.photourl} alt="usericon" />
                                </div>
                                <div className="walletuser">
                                    <h4>{profile.displayname}</h4>
                                    {/* <h6>Member ID: 007</h6>
                                    <h6>Ranking: 1</h6>
                                    <h6>EYN coin: 100</h6> */}
                                    {/* <h4>Coinshu</h4>
                                    <h6>Member ID: 007</h6>
                                    <h6>Ranking: 1</h6>
                                    <h6>EYN coin: 100</h6> */}
                                </div>
                            </div>
    
                            <div className="walletrigthside">
                                <div className="secondcontainer">
                                    <div className="moneyshowone">
                                        <p>Total Asset:</p>
                                        <h2>{formatter.format(totalAsset)}</h2>
                                    </div>
                                    <div className="moneyshowtwo">
                                        <p>Earn Today:</p>
                                        <h3>{formatter.format(toEarn)}</h3>
                                        <h6>{`${toEarn_percent.toFixed(2)}%`}</h6>
                                        {/* <h3>$ 10000</h3>
                                        <h6>+ 3.67%</h6> */}
                                    </div>
                                </div>
                                <div className="walletreview">
                                    <p>Review More</p>
                                    <button><FontAwesomeIcon icon="sticky-note" /></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Fragment>
            )
        }else{
            const rest = wallet_rest(state)
            return (
                <Fragment>
                    <div className="walletsection">
                        <div className="wallet">
                            <div className="walletlefthside">
                                <div>
                                    <img src={profile.photourl} alt="usericon" />
                                </div>
                                <div className="walletuser">
                                    <h4>{profile.displayname}</h4>
                                    {/* <h6>Member ID: 007</h6>
                                    <h6>Ranking: 1</h6>
                                    <h6>EYN coin: 100</h6> */}
                                    {/* <h4>Coinshu</h4>
                                    <h6>Member ID: 007</h6>
                                    <h6>Ranking: 1</h6>
                                    <h6>EYN coin: 100</h6> */}
                                </div>
                            </div>
    
                            <div className="walletrigthside">
                                <div className="secondcontainer">
                                    <div className="moneyshowone">
                                        <p>Total Asset:</p>
                                        <h2>{formatter.format(rest)}</h2>
                                    </div>
                                </div>
                                <div className="walletreview">
                                    <p>Review More</p>
                                    <button><FontAwesomeIcon icon="sticky-note" /></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Fragment>
            )
        }
    }
}