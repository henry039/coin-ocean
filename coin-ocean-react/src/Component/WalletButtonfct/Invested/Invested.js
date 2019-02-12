import React, { Component } from 'react';
import './invested.css'

export default class Invested extends Component {
    render() {
        if (this.props.assets !== undefined) {
            const { assets, coin, symbol, quantity, price, cost, totearn, totpercent, tdyearn, tdypercent, invest } = this.props
            return (
                <div className="yesinvestlist">
                    <div className="investlistdata">
                        <div className="investcoin">
                            <a href="/"><p>{coin}</p></a>
                            <small><p>{symbol}</p></small>
                        </div>
                            <div className="investcoin">  
                                <p>{assets}</p>
                                <small><p>{quantity}</p></small>
                            </div>
                            <div className="investcoin">
                                <p>{price}</p>
                                <small><p>{cost}</p></small>
                            </div>
                            <div className="investcoin">
                                <p>{tdyearn}</p>
                                <small><p>{tdypercent}</p></small>
                            </div>
                            <div className="investcoin">
                                <p>{totearn}</p>
                                <small><p>{totpercent} </p></small>
                            </div>
                            <div className="investcoin">
                                <p>{invest}</p>
                            </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="noliststate">
                    <div className="nolist">
                        <h3>You have not invested any coin yet!</h3>
                    </div>
                    <small><p>Invest coins to make more profits</p></small>
                    <small><a href='/'>Learn more</a></small>
                </div>
            )
        }
    }
}
