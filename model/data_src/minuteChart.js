const axios = require('axios')
const CronJob = require('cron').CronJob;
require('dotenv').config({ path: '../../.env' })

let minuteMasterArray;

function fiveMinFetch() {
    return axios.get(process.env.MINUTE)
        .then(res => extractPrice(res.data))
        .then(output => minuteMasterArray = output)
        .then(() => minuteMasterArray)
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

fiveMinFetch().then(console.log)

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

// const Job = new CronJob('0 */5 * * * *', ()=>{
//     fiveMinFetch()
// })
// Job.start()

module.exports = minuteMasterArray