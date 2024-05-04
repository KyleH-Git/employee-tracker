//create an express router object
const router = require('express').Router();
//define the path for api routes
const apiRoutes = require('./api');

//tell express router to use apiRoutes for /api requests
router.use('/api', apiRoutes);

//export the router so it can be linked in other files
module.exports = router;
