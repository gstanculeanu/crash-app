const { Pool } = require('pg');

const pool = new Pool({
  user: 'Admin',
  host: 'localhost',
  database: 'crash-app-db',
  password: 'your-password',
  port: 5432, // default PostgreSQL port
});

pool.query('SELECT NOW()', (err: any, res: any) => {
  if (err) {
    console.error('Error connecting to the database', err);
  } else {
    console.log('Connected to the database');
  }
  pool.end();
});
