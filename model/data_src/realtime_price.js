const axios = require('axios');
require('dotenv').config({ path: '../../.env' })
const CronJob = require('cron').CronJob;
const { market_common } = require('../dailyUpdate/symbol_in_common')

let realtime_data = {};

function realtime_price() {
    return axios.get(process.env.APIs)
        .then(res => {
            formatted(res.data)
        })
}

function formatted(coins) {
    coins.forEach(coin_detail => {
        let key = `${coin_detail.id}`
        let keys = Object.keys(market_common)
        let wanted = keys.some((coin) => key === coin)
        if (wanted) {
            realtime_data[key] = coin_detail
        }
    })
}

function delay() {
    return new Promise((resolve, reject)=>{
        setTimeout(() => {
            resolve(realtime_data)
        }, 500);
    })
}

async function realtimeOutput(){
    return await delay()
}

realtime_price()
const job = new CronJob('0 */1 * * * *', realtime_price)
job.start()

// realtimeOutput().then(res => console.log(res))
module.exports = { realtimeOutput }