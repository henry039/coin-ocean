import axios from 'axios';

// wallet
export function createWallet_api(uid, payload) {
	return axios.post('/api/create/wallet', { uid, payload })
		.then(checkStatus)
        // .then(res => res.json());
        .then(res)
}

export function getWallet_api(uid) {
	return axios.post('/api/get/wallet', { uid })
		.then(checkStatus)
        // .then(res => res.json());
        .then(res)
}

export function updateWallet_api(uid, payload) {
	return axios.post('/api/create/wallet', { uid, payload })
		.then(checkStatus)
        // .then(res => res.json());
        .then(res)
}

// trade-history
export function getTrade_api(uid){
	return axios.post('/api/get/trade-history', {uid})
		.then(checkStatus)
		.then(res)
}
export function addTrade_api(uid, payload){
	return axios.post('/api/add/trade-history', {uid, payload})
		.then(checkStatus)
		.then(res)
}

// comment
export function getAllComments_api(payload='bitcoin'){
	return axios.get('/api/allComments/'+ payload.coins)
		.then(checkStatus)
		.then(res)
}
export function getUserComments_api(uid, payload){
	return axios.post('/api/get/comments', {uid})
		.then(checkStatus)
		.then(res)
}
export function addComments_api(uid, payload){
	return axios.post('/api/add/comments', {uid, payload})
		.then(checkStatus)
		.then(res)
}


function checkStatus(res) {
	if (res.status >= 200 && res.status < 300) {
		return res;
	} else {
		return Promise.reject(res);
	}
}