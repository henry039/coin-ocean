import React, { Component, Fragment } from "react";
import Titlebar from "../Component/General/Titlebar/Titlebar"
import Infobar from "../Component/General/Infobar/Infobar"
import Wallet from "../Component/Wallet/Wallet"
import WalletButtonfct from "../Component/WalletButtonfct/WalletButtonfct"
import PieChart from '../Component/charts/pie'
import Loading from '../Component/Loading'
import { connect } from 'react-redux'
import { getWallet_DB, getTradeHistory_DB, getUserComments_DB } from '../redux/actions'
import { wallet, trade_history, comments, pie_data, user_uid, wallet_rest } from '../redux/selectors'


class Profile extends Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    console.log('will', this.props.uid)
    if (this.props.uid !== undefined) {
      this.props.getWallet_DB(this.props.uid)
      this.props.getTradeHistory_DB(this.props.uid)
      this.props.getUserComments_DB(this.props.uid)
    }
  }

  render() {
    const { state } = this.props;
    console.log('render', wallet(state).rest)
    return (
      <Fragment>
        {(wallet(state).rest !== null &&
          comments(state)[0] === undefined &&
          trade_history(state)[0] === undefined) ? (
            <Fragment>
              <Titlebar />
              <Wallet state={state} />
              <WalletButtonfct state={state} />
            </Fragment>
          ) : (wallet(state).coins[0] !== undefined &&
              comments(state)[0] !== undefined &&
              trade_history(state)[0] !== undefined) ? (
              <Fragment>
                <Titlebar />
                <Wallet state={state} />
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <PieChart pie={pie_data(state)} />
                </div>
                <WalletButtonfct state={state} />
              </Fragment>
            ) : (
              <Loading />
            )}
      </Fragment>
    )
  }
}

export default connect((state) => ({ state, uid: user_uid(state) }), { getWallet_DB, getTradeHistory_DB, getUserComments_DB })(Profile);

