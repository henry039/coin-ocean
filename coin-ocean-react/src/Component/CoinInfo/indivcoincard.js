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
      quantity: 0,
      targetprice: []
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
      updateWallet_DB(uid, trade_history_making(state, action))
      addTradeHistory_DB(uid, {
        action: [
          symbol, type, this.state.quantity, this.props.price_usd
        ]
      })
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
            <button className="btn btn-outline-danger">Favorite</button>

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
                      <button type="button" className="btn btn-success" data-dismiss="modal" name='buy' onClick={this.handleClick}>Buy</button>
                      <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                      <button type="button" className="btn btn-danger" data-dismiss="modal" name='sell' onClick={this.handleClick}>Sell</button>
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
                        <button type="button" className="btn btn-info" data-dismiss="modal" name='buy' onClick={this.handleClick}>Buy Reminder</button>
                      </div>
                    </div>

                    <div className="modal-body">
                      <div>
                        <input name='targetprice' onChange={this.handleChange} placeholder="Target selling price remind e.g 30" />
                        <button type="button" className="btn btn-warning" data-dismiss="modal" name='sell' onClick={this.handleClick}>Sell Reminder</button>
                      </div>
                    </div>

                    <div className="modal-footer ">
                      <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
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
