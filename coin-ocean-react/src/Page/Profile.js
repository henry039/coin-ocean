import React, { Component, Fragment } from "react";
import Titlebar from "../Component/General/Titlebar/Titlebar"
import Wallet from "../Component/Wallet/Wallet"
import WalletButtonfct from "../Component/WalletButtonfct/WalletButtonfct"
import PieChart from '../Component/charts/pie'
import Loading from '../Component/Loading'
import { connect } from 'react-redux'
import { getWallet_DB, getTradeHistory_DB, getUserComments_DB } from '../redux/actions'
import { wallet, trade_history, comments, pie_data, user_uid } from '../redux/selectors'


class Profile extends Component {
  componentWillMount() {
    if (this.props.uid !== undefined) {
      this.props.getWallet_DB(this.props.uid)
      this.props.getTradeHistory_DB(this.props.uid)
      this.props.getUserComments_DB(this.props.uid)
    }
  }

  render() {
    const { state, uid, wallet, history, comments } = this.props;
    if(uid !== undefined &&  comments !== undefined && history !== undefined){
      return (
        <Fragment>
          {/* (wallet(state).coins.length === 0 &&
          comments(state).length === 0 &&
          trade_history(state).length === 0)
          
          trade at least once
          (wallet(state).coins.length !== 0 &&
              trade_history(state).length !== 0) */}
          {(wallet.coins.length === 0 &&
            history.length === 0) ? (
              <Fragment>
                <Titlebar />
                <Wallet state={state} />
                <WalletButtonfct state={state} />
              </Fragment>
            ) : (
                <Fragment>
                  <Titlebar />
                  <Wallet state={state} />
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <PieChart pie={pie_data(state)} />
                  </div>
                  <WalletButtonfct state={state} />
                </Fragment>
              )}
        </Fragment>
      )
    }else{
      return (
        <Loading />
      )
    }
  }
}

export default connect((state) => ({ state, uid: user_uid(state), wallet : wallet(state), history : trade_history(state) ,
comments : comments(state)}), { getWallet_DB, getTradeHistory_DB, getUserComments_DB })(Profile);

