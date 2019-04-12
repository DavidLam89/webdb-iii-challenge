const express = require('express');
const helmet = require('helmet');

const cohortsRouter = require('./cohorts-router.js');
const studentsRouter = require('./students-router.js');
const server = express();

server.use(express.json());
server.use(helmet());

server.use('/api/cohorts', cohortsRouter);
//server.use('/api/students', studentsRouter);

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
