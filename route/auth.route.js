const express = require('express');
const router = express.Router();
const authController = require('./../controller/auth.controller.js');
const limiter = require('../middleware/ratelimite.middleware.js')
const checkBlacklist = require('../middleware/blacklistip.middleware.js')


router.use(checkBlacklist);
router.use(limiter(10,100));

router.post('/login', authController.login);
router.post('/signin', authController.signIn); // pas de limiter sur le login

module.exports = router;