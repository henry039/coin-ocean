import React, { Component, Fragment } from "react";
import Titlebar from "../Component/General/Titlebar/Titlebar"
import Infobar from "../Component/General/Infobar/Infobar"
import Wallet from "../Component/Wallet/Wallet"
import WalletButtonfct from "../Component/WalletButtonfct/WalletButtonfct"
import PieChart from '../Component/charts/pie'
import Loading from '../Component/Loading'
import { connect } from 'react-redux'
import { getWallet_DB, getTradeHistory_DB, getUserComments_DB } from '../redux/actions'
import { wallet, trade_history, comments, pie_data, user_uid } from '../redux/selectors'


class Profile extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (this.props.uid !== undefined) {
      this.props.getWallet_DB(this.props.uid)
      this.props.getTradeHistory_DB(this.props.uid)
      this.props.getUserComments_DB(this.props.uid)
    }
  }


  componentDidUpdate(){
    // if (this.props.uid !== undefined) {
    //   this.props.getWallet_DB(this.props.uid)
    //   this.props.getTradeHistory_DB(this.props.uid)
    //   this.props.getUserComments_DB(this.props.uid)
    // }
  }
  
  // componentWillReceiveProps(){
  //   if (this.props.uid !== undefined) {
  //     this.props.getWallet_DB(this.props.uid)
  //     this.props.getTradeHistory_DB(this.props.uid)
  //     this.props.getUserComments_DB(this.props.uid)
  //   }
  // }

  render() {
    const { state } = this.props;
    if(this.props.uid !== undefined){
      return (
        <Fragment>
          {(//wallet(state).rest !== null &&
            comments(state).length === 0 &&
            trade_history(state).length === 0) ? (
              <Fragment>
                <Titlebar />
                <Wallet state={state} />
                <WalletButtonfct state={state} />
              </Fragment>
            ) : (wallet(state).coins.length !== 0 &&
              trade_history(state)[0].length !== 0) ? (
                <Fragment>
                  <Titlebar />
                  <Wallet state={state} />
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <PieChart pie={pie_data(state)} />
                  </div>
                  <WalletButtonfct state={state} />
                </Fragment>
              ) : (
                <Fragment/>
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

export default connect((state) => ({ state, uid: user_uid(state) }), { getWallet_DB, getTradeHistory_DB, getUserComments_DB })(Profile);

