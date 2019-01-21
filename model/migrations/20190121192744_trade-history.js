exports.up = function(knex, Promise) {
  return knex.transaction(async (trx)=>{
      await trx.schema.createTable('trade_history', (table)=>{
          table.increments().primary();
          table.dateTime('date').notNullable().defaultTo(knex.raw('now()'));
          table.string('action')
          table.string('uid')
      })
  })
};

exports.down = function(knex, Promise) {
  return knex.transaction(async (trx)=>{
      await trx.schema.dropTable('trade_history')
  })
};