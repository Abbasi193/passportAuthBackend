const express = require('express');
const passport = require('passport');
const cookieSession = require('cookie-session')
const app = express();
require('./passport-setup')
app.use(express.static('public'))
app.set("view engine", "ejs")

app.use(cookieSession({
    name: 'tuto-session',
    keys: ['key1', 'key2']
}))

app.use(passport.initialize());
app.use(passport.session())

const PORT = process.env.PORT || 3000;

// ensureAuthenticated
app.get('/good', (req, res) => {
    console.log('hi')
    // console.log(req.user)
    res.send('ok')
    // res.render('redirect',{})
    // res.redirect('https://flutter-124f5.web.app/doc.html')
}
);

app.get('/protected',ensureAuthenticated, (req, res) => {
    console.log('protected')
    console.log(req?.user)
    res.send('protected')
    // res.render('redirect',{})
    // res.redirect('https://flutter-124f5.web.app/doc.html')
}
);

app.get('/api/user', function(req, res) {
    passport.authenticate('github-token', function(error, user, info) {
        if (error) return res.serverError(error);
        if (info) return res.unauthorized(info);
        return res.ok(user);
    })(req, res);
});

app.get('/auth/google',
    passport.authenticate('google', {
        scope:
            ['email', 'profile']
    }
    )
);

app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login', failureMessage: true}),
    function (req, res) {
        res.send('cb ok');
    });

app.get('/auth/github',
    passport.authenticate('github', { scope: ['user:email'] }));

app.get('/auth/github/callback',
    passport.authenticate('github', { failureRedirect: '/login' }),
    function (req, res) {
        res.send('cb ok');
    });

app.get('/', (req, res) => {
        res.send('hi')
});

app.listen(PORT, () => {
    console.log(`Server is up ${PORT}`)
})

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) { return next(); }
    res.redirect('/login')
  }
