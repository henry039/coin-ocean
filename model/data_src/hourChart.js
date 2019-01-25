const axios = require('axios')
const CronJob = require('cron').CronJob;
require('dotenv').config({path : '../../.env'})

let hourMasterArray;

function hourFetch() {
    return axios.get(process.env.HOUR)
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

hourFetch().then(console.log)

// const Job = new CronJob('0 0 */1 * * *', ()=>{
//     hourFetch()
// })
// Job.start()

module.exports = hourMasterArray