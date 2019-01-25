const axios = require('axios')
const CronJob = require('cron').CronJob;

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
    hourFetch()
})
hourJob.start()

// module.exports = {
//     minute : fiveMinFetch,
//     hour : hourFetch
// }

module.exports = exportRealTimeData


