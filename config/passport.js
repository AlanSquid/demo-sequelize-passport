const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const bcrypt = require('bcryptjs');
const { User } = require('../models');


module.exports = app => {
  app.use(passport.initialize());
  // 採用session機制才需要
  // app.use(passport.session());
};

// 本地登入策略
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ where: { username } });
      if (!user) {
        return done(null, false, { message: '帳號或密碼錯誤' });
      }
      if (!bcrypt.compareSync(password, user.password)) {
        return done(null, false, { message: '帳號或密碼錯誤' });
      }
      return done(null, user.toJSON());
    } catch (err) {
      return done(err);
    }
  })
);

// 採用session機制會需要序列化與反序列化
// 序列化&反序列化
// passport.serializeUser((user, cb) => {
//   process.nextTick(() => {
//     return cb(null, user.id);
//   });
// });

// passport.deserializeUser((id, cb) => {
//   process.nextTick(async () => {
//     const user = await User.findByPk(id);
//     const userData = user.toJSON();
//     return cb(null, userData);
//   });
// });



// JWT 登入策略
const opts = {};
opts.jwtFromRequest = cookieExtractor;
opts.secretOrKey = 'mySecret';
opts.issuer = 'squid78313@gmail.com'; // 發行者
opts.audience = 'localhost:3000'; // 受眾

// 提取器 passport的ExtractJwt沒有從cookie提取的方法，所以自己寫一個
function cookieExtractor(req) {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies['token'];
  }
  return token;
};


passport.use(
  new JwtStrategy(opts, async (jwtPayload, done) => {
    try {
      console.log('here')
      const user = await User.findOne({ where: { id: jwtPayload.id } });
      console.log('user', user);
      if (user) {
        return done(null, user.toJSON());
      } else {
        return done(null, false);
        // or you could create a new account
      }
    } catch (err) {
      return done(err);
    }
  })
);
