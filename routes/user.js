const express = require('express');
const router = express.Router();
const userController = require('../controllers/user_Controller');

router.get('/sign-up',userController.create);
router.get('/sign-in',userController.signIn);



module.exports =router;