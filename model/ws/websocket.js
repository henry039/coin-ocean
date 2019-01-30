const webSocket = require('socket.io');
const { minute, hour } = require('../dailyUpdate/10minutesStore')
const { price, vol } = require('../dailyUpdate/history')
const { realtimeOutput } = require('../data_src/realtime_price')
const CronJob = require('cron').CronJob

// realtimeOutput().then(console.log)
// minute('bitcoin').then(console.log)
module.exports = (server) => {
    let io = webSocket(server);

    io.on('connection', (socket) => {
        const job = new CronJob('0 */5 * * * *', async()=>{
            socket.emit('realtime price', await realtimeOutput())
        })
        job.start()

        // socket.on('need chart data', (msg) => {
        //     console.log(msg)
        //     socket.emit('reply', `send from server ${Math.random() * 100}`)
        // })

        socket.on('minute chart init', async (coin_id)=>{
            // console.log(coin_id)
            socket.emit('minute chart reply', {
                data : await minute(coin_id)
            })
        })
        socket.on('hour chart init', async (coin_id)=>{
            // console.log(coin_id)
            socket.emit('hour chart reply', {
                data : await hour(coin_id)
            })
        })
        socket.on('history chart init', async (coin_id)=>{
            socket.emit('history chart reply', {
                price : price(coin_id),
                vol: vol(coin_id)
            })
        })
    })
}