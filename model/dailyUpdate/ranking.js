const { realtime_price } = require('../data_src/realtime_price')
const fetchDB = require('../fetchDB')
const db = new fetchDB()

async function ranking_24hr() {
    const prices = await realtime_price()
    const users = await db.getAllWallet()
    const user_asset = users.map((wallet, index) => {
        const { coins, rest, dailyPL } = wallet
        const dailyPL2 = JSON.parse(dailyPL)
        if (coins !== null && dailyPL2.length >= 0) {
            const coinsss = JSON.parse(coins)
            const coinsss_price = coinsss.map((track) => prices[track[0]].price * track[1])
            const total_coins_asset = coinsss_price.reduce((acc, current) => acc + current)
            const total_asset = total_coins_asset + Number(rest)
            return total_asset
        } else {
            return Number(rest)
        }
    });

    function latest_PL(){
        const user_PL = users.map(async (wallet) => {
            const { dailyPL, uid } = wallet
            const profile = await db.getUserProfile(uid)
            const {displayname, photourl} = profile[0]
            const dailyPL2 = JSON.parse(dailyPL)
            return { uid, dailyPL: dailyPL2 , displayname, photourl}
        })
        return Promise.all(user_PL)
    }
    // latest_PL().then(res => console.log(res))
    const PL = await latest_PL()
    const user_diff_percent = PL.map((PL, index) => {
            const { uid, dailyPL, displayname, photourl } = PL
            const diff = (user_asset[index] - dailyPL[dailyPL.length - 1]) / dailyPL[dailyPL.length - 1] * 100
            return { uid, diff, displayname, photourl }
        })
    
    function compare(a, b) {
        if (a.diff < b.diff)
            return 1;
        if (a.diff > b.diff)
            return -1;
        return 0;
    }
    return user_diff_percent.sort(compare).slice(0, 9)
}

// ranking_24hr().then(console.log)
module.exports = { ranking_24hr }