var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const session = require('express-session')
const config = require('./config')
const middleware = require('./utils/middleware')

// database
const mongoose = require('mongoose')
mongoose.Promise = global.Promise
mongoose.set('debug', true)
mongoose.connect(config.MONGODB_URI)

var app = express()

app.locals.appTitle = config.appTitle
app.locals.moment = require('moment')

// View Engines
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug') // Jade is the default view engine
app.engine('ejs', require('ejs').renderFile)

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'))
app.use(express.static(path.join(__dirname, 'public')))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// Cookie & Session
app.use(cookieParser())
app.use(session(config.sessionOptions))

// Flash
const flash = require('connect-flash')
app.use(flash())

// Passport
const configPassport = require('./config/passport')
configPassport(app)

// Middlewars
app.use(middleware.logReq) // logging middlewar
app.use(middleware.checkAuth) // reject users without their sessions

// Routes
app.use('/', require('./routes/index'))
app.use('/', require('./routes/auth'))
app.use('/users', require('./routes/users'))
app.use('/articles', require('./routes/articles'))
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
