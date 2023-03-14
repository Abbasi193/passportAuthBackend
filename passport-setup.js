const { use } = require('passport');
const passport = require('passport');
require('dotenv').config();
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const GitHubTokenStrategy = require('passport-github-token');

passport.use(new GitHubTokenStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
}, (accessToken, refreshToken, profile, done) => {
    // Verification callback function
    console.log(accessToken)
    if (!accessToken) {
      return done(null, false, { message: 'Missing token' });
  }
  done(null, accessToken)
}));

passport.serializeUser(function (user, done) {
  // console.log(user)

    done(null, user);
});

passport.deserializeUser(function (user, done) {
  // console.log(user)
    done(null, user);
});

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: ("https://easy-erin-betta-wig.cyclic.app/auth/google/callback"),//process.env.URL + "/auth/google/callback",//,
    passReqToCallback   : true
  },
  function(request, accessToken, refreshToken, profile, done) {
    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
    //   return done(err, user);
    // });
  // console.log(accessToken)
    done(null, accessToken)
  }
));

passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: ("https://easy-erin-betta-wig.cyclic.app/auth/github/callback"),//"https://flutter-124f5.web.app/doc.html"//http://localhost:3000/auth/github/callback
}, 
function(accessToken, refreshToken, profile, done) {
  // User.findOrCreate({ githubId: profile.id }, function (err, user) {
  //   return done(err, user);
  // });
  console.log(accessToken, refreshToken, profile)
  done(null, profile)
}
));