const axios = require('axios');
require('dotenv').config({ path: __dirname+'/../../.env' })
// const {fake} = require('../../utils/fake_realtime')

function realtime_price() {
    return axios.get(process.env.APIs)
        .then(res => {
            let masterNameObj = {}
            res.data.forEach(data => {
                masterNameObj[`${data.symbol}`] = {
                    name: data.name,
                    symbol: data.id,
                    price : Number(data['price_usd']),
                    dayChange : Number(data.percent_change_24h)
                }
            })
            return masterNameObj
        }).catch((err) => console.error(err))
}

// function realtime_price() {
//     return Promise.resolve(fake)
//         .then(res => {
//             let masterNameObj = {}
//             res.forEach(data => {
//                 masterNameObj[`${data.symbol}`] = {
//                     name: data.name,
//                     symbol: data.id,
//                     price : Number(data['price_usd']),
//                     dayChange : data.percent_change_24h
//                 }
//             })
//             return masterNameObj
//         }).catch((err) => console.error(err))
// }
// realtime_price().then(console.log)
module.exports = { realtime_price }