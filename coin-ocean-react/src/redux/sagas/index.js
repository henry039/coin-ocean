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