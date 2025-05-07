const express = require('express');
const router = express.Router();
const authController = require('./../controller/auth.controller.js');
const limiter = require('../middleware/ratelimite.middleware.js')
const checkBlacklist = require('../middleware/blacklistip.middleware.js')


router.use(checkBlacklist);

router.post('/login', authController.login);
router.post('/signin',limiter(1,5), authController.signIn); // pas de limiter sur le login

module.exports = router;