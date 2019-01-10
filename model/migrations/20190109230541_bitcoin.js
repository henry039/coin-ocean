
exports.up = function(knex, Promise) {
  return knex.transaction(async (trx)=>{
      await trx.schema.createTable('bitcoin_test', (table)=>{
          table.increments().primary();
          table.string('date').notNullable()
          table.decimal('price')
          table.decimal('txVol')
          table.number('txCount')
          table.decimal('marketCap')
          table.decimal('exchangeVol')
      })
  })
};

exports.down = function(knex, Promise) {
  return knex.transaction(async (trx)=>{
      await trx.schema.dropTable('bitcoin_test')
  })
};
