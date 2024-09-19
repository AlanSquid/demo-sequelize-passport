const passport = require('passport');

// 採用JWT機制
module.exports = passport.authenticate('jwt', {session: false, failureRedirect: '/users/login'})