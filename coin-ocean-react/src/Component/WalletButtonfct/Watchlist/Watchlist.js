import React, { Component } from 'react'
import { formatter } from '../../../redux/selectors'
import HM from '../../HourMin_Chart/HM'
import './Watchlist.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

class WatchList extends Component {
    constructor(props) {
        super(props);
        // this.state = {
        //     watchlist: [],
        //     watchlistcontext: true
        // };
        // this.keyid = props.keyid.toString();
        // this.re_keyid = props.re_keyid.toString();
    }

    render() {
        if (!this.props.hasOwnProperty("marketcap")) {
            return (
                <div className="noliststate">
                    <div className="nolist">
                        <h3>You have not favoured any coin yet!</h3>
                    </div>
                    <small><p>Favour some coin in a list</p></small>
                    <small><a href='/'>Learn more</a></small>
                </div>
            )
        } else {
            const {keyid, re_keyid, rank, name, marketcap, price, change, symbol} = this.props
            return (
                <div className="yeswatchlist">
                    <div className="watchlistdata" data-toggle="collapse" href={keyid} role="button" aria-expanded="false" aria-controls="collapseExample">
                        <p>{rank}</p>
                        <a href={`/coinpage/${symbol}`}><p>{name}</p></a>
                        <p>{formatter.format(marketcap)}</p>
                        <p>{formatter.format(price)}</p>
                        <p>{change}</p>
                    </div>

                    <div className="collapse" id={re_keyid}>
                        <div className="card card-body chartcontrol">
                            <HM req='minute' coin_id={symbol} />
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default WatchList;