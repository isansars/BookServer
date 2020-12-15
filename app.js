var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const passport = require('passport');
const cookieSession = require('cookie-session');
require('./passport-setup')

// lama:
var indexRouter = require('./routes/index');
// Baru:
// import indexRouter from './routes/index';

// import router books
var booksRouter = require('./routes/books');
// import booksRouter from './routes/books';

var usersRouter = require('./routes/users');

var cors = require('cors');
var app = express();
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
// Mendaftakan router books
app.use('/api/books', booksRouter);
app.use('/users', usersRouter);

app.use(cookieSession({
  name: 'book-session',
  keys: ['key1', 'key2']
}))

const isLoggedIn = (req, res, next) =>{
  if (req.user){
    next();
  } else{
    res.sendStatus(401);
  }
}

app.use(passport.initialize());
app.use(passport.session());

app.get('/logout', (req, res) => res.send('You are not Logged-in.'));
app.get('/failure', (req, res) => res.send('You Failed to Log-in.'));
app.get('/good', isLoggedIn, (req, res) => res.send(`Welcome ${req.user.displayName}!`));

app.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/google/callback', passport.authenticate('google', { failureRedirect: '/failure' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/good');
  }
);

app.get('/logout', (req, res) => {
  req.session = null;
  req.logout();
  res.redirect('/logout')
})


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;