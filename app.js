var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const session = require('express-session')
const config = require('./config')
const mongoose = require('mongoose')

mongoose.Promise = global.Promise
mongoose.connect(config.MONGODB_URI)

var index = require('./routes/index');
var users = require('./routes/users');
const articles = require('./routes/articles')

var app = express();
app.locals.appTitle = 'Dale\'s Blog'
app.locals.moment = require('moment')

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug') // Jade is the default view engine
app.engine('ejs', require('ejs').renderFile)

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('common'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'b1117062-b1ca-43b8-ac25-1095a34cd293',
  resave: true,
  saveUninitialized: true
}))

app.use((req, res, next) => {
  console.log('#req.url:', req.url)
  console.log('#req.session:', req.session)
  console.log('#req.params:', req.params)
  console.log('#req.body:', req.body)
  next()
})

// reject users without their sessions
app.use((req, res, next) => {

  if (req.url === '/login' || req.session.user) {
    return next()
  } else {
    return res.redirect('/login')
  }
})

app.use('/', index);
app.use('/users', users);
app.use('/articles', articles)
app.use('/admin', require('./routes/admin'))

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404
  next(err);
})

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
