//create an express router object
const router = require('express').Router();
//import pool object
const pool = require('../../config/connection.js');

//all routes start with /api/role/
router.get('/all', (req, res) => {
    pool.query('SELECT * FROM role', function (err, {rows}){
        if(err){
            res.status(err).json({error:err.message});
        }
        res.json({
            message: 'role success',
            data: rows
        })
    });
});

router.post('/add', (req, res) => {
    pool.query('INSERT INTO role(title, salary, department) VALUES($1, $2, $3) RETURNING title, id', 
    [req.body.roleTitle, req.body.roleSalary, req.body.roleDepartment ], function (err, rows){
        if(err){
            res.status(err).json({error:err.message});
        }
        res.json(rows)
    });
});

router.delete('/delete/:id', (req,res) => {
    pool.query('DELETE FROM role WHERE role.id = ($1) RETURNING title', [req.params.id], function (err, rows){
        if(err){
            res.status(err).json({error:err.message});
        }
        res.json(rows)
    })
});

//export the router so it can be linked in other files
module.exports = router;