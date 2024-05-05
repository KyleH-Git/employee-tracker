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
//export the router so it can be linked in other files
module.exports = router;