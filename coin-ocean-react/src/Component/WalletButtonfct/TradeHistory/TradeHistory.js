import React, { Component } from 'react'
import './TradeHistory.css'
import { formatter } from '../../../redux/selectors'

class Trade extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tradehistory: ["Saab", "Volvo", "BMW"],
            tradecontext: true
        };
    }

    render() {
        if (this.props.buy !== undefined) {
            const { buy, buyquantity, sell, sellquantity, value, time, coin, symbol } = this.props
            return (
                <div className="yestradelist">
                    <div className="tradedata">
                        <div className="tradecoin">
                            <a href="/"><p>{coin}</p></a>
                            <small><p>{symbol}</p></small>
                        </div>
                        <div className="tradecoin">
                            <p>{(typeof buy === 'number') ? formatter.format(buy) : buy}</p>
                            <small><p>{buyquantity}</p></small>
                        </div>
                        <div className="tradecoin">
                            <p>{(typeof sell === 'number') ? formatter.format(sell) : sell}</p>
                            <small><p>{sellquantity}</p></small>
                        </div>
                        <div className="tradecoin">
                            <p>{formatter.format(value)}</p>
                        </div>
                        <div className="tradecoin">
                            <p>{time}</p>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="noliststate">
                    <div className="nolist">
                        <h3>You have not traded any coin yet!</h3>
                    </div>
                    <small><p>Trading coin to make a reward</p></small>
                    <small><a href='/'>->>>CoinList</a></small>
                </div>
            )
        }
    }
}

export default Trade;