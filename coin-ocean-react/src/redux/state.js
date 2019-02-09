export const initialState = {
    // user : {
    //     uid : 123,
    //     isSignedIn : true
    // },
    user : {
        uid : undefined,
        // uid : 'test1',
        profile : {
            photourl: undefined,
            displayname : undefined
        }
        // profile : {
        //     photourl: 'https://upload.wikimedia.org/wikipedia/commons/f/f4/User_Avatar_2.png',
        //     displayname : 'SomeOne'
        // }
    },
    wallet : {
        // coins : [
        //     ['BTC', 10],
        //     ['ETH', 70]
        // ],
        coins : [],
        rest : null,
        // dailyPL : [
        //     {date : '2019-1-1', asset : 123487},
        //     {date : '2019-1-2', asset : 144487},
        // ],
        dailyPL : []
    },
    // trade_history : [
    //     {date : '2019-1-1', action: ['BTC','buy', 20, 4082]},
    //     {date : '2019-1-2', action: ['BTC','sell', 10, 4109]}
    // ],
    trade_history : [],
    // comment : [
    //     {date : '2019-1-1', context : 'First time to trade', tag : 'BTC'},
    //     {date : '2019-1-2', context : 'Second time to trade', tag : 'BTC'},
    // ],
    comments : [],
    error : {
        isError : false,
        error_msg : null
    },
    prices : {}
};