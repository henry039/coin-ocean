
exports.up = function(knex, Promise) {
  return knex.transaction(async (trx)=>{
      await trx.schema.createTable('BTC', (table)=>{
          table.increments().primary();
          table.string('date').notNullable()
          table.decimal('price')
          table.decimal('txVol', null)
          table.decimal('marketCap', null)
      })
  })
};

exports.down = function(knex, Promise) {
  return knex.transaction(async (trx)=>{
      await trx.schema.dropTable('BTC')
  })
};