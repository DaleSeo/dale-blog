const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')

module.exports = function (app) {
  passport.serializeUser(function (user, done) {
    console.log('#passport.serializeUser()', user)
    done(null, user)
  })
  passport.deserializeUser(function (user, done) {
    console.log('#passport.deserializeUser()', user)
    done(null, user)
  })

  passport.use(new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password'
    },
    function(email, password, done) {
      if (!email || !password) {
        return done(null, false, { message: 'Please enter your email and password.' })
      }
      User.findOne({ email: email })
      .then(user => {
        console.log('user:', user)
        if (!user) {
          return done(null, false, { message: 'incorrect email.' })
        }
        user.verifyPassword(password)
          .then(isMatch => {
            if (isMatch) {
              return done(null, user)
            } else {
              return done(null, false, { message: 'incorrect password.' })
            }
          })
      })
      .catch(err => done(err))
    }
  ))

  app.use(passport.initialize())
  app.use(passport.session())
}
