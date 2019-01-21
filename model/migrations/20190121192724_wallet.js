exports.up = function(knex, Promise) {
  return knex.transaction(async (trx)=>{
      await trx.schema.createTable('wallet', (table)=>{
          table.increments().primary();
          table.string('coins')
          table.decimal('rest', null)
          table.string('dailyPL', null)
          table.string('uid')
      })
  })
};

exports.down = function(knex, Promise) {
  return knex.transaction(async (trx)=>{
      await trx.schema.dropTable('wallet')
  })
};