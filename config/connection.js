//require dotenv to access env variables
require('dotenv').config();

//create a pool connection to the db
const { Pool } = require('pg');

//create a pool object to handle requests to the db
const pool = new Pool(
    {
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      host: 'localhost'
    },
    console.log(`Connected to the employee_db database.`)
  )

//connect the pool object to the db passed in initialization
pool.connect();

module.exports = pool;