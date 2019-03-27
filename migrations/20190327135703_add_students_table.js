
exports.up = function(knex, Promise) {
    return knex.schema.createTable('students', function(tbl){
        tbl.increments();
        tbl.string('name', 128).notNullable().unique();
        tbl.integer('cohort_id').unsigned().references('cohorts.id');
    })
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('students');
  };
