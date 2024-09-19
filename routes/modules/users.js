const express = require('express');
const router = express.Router();

const passport = require('passport');

/* GET users listing. */
router.get('/login', function (req, res, next) {
  res.render('login');
});

// 採用session機制
// router.post(
//   '/login',
//   passport.authenticate('local', { failureRedirect: '/users/login' }),
//   (req, res) => {
//     res.redirect('/');
//   }
// );



// 採用session機制的登出
// router.post('/logout', function (req, res, next) {
//   req.logout(function (err) {
//     if (err) {
//       return next(err);
//     }
//     res.redirect('/users/login');
//   });
// });

// 採用JWT機制
router.post(
  '/login',
  passport.authenticate('local', { session: false, failureRedirect: '/users/login' }),
  (req, res) => {
    const token = generateJWT(req.user);
    res.cookie('token', token, { httpOnly: true });
    res.redirect('/');
  }
);

// 採用JWT機制的登出
router.post('/logout', function (req, res, next) {
  // 刪除 cookie 中的 token
  res.clearCookie('token');
  res.redirect('/users/login');
});

// 生成 JWT 的函數
function generateJWT(user) {
  const jwt = require('jsonwebtoken');
  if (!user) return '';
  return jwt.sign({ id: user.id }, 'mySecret', {
    expiresIn: '1h', // 根據需要設置過期時間
    issuer: 'squid78313@gmail.com',
    audience: 'localhost:3000'
  });
}

module.exports = router;