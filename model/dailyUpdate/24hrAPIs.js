const CronJob = require('cron').CronJob;
const db = new (require('../fetchDB'))
const { realtime_price } = require('../data_src/realtime_price')

// Seconds: 0-59
// Minutes: 0-59
// Hours: 0-23
// Day of Month: 1-31
// Months: 0-11 (Jan-Dec)
// Day of Week: 0-6 (Sun-Sat)

// everyday 9am
const job = new CronJob('0 0 9 * * *', dailyPL_record())
job.start()
// fetch latest coin detail
async function dailyPL_record(){
    const prices = await realtime_price()
    const users = await db.getAllWallet()
    users.forEach((wallet) => {
        const {coins, rest, dailyPL, uid} = wallet
        const dailyPL2 = JSON.parse(dailyPL)
        if(coins !== null){
            const coinsss = JSON.parse(coins)
            const coinsss_price = coinsss.map((track) => prices[track[0]].price * track[1])
            const total_coins_asset = coinsss_price.reduce((acc, current) => acc + current)
            const total_asset = total_coins_asset + Number(rest)
            const new_PL = [...dailyPL2, total_asset]
            db.dailyUpdateWallet(uid, new_PL).then(console.log)
        }else{
            db.dailyUpdateWallet(uid, dailyPL2).then(console.log)            
        }
    });
}