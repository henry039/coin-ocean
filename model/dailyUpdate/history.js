const fake = require('../../utils/fakeSeed')
// const fetchDB = require('../fetchDB')
// const db = new fetchDB()
const { market_common } = require('./symbol_in_common')

function option_price(coin) {
    return {
        title: {
            text: `${market_common[coin].name} Price Movement`
        },
        chart: {
            id: 'price',
            group: 'cryptocurrency'
        },
        yaxis: {
            title: {
                text: 'Price'
            },
            labels: {
                formatter: function (val) {
                    return `${val} USD`
                },
                minWidth: 100
            },
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
            type: 'datetime'
        },
    }
}

const option_vol = {
    chart: {
        id: 'vol',
        group: 'cryptocurrency',
        toolbar: {
            show: false
        }
    },
    yaxis: {
        tickAmount: 2,
        title: {
            text: 'exchangeVol(24hr)'
        },
        labels: {
            formatter: function (val) {
                const million = 100000000
                let BillionBase = (val / million)
                return `${BillionBase.toFixed(0)}B`
            },
            minWidth: 100,
        },
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
        hover: {
            size: 6
        }
    },
    tooltip: {
        // enabled: true,
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
        type: 'datetime'
    },
}

function extractPrice(rawData) {
    // arr of { x: '05/06/2014', y: 54 }
    // x(date) y(price)
    let dataSet = []
    for (let i in rawData) {
        dataSet.push(Object.assign({}, {
            x: rawData[i].date,
            y: Number(rawData[i].price)
        }))
        // dataSet.push([new Date(rawData[i].date).getTime(), Number(rawData[i].price)])
    }
    return [Object.assign({}, {
        name: 'Price',
        // type: 'line',
        data: dataSet
    })]
}

function extractTxVol(rawData) {
    // arr of { x: '05/06/2014', y: 54 }
    // x(date) y(price)
    let dataSet = []
    for (let i in rawData) {
        dataSet.push(Object.assign({}, {
            x: rawData[i].date,
            y: Number(rawData[i].txVol)
        }))
        // dataSet.push([new Date(rawData[i].date).getTime(), Number(rawData[i].txVol)])
    }
    return [Object.assign({}, {
        name: 'TxVol',
        data: dataSet
    })]
}

function price(coin){
    // let rawData = db.getCoinHistory(coin)
    let rawData = fake
    return extractPrice(rawData)
}

function vol(coin){
    // let rawData = db.getCoinHistory(coin)
    let rawData = fake
    return extractTxVol(rawData)
}

module.exports = {
    option_price,
    price,
    option_vol,
    vol
}