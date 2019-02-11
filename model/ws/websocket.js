const webSocket = require('socket.io');
const { minute, hour } = require('../data_src/10minutesStore')
const { combine } = require('../data_src/history')
const { realtime_price } = require('../data_src/realtime_price')
const CronJob = require('cron').CronJob

module.exports = (server) => {
    let io = webSocket().listen(server);

    io.on('connection', (socket) => {
        const job = new CronJob('0 */5 * * * *', async()=>{
            socket.emit('realtime price', await realtime_price())
        })
        job.start()

        socket.on('realtime price init', async()=>{
            socket.emit('realtime price init reply', await realtime_price())
        })

        socket.on('minute chart init', async (coin_id)=>{
            socket.emit('minute chart reply', {
                data : await minute(coin_id)
            })
        })
        socket.on('hour chart init', async (coin_id)=>{
            socket.emit('hour chart reply', {
                data : await hour(coin_id)
            })
        })
        socket.on('history chart init', async (coin_id)=>{
            socket.emit('history chart reply', {
                data : await combine(coin_id),
            })
        })
    })
}