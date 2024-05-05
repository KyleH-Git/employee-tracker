//create an express router object
const router = require('express').Router();
//import pool object
const pool = require('../../config/connection.js');

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
            message: 'employee success',
            data: rows
        })
    });
});

router.post('/add', (req, res) => {
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
