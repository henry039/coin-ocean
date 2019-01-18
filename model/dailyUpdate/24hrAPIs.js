const CronJob = require('cron').CronJob;
const db = new (require('../fetchDB'))
const axios = require('axios')
require('dotenv').config()

// Seconds: 0-59
// Minutes: 0-59
// Hours: 0-23
// Day of Month: 1-31
// Months: 0-11 (Jan-Dec)
// Day of Week: 0-6 (Sun-Sat)

// fetch latest coin detail
let dailyWork = axios.get(process.env.APIs)
    .then(res => 
        res.data.map(
            latest_coin => {
                payload = {
                    date : new Date(latest_coin.last_updated * 1000),
                    price : latest_coin.price_usd,
                    txVol : latest_coin['24h_volume_usd'],
                    marketCap : latest_coin.market_cap_usd,
                };
                db.dailyUpdate(latest_coin.id, payload)}
            )
        )
    .catch(err => console.error(err))

// everyday 9am
const job = new CronJob('0 0 9 * * *', dailyWork)
job.start()