require('dotenv').config()
const axios = require('axios')
const redis = require('redis')
const CronJob = require('cron').CronJob;

// const up2second = 1000;
const up2minute = 60;
const up2hour = 60;
const up2day = 24;

let client = redis.createClient()
const { promisify } = require('util')
const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);
const setexAsync = promisify(client.setex).bind(client);
// const checkKeyExist = promisify(client.exists).bind(client)

client.on('error', err => {
    console.log('error event - ' + err);
})

function fetchCoinDetail(){
    return axios.get(process.env.APIs).then(res => {
        res.data.forEach(realtime_coin_detail =>{
            redisHandle(realtime_coin_detail)
        })
    }).catch(err => console.log(err))
}

function redisHandle(coin_detail){
    let key = `${coin_detail.id}_${coin_detail.last_updated}`
    let keyList = `latest_${coin_detail.id}`

    getAsync(keyList).then(reply => {
        if(reply === null){
            setAsync(keyList, JSON.stringify([key]))
            return storeSingleDetail(key, coin_detail)
        }else{
            let listOfKeys = JSON.parse(reply)
    
            // check is it neccerry to update
            // check 4 conditions
            let isNewKey = !(client.exists(key)) && !(listOfKeys.includes(key))
            let isExpiredKey = !(client.exists(key)) && (listOfKeys.includes(key))
            console.log(key)
            console.log('redis ',client.exists(key))
            console.log('masterArr ',listOfKeys.includes(key))
            console.log('checking new key', isNewKey)
            if(isNewKey){
                appendKeyList(key, listOfKeys)
                return storeSingleDetail(key, coin_detail)
            }else if(isExpiredKey){
                return removeKeyList(key, listOfKeys)
            }else{
                return ;
            }
        }
    })
}

redisHandle()

function appendKeyList(key, keyList){
    return getAsync(keyList).then(reply => {
        let listOfKeys = JSON.parse(reply)
        let updatedList = listOfKeys.push(key)
        return setAsync(keyList, JSON.stringify(updatedList))
    })
}

function removeKeyList(key, keyList){
    return getAsync(keyList).then(reply => {
        let listOfKeys = JSON.parse(reply)
        let removeIndex = listOfKeys.indexOf(key)
        let updatedList = listOfKeys.splice(removeIndex, 1)
        return setAsync(keyList, JSON.stringify(updatedList))
    })
}

function storeSingleDetail(key, coin_detail){
    return setexAsync(key, up2minute * up2hour * up2day, JSON.stringify(coin_detail))
}





// function redisStore (detail){
//     let key = `${detail.last_updated}_${detail.id}`
//     getAsync(key).then(reply =>{
//         if(reply === null){
//             fullCoinQueue.push(key)
//             setAsync(`latest_${detail.id}`, JSON.stringify(fullCoinQueue))
//             appendFullCoinList(deyail.id, key)
//             return setexAsync(key, up2minute * up2hour * up2day, JSON.stringify(detail))
//         }else{
//             return;
//         }
//     })
// }

// function appendFullCoinList(coin, key){
//     getAsync(`latest_${coin}`).then(reply =>{
//         let courrentList = JSON.parse(reply)
//         let updatedList = courrentList.push(key)
//         setAsync(`latest_${coin}`, JSON.stringify(updatedList))
//     })
// }

// function coinDetail() {
//     return axios.get(process.env.APIs).then(res => {
//         res.data.map(realtime_coin_detail =>{
//             redisStore(realtime_coin_detail)
//         })
//     }).catch(err => console.log(err))
// }




const minData = function(coin) {
    let totalRecord = []
    return getAsync(`latest_${coin}`).then(reply => {
        let masterArr = JSON.parse(reply)
        let detail = masterArr.map(async time => {
            return await getAsync(time).then(reply => {
                totalRecord.push(JSON.parse(reply))
            })
            // if(checkKeyExist(time)){
            // }else{
            //     const removeIndex = masterArr.indexOf(time)
            //     let updatedMasterArr = masterArr.splice(removeIndex, 1)
            //     return setAsync(`latest_${coin}`, JSON.stringify(updatedMasterArr))
            // }
        })
        return Promise.all(detail).then(() => { return totalRecord })
    }).catch(err => console.log(err))
}

// const job = new CronJob('0 */1 * * * *', ()=>{
//     fetchCoinDetail()
//     minData('bitcoin')
// })
// job.start()

module.exports = minData
