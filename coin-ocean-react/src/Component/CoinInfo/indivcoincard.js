import React, { Component, Fragment } from "react";
import axios from 'axios'
import "./indivcoincard.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { connect } from 'react-redux'
import { user_uid, trade_history_making } from '../../redux/selectors'
import { addTradeHistory_DB, updateWallet_DB } from '../../redux/actions'


class Ind extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 0,
      targetprice: 0
    }
  }

  handleTrade = (e) => {
    if (this.state.quantity > 0) {
      const { state, symbol, addTradeHistory_DB, updateWallet_DB } = this.props
      const uid = user_uid(state)
      const type = e.target.name
      const action = {
        quantity: this.state.quantity, symbol, type
      }
      if(trade_history_making(state, action) !== 'Invalid Trade'){
        updateWallet_DB(uid, trade_history_making(state, action))
        addTradeHistory_DB(uid, {
          action: [
            symbol, type, this.state.quantity, this.props.price_usd
          ]
        })
        this.closeTrade.click()
      }else{
        alert('Invalid Trade')
      }
    } else {
      alert('Damn You')
    }
  }
  
  handleRemind = (e) => {
    if (this.state.targetprice > 0) {
      const { state, symbol  } = this.props
      const uid = user_uid(state)
      const type = e.target.name
      const reminder = [symbol, type, this.state.targetprice]
      axios.post(`${process.env.REACT_APP_HTTP}/api/get/reminder`, {uid})
        .then((res) => {
          if(res.data.length === 0 ){
            axios.post(`${process.env.REACT_APP_HTTP}/api/update/reminder`, {uid, reminder : [reminder]})
              .then(()=> {this.closeRemind.click();})
            } else {
            axios.post(`${process.env.REACT_APP_HTTP}/api/update/reminder`, {uid, reminder : [...res.data, reminder]})
              .then(()=> {this.closeRemind.click();})
          }
        })
        .catch((err) => console.log(err))
    } else {
      alert('Invalid Remind')
    }
  }

  handleSubscribe = () => {
    const uid = user_uid(this.props.state)
    const symbol = this.props.symbol
    axios.post(`${process.env.REACT_APP_HTTP}/api/get/subscribe`, {uid})
      .then((res) => res.data)
      .then((data) => {
        if(data.length > 0){
          const coinList = [...new Set([...data, symbol])]
          axios.post(`${process.env.REACT_APP_HTTP}/api/update/subscribe`, {uid, coinList})
        }else{
          axios.post(`${process.env.REACT_APP_HTTP}/api/update/subscribe`, {uid, coinList : [symbol]})
        }
      })
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: Number(e.target.value)
    })
  }

  render() {
    const props = this.props
    const { state } = this.props

    return (
      <div>
        <div className="cointitle">
          <h2 className="coinname"><img src={require(`../../picture/color/${props.iconimg}.png`)} alt="coinimg" />{props.name}</h2>
          <p className="coinsymbol">({props.symbol})</p>
        </div>
        <p className="time">Time</p>
        <p className="font-weight">Latest Price:</p>
        <div className="priceusd" style={{color: props.change >= '0' ? "#00e600" : "#ff3333"}}>
        <p>{props.price_usd} USD</p>
        <p className="pricechange">{props.change + '%'}</p>
        </div>
        <p className="pricebtc">{props.price_btc} BTC</p>
        <div className="infoset">
          <p className="font-weight">MarketCap :</p>
          <p>{'$' + props.marketcap}</p>
        </div>
        <div className="infoset">
          <p className="font-weight">(24h)Volume :</p>
          <p> {'$' + props.volume} </p>
        </div>
        <div className="infoset">
          <p className="font-weight">Current Supply :</p>
          <p> {props.total}{props.symbol}</p>
        </div>
        <div className="infoset">
          <p className="font-weight">Total Supply :</p>
          <p>{props.max}{props.symbol}</p>
        </div>

        {(user_uid(state) !== undefined) ? (
          <Fragment>
            <button className="btn btn-outline-info" type="button" data-toggle="modal" data-target="#trader">Trade</button>
            <button className="btn btn-outline-primary" type="button" data-toggle="modal" data-target="#remind">Price Remind</button>
            <button className="btn btn-outline-danger" onClick={this.handleSubscribe}>Favorite</button>

            <div className="modal fade" id="trader" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <form>
                    <div className="modal-header">
                      <h5 className="modal-title" id="trader">Coin Trading: {props.name}</h5>
                    </div>
                    <div className="modal-body">
                      Price: ${props.price_usd}
                      <div>
                        <input name='quantity' onChange={this.handleChange} placeholder="Enter quantity, e.g 10" />
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-success" name='buy' onClick={this.handleTrade}>Buy</button>
                      <button type="button" className="btn btn-secondary" data-dismiss="modal" ref={input => {this.closeTrade = input}}>Close</button>
                      <button type="button" className="btn btn-danger" name='sell' onClick={this.handleTrade}>Sell</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            <div className="modal fade" id="remind" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <form>
                    <div className="modal-header">
                      <h5 className="modal-title" id="remind">Target Price Remind: {props.name}</h5>
                    </div>
                    <div className="modal-body">
                      <div>
                        <input name='targetprice' onChange={this.handleChange} placeholder="Target buying price remind e.g 30" />
                        <button type="button" className="btn btn-info" name='buy' onClick={this.handleRemind}>Buy Reminder</button>
                      </div>
                    </div>

                    <div className="modal-body">
                      <div>
                        <input name='targetprice' onChange={this.handleChange} placeholder="Target selling price remind e.g 30" />
                        <button type="button" className="btn btn-warning" name='sell' onClick={this.handleRemind}>Sell Reminder</button>
                      </div>
                    </div>

                    <div className="modal-footer ">
                      <button type="button" className="btn btn-secondary" data-dismiss="modal" ref={input => {this.closeRemind = input}}>Close</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </Fragment>
        ) : (
            <Fragment></Fragment>
          )}
      </div>
    );
  }
}

export default connect((state) => ({ state }), { addTradeHistory_DB, updateWallet_DB })(Ind);
