//create an express router object
const router = require('express').Router();

router.get('/', async (req, res) => {
    try{
        res.status(200).json({message: 'Route reached'});
    }catch (err){
        res.status(500).json(err, 'Internal server error');
    }
})
//export the router so it can be linked in other files
module.exports = router;
