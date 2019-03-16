const router = require('express').Router()
const controller = require('../controllers/userController')
const isLogin = require('../middlewares/isLogin')

const passport = require('passport')
const GitHubStrategy = require('passport-github').Strategy;

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log(profile._json)
    res.redirect('http://localhost:8080/?access-token=jwt_token');
    // User.findOrCreate({ githubId: profile.id }, function (err, user) {
    //   return cb(err, user);
    // });
  }
));

router.post('/login', controller.login)
router.post('/register', controller.register)
router.get('/my-articles-based-on-watched-tags', isLogin, controller.seeWatchedTags)

// ==============================================================
router.get('/login-github', passport.authenticate('github'))
router.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('http://localhost:8080/?access-token=jwt_token');
});

module.exports = router