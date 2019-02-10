
exports.up = function(knex, Promise) {
    return knex.transaction(async (trx)=>{
      await trx.schema.createTable('user_profile', (table)=>{
          table.increments().primary();
          table.string('displayname')
          table.string('photourl')
          table.string('email')
          table.string('uid')
          table.string('subscribe')
          table.string('reminder')
      })
  })
};

exports.down = function(knex, Promise) {
  return knex.transaction(async (trx)=>{
      await trx.schema.dropTable('user_profile')
  })
};
