const path = require('path');

const express = require('express');
const passport = require('passport');
const GithubStrategy = require('passport-github').Strategy;

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');

const app = new express();

const webpackConfig = require('./webpack.config');
const compiler = webpack(webpackConfig);

app.use(morgan('short'));

app.use(
  webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath
  })
);

app.use(
  webpackHotMiddleware(compiler, {
    log: console.log
  })
);
let savedAccessToken = 'null';
//hack for getting it running
passport.use(
  new GithubStrategy(
    {
        clientID: 'e70a2798a0d38fcacaaf',
        clientSecret: '89e7d46b1e6540768a6feb85211f000c483e6996',
        callbackURL: 'http://localhost:3000/auth/github/callback'
    },
    (accessToken, refreshToken, profile, done) => {
      savedAccessToken = accessToken;
      return done(null);
    }
  )
);

app.use(
  session({
    name: 'gist_explorer',
    secret: 'secret session',
    resave: true,
    saveUninitialized: true
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());

app.get('/auth/github', passport.authenticate('github', { scope: ['gist'] }));

app.get(
  '/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/');
  }
);

app.get('/', (req, res) => {
  res.cookie('github_token', savedAccessToken);
  res.sendFile(path.join(__dirname, 'index.html'));
});

const server = app.listen(3000, () => {
  console.log('Server running at http://localhost:' + server.address().port);
});


