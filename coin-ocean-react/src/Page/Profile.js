import React, { Component } from "react";
import Titlebar from "../Component/General/Titlebar/Titlebar"
import Infobar from "../Component/General/Infobar/Infobar"
import Wallet from "../Component/Wallet/Wallet"
import WalletButtonfct from "../Component/WalletButtonfct/WalletButtonfct"
import PieChart from '../Component/charts/pie'
import { connect } from 'react-redux'
import { getWallet_DB, getTradeHistory_DB , getUserComments_DB} from '../redux/actions'
import {wallet, trade_history, comments, user} from '../redux/selectors'


class Profile extends Component {
  constructor(props){
    super(props);
    this.props.getWallet_DB(this.props.user.uid)
    this.props.getTradeHistory_DB(this.props.user.uid)
    this.props.getUserComments_DB(this.props.user.uid)
  }
  render() {
    const {coins} = this.props.wallet;
    return (
      <div>
        <Titlebar />
        <Infobar />
        <Wallet />
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <PieChart coins={coins}/> 
        </div>
        <WalletButtonfct />
      </div>
    )
  }
}



export default connect((state) => ({ wallet: wallet(state), user: user(state), comments: comments(state), trade_history: trade_history(state) }), { getWallet_DB, getTradeHistory_DB, getUserComments_DB,  })(Profile);