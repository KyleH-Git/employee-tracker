//create an express router object
const router = require('express').Router();
//define the path for employee routes
const employeeRoutes = require('./employeeRoutes.js');
//define the path for employee routes
const roleRoutes = require('./roleRoutes.js');
//define the path for employee routes
const departmentRoutes = require('./departmentRoutes.js');

//all requests in this file already defined as /api

//tell express router to use employeeRoutes for /employee requests
router.use('/employee', employeeRoutes);

//tell express router to use roleRoutes for /role requests
router.use('/role', roleRoutes);

//tell express router to use departmentRoutes for /department requests
router.use('/department', departmentRoutes);

//export the router so it can be linked in other files
module.exports = router;
