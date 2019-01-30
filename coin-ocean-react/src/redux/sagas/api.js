import axios from 'axios';

// user
// export function getUserProfile_api(uid) {
// 	return axios.post('/api/get/user', {uid})
// 		.then(checkStatus)
// 		.then(res => res)
// }

// export function addUserProfile_api(uid, payload){
// 	return axios.post('/api/add/user', {uid, payload})
// 		.then(checkStatus)
// 		.then(res => res)
// }

// wallet
export function createWallet_api(uid, payload) {
	return axios.post('/api/create/wallet', { uid, payload })
		.then(checkStatus)
		.then(res => res)
}

export function getWallet_api(uid) {
	return axios.post('/api/get/wallet', { uid })
		.then(checkStatus)
		.then(res => res)
}

export function updateWallet_api(uid, payload) {
	return axios.post('/api/update/wallet', { uid, payload })
		.then(checkStatus)
		.then(res => res)
}

// trade-history
export function getTrade_api(uid) {
	return axios.post('/api/get/trade-history', { uid })
		.then(checkStatus)
		.then(res => res)
}
export function addTrade_api(uid, payload) {
	return axios.post('/api/add/trade-history', { uid, payload })
		.then(checkStatus)
		.then(res => res)
}

// comment
export function getAllComments_api(payload = 'bitcoin') {
	return axios.get('/api/allComments/' + payload)
		.then(checkStatus)
		.then(res => res)
}
export function getUserComments_api(uid, payload) {
	return axios.post('/api/get/comments', { uid })
		.then(checkStatus)
		.then(res => res)
}
export function addComments_api(uid, payload) {
	return axios.post('/api/add/comments', { uid, payload })
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