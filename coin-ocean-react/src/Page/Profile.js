import React, { Component } from "react";
import Titlebar from "../Component/General/Titlebar/Titlebar"
import Infobar from "../Component/General/Infobar/Infobar"
import Wallet from "../Component/Wallet/Wallet"
import WalletButtonfct from "../Component/WalletButtonfct/WalletButtonfct"


class Profile extends Component {
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



export default Profile;