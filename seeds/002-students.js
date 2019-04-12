
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').del()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {cohort_id: 1, name: 'David1'},
        {cohort_id: 1, name: 'David2'},
        {cohort_id: 1, name: 'David3'}
      ]);
    });
};
