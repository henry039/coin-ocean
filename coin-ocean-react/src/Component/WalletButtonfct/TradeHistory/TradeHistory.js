import React,{Component} from 'react'

class Trade extends Component{
    constructor(props) {
        super(props);
        this.state = {
            tradehistory: ["Saab", "Volvo", "BMW"],
            tradecontext: false
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
            <p>shit</p>
        </div>
        )
        }
    }
}

export default Trade;