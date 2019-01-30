const axios = require('axios');
require('dotenv').config({ path: '../../.env' })

function realtime_price() {
    return axios.get(process.env.APIs)
        .then(res => {
            let masterNameObj = {}
            res.data.forEach(data => {
                masterNameObj[`${data.symbol}`] = {
                    name: data.name,
                    symbol: data.id,
                    price : data['price_usd']
                }
            })
            return masterNameObj
        }).catch((err) => console.error(err))
}



// function formatted(coins) {
//     coins.forEach(coin_detail => {
//         let key = `${coin_detail.id}`
//         let keys = Object.keys(market_common)
//         let wanted = keys.some((coin) => key === coin)
//         if (wanted) {
//             realtime_data[key] = coin_detail
//         }
//     })
// }

// function delay() {
//     return new Promise((resolve, reject)=>{
//         setTimeout(() => {
//             resolve(realtime_data)
//         }, 500);
//     })
// }

// async function realtimeOutput(){
//     return await delay()
// }

// realtime_price()

// realtimeOutput().then(res => console.log(res))
// module.exports = { realtimeOutput }
// realtime_price().then(console.log)
module.exports = { realtime_price }