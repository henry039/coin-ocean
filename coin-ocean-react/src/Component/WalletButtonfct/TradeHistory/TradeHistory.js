import React,{Component} from 'react'
import './TradeHistory.css'

class Trade extends Component{
    constructor(props) {
        super(props);
        this.state = {
            tradehistory: ["Saab", "Volvo", "BMW"],
            tradecontext: true
        };
      }

    render() {
        if (!this.state.tradecontext){
        return(
        <div className="noliststate">
            <div className="nolist">
            <h3>You have not traded any coin yet!</h3>
            </div>
            <small><p>Trading coin to make a reward</p></small>
            <small><a href='/'>->>>CoinList</a></small>
        </div>
        )
        }else{
        return(
        <div className="yestradelist">
           <div className="tradedata">
                <div className="tradecoin">
                    <a href="/"><p>{this.props.coin}</p></a>
                    <small><p>{this.props.symbol}</p></small>
                </div>
                <div className="tradecoin">
                    <p>{this.props.buy}</p>
                    <small><p>{this.props.buyquantity}</p></small>
                </div>
                <div className="tradecoin">
                    <p>{this.props.sell}</p>
                    <small><p>{this.props.sellquantity}</p></small>
                </div>
                <div className="tradecoin">
                    <p>{this.props.value}</p>
                </div>
                <div className="tradecoin">
                    <p>{this.props.time}</p>
                </div>
            </div>
        </div>
        )
        }
    }
}

export default Trade;