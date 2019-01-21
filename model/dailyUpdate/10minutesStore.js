// require('dotenv').config()
const axios = require('axios')
// const redis = require('redis')
const CronJob = require('cron').CronJob;

// const up2second = 1000;
// const up2minute = 60;
// const up2hour = 60;
// const up2day = 24;

// let client = redis.createClient()
// const { promisify } = require('util')
// const getAsync = promisify(client.get).bind(client);
// const setAsync = promisify(client.set).bind(client);
// const setexAsync = promisify(client.setex).bind(client);
// const checkKeyExist = promisify(client.exists).bind(client)

// client.on('error', err => {
//     console.log('error event - ' + err);
// })

// function fetchCoinDetail(){
//     return axios.get(process.env.APIs).then(res => {
//         res.data.forEach(realtime_coin_detail =>{
//             redisHandle(realtime_coin_detail)
//         })
//     }).catch(err => console.log(err))
// }

// function redisHandle(coin_detail){
//     let key = `${coin_detail.id}_${coin_detail.last_updated}`
//     let keyList = `latest_${coin_detail.id}`

//     getAsync(keyList).then(reply => {
//         if(reply === null){
//             setAsync(keyList, JSON.stringify([key]))
//             return storeSingleDetail(key, coin_detail)
//         }else{
//             let listOfKeys = JSON.parse(reply)

//             // check is it neccerry to update
//             // check 4 conditions
//             checkKeyExist(key).then(isKeyExist =>{
//                 let isNewKey = !(isKeyExist) && !(listOfKeys.includes(key))
//                 let isExpiredKey = !(isKeyExist) && (listOfKeys.includes(key))
//                 if(isNewKey){
//                     appendKeyList(key, keyList)
//                     return storeSingleDetail(key, coin_detail)
//                 }else if(isExpiredKey){
//                     return removeKeyList(key, keyList)
//                 }else{
//                     return ;
//                 }
//             })
//         }
//     })
// }

// let testObj = {
//         "id": "bitcoin", 
//         "name": "Bitcoin", 
//         "symbol": "BTC", 
//         "rank": "1", 
//         "price_usd": "3668.55011364", 
//         "price_btc": "1.0", 
//         "24h_volume_usd": "5310964705.4", 
//         "market_cap_usd": "64153905849.0", 
//         "available_supply": "17487537.0", 
//         "total_supply": "17487537.0", 
//         "max_supply": "21000000.0", 
//         "percent_change_1h": "-0.06", 
//         "percent_change_24h": "0.87", 
//         "percent_change_7d": "-0.35", 
//         "last_updated": "1547799621"
//     }

// function appendKeyList(key, keyList){
//     return getAsync(keyList).then(reply => {
//         let listOfKeys = JSON.parse(reply)
//         listOfKeys.push(key)
//         return setAsync(keyList, JSON.stringify(listOfKeys))
//     })
// }

// function removeKeyList(key, keyList){
//     return getAsync(keyList).then(reply =>{
//         let removeIndex = reply.indexOf(key)
//         let updatedList = reply.splice(removeIndex, 1)
//         return setAsync(keyList, JSON.stringify(updatedList))
//     })
// }

// function storeSingleDetail(key, coin_detail){
//     return setexAsync(key, up2minute * up2hour * up2day, JSON.stringify(coin_detail))
// }

// const minData = function(coin) {
//     let totalRecord = []
//     return getAsync(`latest_${coin}`).then(reply => {
//         let masterArr = JSON.parse(reply)
//         let detail = masterArr.map(async time => {
//             return await getAsync(time).then(reply => {
//                 totalRecord.push(JSON.parse(reply))
//             })
//         })
//         return Promise.all(detail).then(() => { return totalRecord })
//     }).catch(err => console.log(err))
// }

// const job = new CronJob('0 */1 * * * *', ()=>{
//     fetchCoinDetail()
// })
// job.start()

// an array return[ MTS, OPEN, CLOSE, HIGH, LOW	,VOLUME]
// form in a obj { x : 0th, y : 2th}

let minuteMasterArray = []
let hourMasterArray = []

function fiveMinFetch() {
    return axios.get('https://api.bitfinex.com/v2/candles/trade:5m:tBTCUSD/hist?limit=289')
        .then(res => extractPrice(res.data))
        .then(output => minuteMasterArray = output)
        .then(() => minuteMasterArray)
}

function hourFetch() {
    return axios.get('https://api.bitfinex.com/v2/candles/trade:1h:tBTCUSD/hist?limit=25')
        .then(res => extractPrice(res.data))
        .then(output => hourMasterArray = output)
        .then(()=> hourMasterArray)
}

function extractPrice(rawData) {
    // arr of { x: '05/06/2014', y: 54 }
    // x(date) y(price)
    let dataSet = []
    for (let i in rawData) {
        dataSet.push(Object.assign({}, {
            x: rawData[i][0],
            y: rawData[i][2]
        }))
    }
    return [Object.assign({}, {
        name: 'Price',
        data: dataSet
    })]
}

async function exportRealTimeData() {
    if(minuteMasterArray.length === 0 || hourMasterArray.length === 0){
        let minuteCoin = await fiveMinFetch()
        let hourCoin = await hourFetch()
        return {minuteCoin, hourCoin}
    }else{
        return {
            minuteCoin : minuteMasterArray,
            hourCoin : hourMasterArray
        }
    }
}

const minJob = new CronJob('0 */5 * * * *', ()=>{
    fiveMinFetch()
})
minJob.start()

const hourJob = new CronJob('0 0 */1 * * *', ()=>{
    hourFetch
})
hourJob.start()

// module.exports = {
//     minute : fiveMinFetch,
//     hour : hourFetch
// }

module.exports = exportRealTimeData


