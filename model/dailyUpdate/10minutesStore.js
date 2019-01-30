const axios = require('axios')
require('dotenv').config({ path: '../../.env' })
const { bitfinex_switch, bitfinex_switch_temp } = require('./symbol_in_common')

function fiveMinFetch(coin_id) {
    return axios.get(`${process.env.MINUTE_PRE}${bitfinex_switch_temp[coin_id]}${process.env.MINUTE_SUF}`)
        .then(res => extractPrice(res.data, coin_id))
        .catch(err => console.error(err))
}

function hourFetch(coin_id) {
    return axios.get(`${process.env.HOUR_PRE}${bitfinex_switch_temp[coin_id]}${process.env.HOUR_SUF}`)
        .then(res => extractPrice(res.data, coin_id))
        .catch(err => console.error(err))
}

// an array return[ MTS, OPEN, CLOSE, HIGH, LOW	,VOLUME]
// form in a obj { x : 0th, y : 2th}
function extractPrice(rawData, coin) {
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

module.exports = {
    minute: fiveMinFetch,
    hour: hourFetch,
}



