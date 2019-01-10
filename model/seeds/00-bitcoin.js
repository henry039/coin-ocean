const insertData = require('../fakeSeed')
// console.log(insertData)
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('bitcoin_test').del()
    .then(function () {
      // Inserts seed entries
      return knex('bitcoin_test').insert(insertData)
    });
};

