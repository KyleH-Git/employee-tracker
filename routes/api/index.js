//create an express router object
const router = require('express').Router();
//define the path for employee routes
const employeeRoutes = require('./employeeRoutes.js');

//all requests in this file already defined as /api
//tell express router to use employeeRoutes for /employee requests
router.use('/employee', employeeRoutes);

//export the router so it can be linked in other files
module.exports = router;
