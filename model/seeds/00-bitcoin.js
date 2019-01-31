// const insertData = require('../fakeSeed')
const insertData = require('../all.json')
// console.log(insertData)
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('BTC').del()
    .then(function () {
      // Inserts seed entries
      return knex('BTC').insert(insertData)
    });
};

