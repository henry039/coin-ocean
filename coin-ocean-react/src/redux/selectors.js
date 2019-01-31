let market_symbol = { BTC: 'Bitcoin', XRP: 'XRP', ETH: 'Ethereum', EOS: 'EOS', LTC: 'Litecoin', XLM: 'Stellar', TRX: 'TRON', BSV: 'Bitcoin SV', XMR: 'Monero', NEO: 'NEO', ETC: 'Ethereum Classic', MKR: 'Maker', ZEC: 'Zcash', XTZ: 'Tezos', VET: 'VeChain', BTG: 'Bitcoin Gold', ZIL: 'Zilliqa', OMG: 'OmiseGO', ZRX: '0x', BAT: 'Basic Attention Token', REP: 'Augur', PAX: 'Paxos Standard Token', HOT: 'Holo', DGB: 'DigiByte', XVG: 'Verge', DAI: 'Dai', SNT: 'Status', GNT: 'Golem', ODE: 'ODEM', LRC: 'Loopring', WTC: 'Waltonchain', PAI: 'Project Pai', BNT: 'Bancor', WAX: 'WAX' }

// const {fake2} = require('../../../utils/fake_realtime')

export const wallet = (state) => state.wallet
export const trade_history = (state) => state.trade_history
export const comments = (state) => state.comments
export const user = (state) => state.user
export const latest_price_meta = (state) => state.prices
export const get_coin_name = (coin_symbol) => market_symbol[coin_symbol]
const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2
})

export const cal_coin_assets = (price, coin_id, quantity) => {
    return formatter.format(price[coin_id].price * quantity)
}

export const pie_data = (coins) => {
    const labels = coins.map(coin => coin[0])
    const series = coins.map(coin => coin[1])
    return {labels, series}
}

// const history = [ { id: 1,
//     date: '2019-01-30T10:57:35.950Z',
//     action: ["BTC","buy",20,4000],
//     uid: 'test1' },
//   { id: 2,
//     date: '2019-01-30T17:43:31.025Z',
//     action: ["BTC","buy",23,3800],
//     uid: 'test1' },
//   { id: 3,
//     date: '2019-01-31T01:35:22.677Z',
//     action: ["BTC","buy",13,3750],
//     uid: 'test1' },
//   { id: 4,
//     date: '2019-01-31T01:35:37.745Z',
//     action: ["ETH","buy",13,3750],
//     uid: 'test1' } ]

// const wallet = {
//     coins : [
//         ['BTC' , 56],
//         ['ETH', 13]
//     ]
// }

export function coinsss_cost_from_history(data){
    let coin_key = data.map(track => {
        return track.action[0]
    })
    let u_coin_key = [...new Set(coin_key)]
    // let output = {}
    // for(let i in u_coin_key){
    //     output[u_coin_key[i]] = data.filter((track) => {return track.action[0] === u_coin_key[i]})
    // }
    let output2 = {}
    for(let i in u_coin_key){
        // output2[u_coin_key[i]]= coin_cost_from_history(output[u_coin_key[i]])
        output2[u_coin_key[i]]= coin_cost_from_history(data.filter((track) => {return track.action[0] === u_coin_key[i]}))
    }
    return output2
    // console.log(output2)
}

export function coin_cost_from_history (data){
    const coin_price = data.map((track)=> {
        if(track.action[1] === 'buy'){
            return track.action[2] * track.action[3]
        }else{
            return -track.action[2] * track.action[3]
        }
    })
    const coin_price_sum = coin_price.reduce((acc, current) => acc + current)
    const coin_total_quantity = data.map((track)=> {
        if(track.action[1] === 'buy'){
            return track.action[2] 
        }else{
            return -track.action[2]
        }
    }).reduce((acc, current)=> acc + current)
    return coin_price_sum / coin_total_quantity
}

export function total_earn_lost(state){
    let coin_key = state.wallet.coins.map(track => {
        return track[0]
    })
    let coin_quantity = state.wallet.coins.map(track => {
        return track[1]
    })

    let coinss_cost = coinsss_cost_from_history(state.trade_history)

    let output = {}
    for(let i in coin_key){
        // console.log()
        
        const price = latest_price_meta(state)[coin_key[i]].price * coin_quantity[i]
        const cost = coinss_cost[coin_key[i]] * coin_quantity[i]
        output[`${coin_key[i]}-earn`] = (price - cost)
        output[`${coin_key[i]}-earn%`] = (price - cost) / cost * 100
    }
    return output
}
// let a = coin_cost_from_history(history)
// console.log(a)
// let b = coinsss_cost_from_history(history)
// console.log(b)
// let c = total_earn_lost(wallet, history)