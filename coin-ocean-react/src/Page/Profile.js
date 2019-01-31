import React, { Component } from "react";
import Titlebar from "../Component/General/Titlebar/Titlebar"
import Infobar from "../Component/General/Infobar/Infobar"
import Wallet from "../Component/Wallet/Wallet"
import WalletButtonfct from "../Component/WalletButtonfct/WalletButtonfct"
import PieChart from '../Component/charts/pie'
import { connect } from 'react-redux'
import { getWallet_DB, getTradeHistory_DB } from '../redux/actions'


class Profile extends Component {
  constructor(props){
    super(props);
    this.props.getWallet_DB(this.props.user.uid)
    this.props.getTradeHistory_DB(this.props.user.uid)
  }
  render() {
    const {coins} = this.props.wallet;
    return (
      <div>
        <Titlebar />
        {/* <Infobar /> */}
        <Wallet />
        <PieChart coins={coins}/>
        <WalletButtonfct />
      </div>
    )
  }
}



export default connect((state) => ({ wallet: state.wallet, user: state.user }), { getWallet_DB, getTradeHistory_DB })(Profile);