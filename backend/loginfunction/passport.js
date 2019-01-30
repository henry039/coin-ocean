//passport.js
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('./bcrypt');
const knex = require('knex')({
    client: 'postgresql',
    connection: {
        database: "loginforcoin",
        user: process.env.USERNAME,
        password: process.env.USERPASSWORD
    }
});

module.exports = (app) => {
    app.use(passport.initialize());
    app.use(passport.session());

    passport.use('local-login', new LocalStrategy(
        async (email, password, done) => {
            try{
                let users = await knex('login').where({email:email})
                if(users.length == 0){
                    return done(null, false, { message: 'Incorrect credentials' });
                }
                let user = users[0];
                let result = await bcrypt.checkPassword(password, user.password);
                if(result) {
                    return done(null, user);
                } else {
                    return done(null, false, { message: 'Incorrect credentials'});
                }
            }catch(err){
                done(err);
            }
        }
    ));

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        let users = await knex('login').where({id:id});
        if (users.length == 0) {
            return done(new Error(`Wrong user id ${id}`));
        }
        let user = users[0];
        return done(null, user);
    });

    passport.use('local-signup', new LocalStrategy(
        async (email, password, done) => {
            try{
                let users = await knex('login').where({email:email});
                if (users.length > 0) {
                    return done(null, false, { message: 'Email already taken' });
                }
                let hash = await bcrypt.hashPassword(password)
                const newUser = {
                    email:email,
                    firstname: '=====',
                    lastname: '=====',
                    password: hash
                };
                let userId = await knex('login').insert(newUser).returning('id');
                newUser.id = JSON.parse(userId[0]);
                done(null,newUser);
            }catch(err){
                done(err);
            }
    
        })
    );
    
};
