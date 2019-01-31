import React, { Component } from 'react';
import './invested.css'
import {connect} from 'react-redux';
import {cal_coin_assets, latest_price_meta, coinsss_cost_from_history} from '../../../redux/selectors'

class Invested extends Component {
    constructor(props) {
        super(props);
        this.state = {
            investlist: ["Saab", "Volvo", "BMW"],
            investcontext: true
        };
    }

    render() {
        const {coin_money, symbol, quantity, coin_cost} = this.props
        console.log(coin_cost)
        const coin_assets = cal_coin_assets(coin_money, symbol, quantity)
        if (!this.state.investcontext) {
            return (
                <div className="noliststate">
                    <div className="nolist">
                        <h3>You have not invested any coin yet!</h3>
                    </div>
                    <small><p>Invest coins to make more profits</p></small>
                    <small><a href='/'>Learn more</a></small>
                </div>
            )
        } else {
            return (
                <div className="yesinvestlist">
                    <div className="investlistdata">
                        <div className="investcoin">
                            <a href="/"><p>{this.props.coin}</p></a>
                            <small><p>{this.props.symbol}</p></small>
                        </div>
                        <div>
                            <p>{coin_assets}</p>
                            <small><p>{this.props.quantity}</p></small>
                        </div>
                        <div>
                            <p>{this.props.price}</p>
                            <small><p>{Number(coin_cost[symbol]).toFixed(2)}</p></small>
                        </div>
                        <div>
                            <p>{this.props.tdyearn}</p>
                            <small><p>{this.props.tdypercent}</p></small>
                        </div>
                        <div>
                            <p>{this.props.totearn}</p>
                            <small><p>{this.props.totpercent}</p></small>
                        </div>
                        <p>{this.props.invest}</p>
                    </div>
                </div>
            )
        }
    }

}

export default connect((state)=>({coin_money : latest_price_meta(state), coin_cost : coinsss_cost_from_history(state.trade_history)}))(Invested);