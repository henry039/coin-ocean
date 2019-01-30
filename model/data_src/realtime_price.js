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
// realtime_price().then(console.log)
module.exports = { realtime_price }