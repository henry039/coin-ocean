import axios from 'axios';

// wallet
export function createWallet(uid, payload) {
	return axios.post('/api/create/wallet', { uid, payload })
		.then(checkStatus)
        // .then(res => res.json());
        .then(res)
}

export function getWallet(uid) {
	return axios.post('/api/get/wallet', { uid })
		.then(checkStatus)
        // .then(res => res.json());
        .then(res)
}

export function updateWallet(uid, payload) {
	return axios.post('/api/create/wallet', { uid, payload })
		.then(checkStatus)
        // .then(res => res.json());
        .then(res)
}

// trade-history
export function getTrade(uid){
	return axios.post('/api/get/trade-history', {uid})
		.then(checkStatus)
		.then(res)
}
export function addTrade(uid, payload){
	return axios.post('/api/add/trade-history', {uid, payload})
		.then(checkStatus)
		.then(res)
}

// comment
export function getAllComments(payload='bitcoin'){
	return axios.get('/api/allComments/'+ payload.coins)
		.then(checkStatus)
		.then(res)
}
export function getUserComments(uid, payload){
	return axios.get('/api/get/comments', {uid, payload})
		.then(checkStatus)
		.then(res)
}
export function addComments(uid, payload){
	return axios.get('/api/add/comments', {uid, payload})
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