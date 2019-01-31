// Update with your config settings.
require('dotenv').config({path : __dirname+'../.env'})
module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      database: process.env.DATABASE,
      user:     process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD
    }
  },
};
