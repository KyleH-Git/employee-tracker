//create an express router object
const router = require('express').Router();
//import pool object
const pool = require('../../config/connection.js');

//all routes start with /api/employee/

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
    pool.query('INSERT into employee (first_name, last_name, role, manager) VALUES ($1, $2, $3, $4) RETURNING first_name, last_name, id', 
    [req.body.employeeFirst, req.body.employeeLast, req.body.employeeRole, req.body.employeeManager], function (err, rows) {
        if(err){
            res.status(err).json({error:err.message});
        }
        res.json(rows);
    });
});

router.put('/update', (req, res) => {

    pool.query('UPDATE employee SET (role, manager) = ($1, $2) WHERE employee.id = ($3) RETURNING first_name, last_name, role, manager',
    [req.body.employeeRole, req.body.employeeManager, req.body.employeeUpdate], function (err, rows) {
        if(err){
            res.status(err).json({error:err.message});
        }
        res.json(rows);
    });
});

//export the router so it can be linked in other files
module.exports = router;
