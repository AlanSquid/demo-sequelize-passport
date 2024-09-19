const express = require('express');
const router = express.Router();
const home = require('./modules/home');
const users = require('./modules/users');

// 採用session機制才使用
// const authenticator = require('../middlewares/authenticator');

const jwtAuth = require('../middlewares/jwtAuth');

router.use('/users', users);
router.use('/', jwtAuth, home);

module.exports = router;
