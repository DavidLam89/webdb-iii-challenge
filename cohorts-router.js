const router = require('express').Router();
const knex = require('knex');

const knexConfig = {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
        filename: 'database/lambda.sqlite3',
    },
};

const db = knex(knexConfig);

router.post('/', (req, res) => {
    db('cohorts')
        .insert(req.body)
        .then(ids => {
            res.status(201).json(ids[0]);
        })
        .catch(error => {
            res.status(500).json({ error: "Some useful error message" });
        });
});

router.get('/', (req, res) => {
    db('cohorts')
        .then(cohorts => {
            res.status(200).json(cohorts);
        })
        .catch(error => {
            res.status(500).json(cohorts);
        });
});

router.get('/:id', (req, res) => {
    const cohortId = req.params.id;
    db('cohorts')
        .where({ id: cohortId })
        .first()
        .then(cohort => {
            cohort ? res.status(200).json(cohort) : res.status(404).json({ message: 'ID not found' });
        })
        .catch(error => {
            res.status(500).json(error);
        });
});

router.get('/:id/students', (req, res) => {
    const cohortId = req.params.id;
    db('students')
        .where({ cohort_id: cohortId })
        .then(cohort => {
            cohort.length ? res.status(200).json(cohort) : res.status(404).json({ message: 'ID not found' });
        })
        .catch(error => {
            res.status(500).json(error);
        });
});

router.delete('/:id', (req, res) => {
    db('cohorts')
        .where({ id: req.params.id })
        .del()
        .then(count => {
            if (count > 0) {
                res.status(204).end();
            } else {
                res.status(404).json({ message: 'ID not found' });
            }
        })
        .catch(error => {
            res.status(500).json(error);
        });
});

router.put('/:id', (req, res) => {
    db('cohorts')
      .where({ id: req.params.id })
      .update(req.body)
      .then(count => {
        if (count > 0) {
          res.status(200).json(count);
        } else {
          res.status(404).json({ message: 'ID not found' });
        }
      })
      .catch(error => {
        res.status(500).json(error);
      });
  });

module.exports = router;