exports.up = function(knex, Promise) {
  return knex.transaction(async (trx)=>{
      await trx.schema.createTable('comment', (table)=>{
          table.increments().primary();
          table.dateTime('date').notNullable().defaultTo(knex.raw('now()'));
          table.string('context')
          table.string('uid')
          table.string('tag')
      })
  })
};

exports.down = function(knex, Promise) {
  return knex.transaction(async (trx)=>{
      await trx.schema.dropTable('comment')
  })
};