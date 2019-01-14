const test_data = require('./fake.json')
// ["date","txVolume(USD)","adjustedTxVolume(USD)","txCount","marketcap(USD)","price(USD)","exchangeVolume(USD)","realizedCap(USD)","generatedCoins","fees","activeAddresses","averageDifficulty","paymentCount","medianTxValue(USD)","medianFee","blockSize","blockCount"]

const createTestSeed = (dataArr) =>{
  // console.log(
    return {
      date: dataArr[0], //string YYYY-MM-DD
      price: Number(dataArr[5]) ,
      txVol: Number(dataArr[1]) ,
      txCount: Number(dataArr[3]),
      marketCap: Number(dataArr[4]) ,
      exchangeVol: Number(dataArr[6]) 
    }
  // )
}

let insertData = []
for(let i = 1;i < test_data.length; i++ ){
insertData.push(createTestSeed(test_data[i]))
}
// console.log(insertData)

module.exports = insertData