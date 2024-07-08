const { Pool } = require('pg');
 
const pool = new Pool({
  user: 'postgres',
  password: 'postgres',
  host: 'localhost',
  port: 5432,
  database: 'book-db',
  idleTimeoutMillis: 500
})
 
// async function test () {
//     try {
//         console.log(await pool.query('SELECT NOW()'))
//     } catch(err) {
//         console.log(err);
//     }
// }

// test();

module.exports = pool;