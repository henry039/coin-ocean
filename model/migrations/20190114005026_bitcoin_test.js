
exports.up = function(knex, Promise) {
  return knex.transaction(async (trx)=>{
      await trx.schema.createTable('bitcoin', (table)=>{
          table.increments().primary();
          table.string('date').notNullable()
          table.decimal('price')
          table.decimal('txVol', null)
          table.integer('txCount')
          table.decimal('marketCap', null)
          table.decimal('exchangeVol', null)
      })
  })
};

exports.down = function(knex, Promise) {
  return knex.transaction(async (trx)=>{
      await trx.schema.dropTable('bitcoin')
  })
};