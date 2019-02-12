import axios from 'axios';

// wallet
export function createWallet_api(uid, payload) {
	return axios.post(`${process.env.REACT_APP_HTTP}/api/create/wallet`, { uid, payload })
		.then(checkStatus)
		.then(res => res)
}

export function getWallet_api(uid) {
	return axios.post(`${process.env.REACT_APP_HTTP}/api/get/wallet`, { uid })
		.then(checkStatus)
		.then(res => res)
}

export function updateWallet_api(uid, payload) {
	return axios.post(`${process.env.REACT_APP_HTTP}/api/update/wallet`, { uid, payload })
		.then(checkStatus)
		.then(res => res)
}

// trade-history
export function getTrade_api(uid) {
	return axios.post(`${process.env.REACT_APP_HTTP}/api/get/trade-history`, { uid })
		.then(checkStatus)
		.then(res => res)
}
export function addTrade_api(uid, payload) {
	return axios.post(`${process.env.REACT_APP_HTTP}/api/add/trade-history`, { uid, payload })
		.then(checkStatus)
		.then(res => res)
}

// comment
export function getAllComments_api(payload = 'bitcoin') {
	return axios.get(`${process.env.REACT_APP_HTTP}/api/allComments/${payload}`)
		.then(checkStatus)
		.then(res => res)
}
export function getUserComments_api(uid, payload) {
	return axios.post(`${process.env.REACT_APP_HTTP}/api/get/comments`, { uid })
		.then(checkStatus)
		.then(res => res)
}
export function addComments_api(uid, payload) {
	return axios.post(`${process.env.REACT_APP_HTTP}/api/add/comments`, { uid, payload })
		.then(checkStatus)
		.then(res => res)
}


function checkStatus(res) {
	if (res.status >= 200 && res.status < 300) {
		return res;
	} else {
		return Promise.reject(res);
	}
}