// Utils
const market_symbol = { BTC: 'Bitcoin', XRP: 'XRP', ETH: 'Ethereum', EOS: 'EOS', LTC: 'Litecoin', XLM: 'Stellar', TRX: 'TRON', BSV: 'Bitcoin SV', XMR: 'Monero', NEO: 'NEO', ETC: 'Ethereum Classic', MKR: 'Maker', ZEC: 'Zcash', XTZ: 'Tezos', VET: 'VeChain', BTG: 'Bitcoin Gold', ZIL: 'Zilliqa', OMG: 'OmiseGO', ZRX: '0x', BAT: 'Basic Attention Token', REP: 'Augur', PAX: 'Paxos Standard Token', HOT: 'Holo', DGB: 'DigiByte', XVG: 'Verge', DAI: 'Dai', SNT: 'Status', GNT: 'Golem', ODE: 'ODEM', LRC: 'Loopring', WTC: 'Waltonchain', PAI: 'Project Pai', BNT: 'Bancor', WAX: 'WAX' }
export const get_coin_name = (coin_symbol) => market_symbol[coin_symbol]
export const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
})

// Selector
export const wallet = (state) => state.wallet
export const trade_history = (state) => state.trade_history
export const comments = (state) => state.comments
export const user = (state) => state.user
export const latest_price = (state, coin) => Number(state.prices[coin].price)
export const latest_price_change = (state) => wallet_coins_name(state).map((coin_id) => Number(state.prices[coin_id].dayChange))
export const user_uid = (state) => user(state).uid
export const user_profile = (state) => user(state).profile
export const wallet_coins_name = (state) => wallet(state).coins.map((coin) => coin[0])
export const wallet_coins_quantity = (state) => wallet(state).coins.map((coin) => coin[1])
export const wallet_rest = (state) => wallet(state).rest
export const wallet_dailyPL = (state) => wallet(state).dailyPL


// Complex secletor
export const wallet_coins_price = (state) => {
    return wallet_coins_name(state).map((coin_id) => latest_price(state, coin_id))
}
export const wallet_coins_asset = (state) => {
    return wallet_coins_quantity(state).map((coin_on_hold, index) => coin_on_hold * wallet_coins_price(state)[index])
}

export const total_asset = (state) => {
    const total_asset = wallet_coins_asset(state).reduce((acc, current) => acc + current) + wallet_rest(state)
    return total_asset
}

export const wallet_today_earn_lost = (state) => {
    const dailyPL = wallet_dailyPL(state)
    const totalAsset = total_asset(state)
    return totalAsset - dailyPL[dailyPL.length - 1]
}

export const wallet_today_earn_lost_percent = (state) => {
    const dailyPL = wallet_dailyPL(state)
    const totalAsset = total_asset(state)
    return (totalAsset - dailyPL[dailyPL.length - 1]) / totalAsset * 100
}

export const pie_data = (state) => {
    const labels = [...wallet_coins_name(state), 'Un-used']
    const series = [...wallet_coins_asset(state), wallet_rest(state)]
    return { labels, series }
}

// Trade History related
const trade_history_coin_price = (filtered_history) => filtered_history.map((track) => {
    if (track.action[1] === 'buy') {
        return track.action[2] * track.action[3]
    } else {
        return track.action[2] * -track.action[3]
    }
}).reduce((acc, current) => acc + current)

export const trade_history_coin_quantity = (filtered_history) => filtered_history.map((track) => {
    if (track.action[1] === 'buy') {
        return track.action[2]
    } else {
        return -track.action[2]
    }
}).reduce((acc, current) => acc + current)

export const trade_history_coin_cost = (filtered_history) => trade_history_coin_price(filtered_history) / trade_history_coin_quantity(filtered_history)

export const trade_history_coinsss_cost = (state) => {
    const all_record = trade_history(state)
    const keys = wallet_coins_name(state)
    return keys.map((key) => trade_history_coin_cost(all_record.filter((track) => track.action[0] === key)))
}

export const wallet_total_coin_earn_lost = (state) => {
    const coinsss_cost = trade_history_coinsss_cost(state)
    const coinsss_price = wallet_coins_price(state)
    const coinsss_price_diff = coinsss_cost.map((coin_cost, index) => coinsss_price[index] - coin_cost)
    return coinsss_price_diff
}

export const wallet_total_coin_earn_lost_percent = (state) => {
    const coinsss_cost = trade_history_coinsss_cost(state)
    const coinsss_price = wallet_coins_price(state)
    const coinsss_price_diff = coinsss_cost.map((coin_cost, index) => (coinsss_price[index] - coin_cost) / coin_cost * 100)
    return coinsss_price_diff
}

// trade history today Earn Lost

export const trade_history_coin_price_change = (state) => {
    const coinsss_price = wallet_coins_price(state)
    const coinsss_rate = latest_price_change(state)
    return coinsss_price.map((coin_price, index) => coin_price * Number(coinsss_rate[index]))
}

export const trade_history_coin_earn_lost = (state) => {
    // const coin_asset = wallet_coins_asset(state)
    // return trade_history_coin_price_change(state).map((coin_price, index) => coin_price + coin_asset[index])
    return trade_history_coin_price_change(state)
}

export const trade_history_coin_earn_lost_percent = (state) => {
    return latest_price_change(state)
}

// trade making check
export const trade_history_making = (state, action) => {
    const { quantity, symbol, type } = action;
    const rest = wallet_rest(state);
    const coin_payment = latest_price(state, symbol) * quantity;
    // seperate first time trade
    if(wallet(state).coins.length !== 0){
        const coin_match_index_wallet = (wallet_coins_name(state).indexOf(symbol) >= 0) ? wallet_coins_name(state).indexOf(symbol) : undefined;
        const coin_on_hold = wallet_coins_quantity(state)[coin_match_index_wallet]
    
        if (type === 'buy' && rest > coin_payment) {
            return {
                coins: [
                    ...wallet(state).coins.filter((track) => track[0] !== symbol),
                    [symbol, (coin_on_hold + quantity)]
                ],
                rest: (rest - coin_payment).toFixed(3)
            }
        } else if (type === 'sell' && coin_on_hold > quantity) {
            return {
                coins: [
                    ...wallet(state).coins.filter((track) => track[0] !== symbol),
                    [symbol, (coin_on_hold - quantity)]
                ],
                rest: (rest + coin_payment).toFixed(3)
            }
        } else if (type === 'sell' && coin_on_hold === quantity) {
            return {
                coins: [
                    ...wallet(state).coins.filter((track) => track[0] !== symbol)
                ],
                rest: (rest + coin_payment).toFixed(3)
            }
        } else {
            return 'Invalid Trade';
        }
    }else{
        if (type === 'buy' && rest > coin_payment) {
            return {
                coins: [
                    [symbol, quantity]
                ],
                rest: (rest - coin_payment).toFixed(3)
            }
        } else {
            return 'Invalid Trade';
        }
    }
}

// const state = {
//     wallet: {
//         coins: [
//             ['BTC', 68],
//             ['XRP', 50],
//             ['ETH', 500],
//             ['WAX', 27]
//         ],
//         dailyPL: [17640,17999],
//         rest: 8482.809
//     },
//     trade_history: [
//         {
//             action: ["BTC", "buy", 20, 4000],
//             date: "2019-01-30T10:57:35.950Z"
//         },
//         {
//             action: ["BTC", "buy", 23, 3800],
//             date: "2019-01-30T17:43:31.025Z"
//         },
//         {
//             action: ["BTC", "buy", 13, 3750],
//             date: "2019-01-31T01:35:22.677Z"
//         },
//         {
//             action: ["BTC", "buy", 13, 3750],
//             date: "2019-01-31T01:35:37.745Z"
//         },
//         {
//             action: ["BTC", "sell", "1", 3489.9892954],
//             date: "2019-01-31T19:12:46.737Z"
//         },
//         {
//             action: ["XRP", "buy", 400, 0.3238257027],
//             date: "2019-01-31T20:42:53.443Z"
//         },
//         {
//             action: ["XRP", "sell", 350, 0.3238257027],
//             date: "2019-01-31T20:43:26.205Z"
//         },
//         {
//             action: ["ETH", "buy", 24, 109.448126559],
//             date: "2019-02-01T03:20:47.955Z"
//         },
//         {
//             action: ["ETH", "sell", 24, 109.448126559],
//             date: "2019-02-01T13:09:45.320Z"
//         },
//         {
//             action: ["ETH", "buy", 500, 110.448126559],
//             date: "2019-02-01T03:20:47.955Z"
//         },
//         {
//             action: ['WAX', 'buy', 76, 0.03],
//             date: '2019-02-01T13:09:45.320Z'
//         },
//         {
//             action: ['WAX', 'buy', 27, 0.027],
//             date: '2019-02-01T13:09:45.320Z'
//         },
//         {
//             action: ['WAX', 'sell', 76, 0.035],
//             date: '2019-02-01T13:09:45.320Z'
//         }
//     ],
//     prices : fake2
// }

// console.log(fake2)
// let a = wallet(state)
// let a1 = trade_history(state)
// let a2 = wallet_coins_name(state)
// let a3 = wallet_coins_quantity(state)
// let a4 = wallet_rest(state)
// let a5 = wallet_dailyPL(state)
// let a6 = latest_price(state, 'BTC')
// let a7 = wallet_coins_price(state)
// let a8 = wallet_coins_asset(state)
// let a9 = total_asset(state)
// let a10 = wallet_today_earn_lost(state)
// let a11 = wallet_today_earn_lost_percent(state)
// let a12 = pie_data(state)
// let a15 = trade_history_coinsss_cost(state)
// let a16 = wallet_total_coin_earn_lost(state)
// let a17 = wallet_total_coin_earn_lost_percent(state)
// let a18 = trade_history_coin_earn_lost(state)
// let a19 = trade_history_coin_earn_lost_percent(state)
// console.log(a3)