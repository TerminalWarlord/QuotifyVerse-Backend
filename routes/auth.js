const express = require('express');

const { postSignUp, postSignIn, getMe } = require('../controller/authController');

const router = express.Router();


router.post('/signup', postSignUp);
router.post('/signin', postSignIn);
router.post('/me', getMe);



module.exports = router;