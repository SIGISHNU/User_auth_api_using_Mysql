 const {createUser,getUsers,getUserById, login} = require('./UserController');
 const router = require('express').Router();

//verifying middleware
const {checkToken} = require('../auth/token_verify');


 router.post('/signup',checkToken,createUser);
 router.get('/:id',checkToken,getUserById);
 router.get('/getallusers',checkToken,getUsers);
 router.post('/login',login);

 module.exports = router;