import React,{Component} from 'react'


class WatchList extends Component{
    constructor(props) {
        super(props);
        this.state = {
            watchlist: ["Saab", "Volvo", "BMW"],
            watchlistcontext: false
        };
      }

    render() {
        if (!this.state.watchlistcontext){
        return(
        <div>
            <div className="nolist">
            <h3>You have not favour any coins yet!</h3>
            </div>
            <small><p>Favour some coin in a list</p></small>
            <small><a href='/'>CoinList</a></small>
        </div>
        )
        }else{
        return(
        <div className="yeslist">
            <p>shit</p>
        </div>
        )
        }
    }

}

export default WatchList;