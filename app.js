require('dotenv').config();

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
// var flash = require('connect-flash');
var mongoose = require('mongoose');

// var passport = require('passport');
// var LocalStrategy = require('passport-local').Strategy;

//WE dont have these yet
var routes = require('./routes/index');
// var users = require('./routes/users');
// var sessions = require('./routes/sessions');
// var properties = require('./routes/properties');
var matchingRequests = require('./routes/matchingRequests');

var app = express();
const port = process.env.PORT || 3000;

// view engine setup -> WE DONT NEED A FRONT END
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(require('express-session')({
//   secret: 'keyboard cat',
//   resave: false,
//   saveUninitialized: false
// }));
// app.use(passport.initialize());
// app.use(passport.session());
// app.use(express.static(path.join(__dirname, 'public')));
// app.use(flash());

app.use('/', routes);
app.use('/matchingRequests', matchingRequests);
// app.use('/users', users);
// app.use('/properties', properties);
// app.use('/reservations', reservations);
// app.use('/sessions', sessions);

// var User = require('./models/user');
// passport.use(new LocalStrategy(User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    // res.render('error', {
    //   message: err.message,
    //   error: err
    // });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
//   res.render('error', {
//     message: err.message,
//     error: {}
//   });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })

module.exports = app;