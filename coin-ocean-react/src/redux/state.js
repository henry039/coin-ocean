export const initialState = {
    // user : {
    //     uid : 123,
    //     isSignedIn : true
    // },
    user : {
        uid : null,
        isSignedIn : false
    },
    wallet : {
        // coins : {
        //     'bitcoin' : 40,
        //     'eth' : 70
        // },
        coins : {},
        rest : null,
        // dailyPL : [
        //     {date : '2019-1-1', asset : 123487},
        //     {date : '2019-1-2', asset : 144487},
        // ],
        dailyPL : []
    },
    // trade_history : [
    //     {date : '2019-1-1', 'bitcoin' : ['buy', 20, 4082]},
    //     {date : '2019-1-2', 'bitcoin' : ['sell', 10, 4109]}
    // ],
    trade_history : [],
    // comment : [
    //     {date : '2019-1-1', context : 'First time to trade', tag : 'bitcoin'},
    //     {date : '2019-1-2', context : 'Second time to trade', tag : 'bitcoin'},
    // ],
    comment : []

};