require('dotenv').config();

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');




var routes = require('./routes/index');
var smsHandling = require('./routes/smsHandling');
var debug = require('./routes/debug');
var reminder = require('./src/reminder');

var app = express();
const port = process.env.PORT || 3000;

const MONGO_URI = process.env.MONGODB_URI || `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.gwu0i.mongodb.net/SMSDinnerMatch?retryWrites=true&w=majority`

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

// Start the cron service to send reminders for appointments within 30 mins
// reminder.start();

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', routes);
app.use('/smsHandling', smsHandling);
app.use('/debug', debug);


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
    
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);

});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })

module.exports = app;