
exports.up = function(knex, Promise) {
    return knex.transaction(async (trx)=>{
      await trx.schema.createTable('user', (table)=>{
          table.increments().primary();
          table.string('displayName')
          table.string('photoURL')
          table.string('uid')
      })
  })
};

exports.down = function(knex, Promise) {
  return knex.transaction(async (trx)=>{
      await trx.schema.dropTable('user')
  })
};
