import React,{Component} from 'react'
import HM from '../../HourMin_Chart/HM'
import './Watchlist.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

class WatchList extends Component{
    constructor(props) {
        super(props);
        this.state = {
            watchlist: [],
            watchlistcontext: true
        };
        this.keyid = props.keyid.toString();
        this.re_keyid = props.re_keyid.toString();
      }

    render() {
        if (!this.state.watchlistcontext){
        return(
        <div className="noliststate">
            <div className="nolist">
            <h3>You have not favoured any coin yet!</h3>
            </div>
            <small><p>Favour some coin in a list</p></small>
            <small><a href='/'>Learn more</a></small>
        </div>
        )
        }else{
        return(
        <div className="yeswatchlist">
            <div className="watchlistdata" data-toggle="collapse" href={this.keyid} role="button" aria-expanded="false" aria-controls="collapseExample">
                <p>{this.props.rank}</p>
                <a href="/"><p>{this.props.name}</p></a>
                <p>{this.props.marketcap}</p>
                <p>{this.props.price}</p>
                <p>{this.props.change}</p>
            </div>

            <div class="collapse" id={this.re_keyid}>
                <div class="card card-body chartcontrol">
                    <HM req='minute' coin_id={this.props.symbol}/>
                </div>
            </div>
        </div>
        )
        }
    }
}

export default WatchList;