// export const [getdata] = state => state...
const market_common = {
    bitcoin: { name: 'Bitcoin', symbol: 'BTC' },
    ripple: { name: 'XRP', symbol: 'XRP' },
    ethereum: { name: 'Ethereum', symbol: 'ETH' },
    eos: { name: 'EOS', symbol: 'EOS' },
    litecoin: { name: 'Litecoin', symbol: 'LTC' },
    stellar: { name: 'Stellar', symbol: 'XLM' },
    tron: { name: 'TRON', symbol: 'TRX' },
    'bitcoin-sv': { name: 'Bitcoin SV', symbol: 'BSV' },
    monero: { name: 'Monero', symbol: 'XMR' },
    neo: { name: 'NEO', symbol: 'NEO' },
    'ethereum-classic': { name: 'Ethereum Classic', symbol: 'ETC' },
    maker: { name: 'Maker', symbol: 'MKR' },
    zcash: { name: 'Zcash', symbol: 'ZEC' },
    tezos: { name: 'Tezos', symbol: 'XTZ' },
    vechain: { name: 'VeChain', symbol: 'VET' },
    'bitcoin-gold': { name: 'Bitcoin Gold', symbol: 'BTG' },
    zilliqa: { name: 'Zilliqa', symbol: 'ZIL' },
    omisego: { name: 'OmiseGO', symbol: 'OMG' },
    '0x': { name: '0x', symbol: 'ZRX' },
    'basic-attention-token': { name: 'Basic Attention Token', symbol: 'BAT' },
    augur: { name: 'Augur', symbol: 'REP' },
    'paxos-standard-token': { name: 'Paxos Standard Token', symbol: 'PAX' },
    holo: { name: 'Holo', symbol: 'HOT' },
    digibyte: { name: 'DigiByte', symbol: 'DGB' },
    verge: { name: 'Verge', symbol: 'XVG' },
    dai: { name: 'Dai', symbol: 'DAI' },
    status: { name: 'Status', symbol: 'SNT' },
    'golem-network-tokens': { name: 'Golem', symbol: 'GNT' },
    odem: { name: 'ODEM', symbol: 'ODE' },
    loopring: { name: 'Loopring', symbol: 'LRC' },
    waltonchain: { name: 'Waltonchain', symbol: 'WTC' },
    'project-pai': { name: 'Project Pai', symbol: 'PAI' },
    bancor: { name: 'Bancor', symbol: 'BNT' },
    wax: { name: 'WAX', symbol: 'WAX' }
}
export const wallet = (state) => state.wallet
export const trade_history = (state) => state.trade_history
export const comments = (state) => state.comments
export const user = (state) => state.user
export const latest_price_meta = (state) => state.prices

export const cal_coin_assets = (state) => {
    // console.log(state)
    const { coins } = wallet(state)
    const coin_id = Object.keys(coins)
    // console.log(latest_price_meta(state))
    const needed_price = coin_id.map((coin_need)=>({
        name : coin_need,
        price : Number(((latest_price_meta(state)[market_common[coin_need].symbol]).price * Number(coins[coin_need])).toFixed(2))
    })) 
    return needed_price  
}

export const extract_history = (state) => {
    const historys = trade_history(state)
    const all_buy = historys.map((history) => ({
        history :'dd'
    }))
}
// export const cal_coin_price
// export const cal_coin_price