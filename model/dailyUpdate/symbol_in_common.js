const common = [ 'BAT', 'BNT', 'BSV', 'BTC', 'BTG', 'DAI', 'DGB', 'EOS', 'ETC', 'ETH', 'GNT', 'HOT', 'LRC', 'LTC', 'MKR', 'NEO', 'ODE', 'OMG', 'PAI', 'PAX', 'REP', 'SNT', 'TRX', 'VET', 'WAX', 'WTC', 'XLM', 'XMR', 'XRP', 'XTZ', 'XVG', 'ZEC', 'ZIL', 'ZRX' ]

const bitfinex_common = [ 'tBATUSD', 'tBNTUSD', 'tBSVUSD', 'tBTCUSD', 'tBTGUSD', 'tDAIUSD', 'tDGBUSD', 'tEOSUSD', 'tETCUSD', 'tETHUSD', 'tGNTUSD', 'tHOTUSD', 'tLRCUSD', 'tLTCUSD', 'tMKRUSD', 'tNEOUSD', 'tODEUSD', 'tOMGUSD', 'tPAIUSD', 'tPAXUSD', 'tREPUSD', 'tSNTUSD', 'tTRXUSD', 'tVETUSD', 'tWAXUSD', 'tWTCUSD', 'tXLMUSD', 'tXMRUSD', 'tXRPUSD', 'tXTZUSD', 'tXVGUSD', 'tZECUSD', 'tZILUSD', 'tZRXUSD' ] 

// create switch obj
// for(let i in common){
//     if(common[i] === bitfinex_common[i].substr(1,3)){
//         bitfinex_switch_temp[`${common[i]}`] = bitfinex_common[i]
//     }
// }

const bitfinex_switch_temp = { BAT: 'tBATUSD', BNT: 'tBNTUSD', BSV: 'tBSVUSD', BTC: 'tBTCUSD', BTG: 'tBTGUSD', DAI: 'tDAIUSD', DGB: 'tDGBUSD', EOS: 'tEOSUSD', ETC: 'tETCUSD', ETH: 'tETHUSD', GNT: 'tGNTUSD', HOT: 'tHOTUSD', LRC: 'tLRCUSD', LTC: 'tLTCUSD', MKR: 'tMKRUSD', NEO: 'tNEOUSD', ODE: 'tODEUSD', OMG: 'tOMGUSD', PAI: 'tPAIUSD', PAX: 'tPAXUSD', REP: 'tREPUSD', SNT: 'tSNTUSD', TRX: 'tTRXUSD', VET: 'tVETUSD', WAX: 'tWAXUSD', WTC: 'tWTCUSD', XLM: 'tXLMUSD', XMR: 'tXMRUSD', XRP: 'tXRPUSD', XTZ: 'tXTZUSD', XVG: 'tXVGUSD', ZEC: 'tZECUSD', ZIL: 'tZILUSD', ZRX: 'tZRXUSD' }

// create final switch 
// a.forEach(data =>{
//     bitfinex_switch2[data] = bitfinex_switch_temp[market_common[data].symbol]
// })

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

let a = Object.keys(market_common)
let b = Object.values(market_common)

// final switch
const bitfinex_switch = { bitcoin: 'tBTCUSD', ripple: 'tXRPUSD', ethereum: 'tETHUSD', eos: 'tEOSUSD', litecoin: 'tLTCUSD', stellar: 'tXLMUSD', tron: 'tTRXUSD', 'bitcoin-sv': 'tBSVUSD', monero: 'tXMRUSD', neo: 'tNEOUSD', 'ethereum-classic': 'tETCUSD', maker: 'tMKRUSD', zcash: 'tZECUSD', tezos: 'tXTZUSD', vechain: 'tVETUSD', 'bitcoin-gold': 'tBTGUSD', zilliqa: 'tZILUSD', omisego: 'tOMGUSD', '0x': 'tZRXUSD', 'basic-attention-token': 'tBATUSD', augur: 'tREPUSD', 'paxos-standard-token': 'tPAXUSD', holo: 'tHOTUSD', digibyte: 'tDGBUSD', verge: 'tXVGUSD', dai: 'tDAIUSD', status: 'tSNTUSD', 'golem-network-tokens': 'tGNTUSD', odem: 'tODEUSD', loopring: 'tLRCUSD', waltonchain: 'tWTCUSD', 'project-pai': 'tPAIUSD', bancor: 'tBNTUSD', wax: 'tWAXUSD' }


module.exports = {
    bitfinex_switch,
    market_common
}