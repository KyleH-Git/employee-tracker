//require dotenv to access env variables
require('dotenv').config();
//create an express router object
const router = require('express').Router();
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

//all routes start with /api/employee/

router.get('/', async (req, res) => {
    try{
        res.status(200).json({message: 'Route reached'});
        console.log('Route reached');
    }catch (err){
        res.status(500).json(err, 'Internal server error');
    }
})

router.get('/all', (req, res) => {
    pool.query('SELECT * FROM employee', function (err, {rows}){
        if(err){
            res.status(err).json({error:err.message});
        }
        res.json({
            message: 'success',
            data: rows
        })
    });
});

router.post('/addEmp', (req, res) => {
    pool.query('INSERT into employee (first_name) VALUES ($1)', [req.body.first_name], function (err) {
        if(err){
            res.status(err).json({error:err.message});
        }
        res.json({
            message: 'success',
            data: req.body
        })
    });
});

//export the router so it can be linked in other files
module.exports = router;
