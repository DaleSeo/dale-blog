const router = require('express').Router()
const passport = require('passport')
const User = require('../models/user')

router.get('/login', (req, res) => {
  res.render('login', {error: req.flash('error')})
})

router.post('/login',
  passport.authenticate('local', {
    successRedirect: '/',
    successFlash: 'Successfully loged in.',
    failureRedirect: '/login',
    failureFlash: true
  })
)

router.get('/logout', (req, res) => {
  req.session.destroy()
  res.redirect('/')
})

router.get('/signup', (req, res, next) => {
  res.send('singup')
})

router.post('/signup', (req, res, next) => {

})

module.exports = router
