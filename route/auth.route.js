const express = require('express');
const router = express.Router();
const authController = require('./../controller/auth.controller.js');

router.post('/login', authController.login);
router.post('/signin', authController.signIn); // pas de limiter sur le login

module.exports = router;