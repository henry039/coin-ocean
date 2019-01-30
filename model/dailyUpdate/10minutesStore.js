const axios = require('axios')
require('dotenv').config({path : '../../.env'})
const { bitfinex_switch, bitfinex_switch_temp } = require('./symbol_in_common')

function fiveMinFetch(coin_id) {
    return axios.get(`${process.env.MINUTE_PRE}${bitfinex_switch_temp[coin_id]}${process.env.MINUTE_SUF}`)
        .then(res => extractPrice(res.data))
}

function hourFetch(coin_id) {
    return axios.get(`${process.env.HOUR_PRE}${bitfinex_switch_temp[coin_id]}${process.env.HOUR_SUF}`)
        .then(res => extractPrice(res.data))
}

// an array return[ MTS, OPEN, CLOSE, HIGH, LOW	,VOLUME]
// form in a obj { x : 0th, y : 2th}
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

const option = {
    title: {
        text: 'Price Graph (24hr)'
    },
    chart: {
        id: 'price',
    },
    yaxis: {
        title: {
            text: 'Price'
        },
        labels: {
            formatter: function (val) {
                return `${val} USD`
            }
        },
        tickAmount: 4
    },
    dataLabels: {
        enabled: false
    },
    stroke: {
        curve: 'smooth'
    },
    toolbar: {
        tools: {
            selection: false
        }
    },
    markers: {
        size: 0,
        hover: {
            size: 6
        }
    },
    tooltip: {
        followCursor: false,
        theme: 'dark',
        x: {
            show: false
        },
        marker: {
            show: false
        },
        y: {
            title: {
                formatter: function () {
                    return ''
                }
            }
        }
    },
    grid: {
        clipMarkers: false
    },
    xaxis: {
        type: 'datetime',
        tickAmount: 6,
    },
}

module.exports = {
    minute : fiveMinFetch,
    hour : hourFetch,
}



