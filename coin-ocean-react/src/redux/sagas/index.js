import { fork } from 'redux-saga/effects';
import * as wallet from './wallet';
import * as trade from './trade-history';
import * as comments from './comments';

export default function* rootSaga() {
	yield fork(wallet.createWalletSaga);
	yield fork(wallet.getWalletSaga);
    yield fork(wallet.updateWalletSaga);
    
	yield fork(trade.addTradeSaga);
    yield fork(trade.getTradeSaga);
    
	yield fork(comments.addCommentSaga);
	yield fork(comments.getAllCommentsSaga);
	yield fork(comments.getUserCommentsSaga);
}

// each yield take intake payload from Components
// are format as
// const action_payload_from_component = {
// 	type: 'SOME_ACTION',
// 	payload:{
// 		uid : 'userID',
// 		body :{
// 			'....': '...',
// 			'....': '...',
// 			'....': '...',
// 		}
// 	}
// }

// "put" handle update store's state by reciving [res] from axios.res.body
// proper form would be 
// const axios_res_body = {
// 	'....' : '.....' ,
// 	'....' : '.....' ,
// 	'....' : '.....' ,
// }
// the axios_res_body would replace [action_creator]'s payload context