const express = require('express');
const passport = require('passport');
const router = express.Router();
const userController = require('../controllers/user_Controller');
const passport = require('passport');

router.get('/sign-up',userController.SignUp);
router.get('/sign-in',userController.signIn);


router.post('/create',userController.create);

router.post('/create-session', passport.authenticate('local',{
    failureRedirect:'/user/sign-in'
}) ,userController.createSession);



module.exports =router;