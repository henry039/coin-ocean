const webSocket = require('socket.io');
const { minute, hour } = require('../dailyUpdate/10minutesStore')
const { price, vol } = require('../dailyUpdate/history')
const { realtime_price } = require('../data_src/realtime_price')
const CronJob = require('cron').CronJob

module.exports = (server) => {
    let io = webSocket().listen(server);

    io.on('connection', (socket) => {
        const job = new CronJob('0 */1 * * * *', async()=>{
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
                price : price(coin_id),
                vol: vol(coin_id)
            })
        })
    })
}