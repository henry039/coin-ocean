import React, { Component, Fragment } from "react";
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
      quantity: 0
    }
  }

  handleClick = (e) => {
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
      }else{
        alert('Invalid Trade')
      }
    } else {
      alert('Damn You')
    }
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
        <p className="priceusd">{'$' + props.price_usd} {props.change + '%'}</p>
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
            <button class="btn btn-outline-info" type="button" data-toggle="modal" data-target="#trader">Trade</button>

            <div class="modal fade" id="trader" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <form>
                    <div class="modal-header">
                      <h5 class="modal-title" id="trader">Coin Trading: {props.name}</h5>
                    </div>
                    <div class="modal-body">
                      Price: ${props.price_usd}
                      <div>
                        <input name='quantity' onChange={this.handleChange} placeholder="Enter quantity, e.g 10" />
                      </div>
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-success" data-dismiss="modal" name='buy' onClick={this.handleClick}>Buy</button>
                      <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                      <button type="button" class="btn btn-danger" data-dismiss="modal" name='sell' onClick={this.handleClick}>Sell</button>
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
