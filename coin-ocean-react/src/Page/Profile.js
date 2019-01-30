import React, { Component } from "react";
import Titlebar from "../Component/General/Titlebar/Titlebar"
import Infobar from "../Component/General/Infobar/Infobar"
import Wallet from "../Component/Wallet/Wallet"
import WalletButtonfct from "../Component/WalletButtonfct/WalletButtonfct"
import { connect } from 'react-redux'
import { getWallet_DB } from '../redux/actions'


class Profile extends Component {
  constructor(props){
    super(props);
    this.props.getWallet_DB(this.props.user.uid)
  }
  render() {
    return (
      <div>
        <Titlebar />
        <Infobar />
        <Wallet />
        <WalletButtonfct />
      </div>
    )
  }
}



export default connect((state) => ({ wallet: state.wallet, user: state.user }), { getWallet_DB })(Profile);