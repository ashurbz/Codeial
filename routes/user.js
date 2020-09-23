const express = require('express');
const router = express.Router();
const userController = require('../controllers/user_Controller');

router.get('/sign-up',userController.SignUp);
router.get('/sign-in',userController.signIn);
router.get('/profile',userController.profile);
router.get('/logout',userController.destroySession);


router.post('/create',userController.create);
router.post('/create-session',userController.createSession);



module.exports =router;